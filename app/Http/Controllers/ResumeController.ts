import { Method } from "jcc-express-mvc/Core/Dependency";
import { Resume, MAX_RESUMES_PER_USER } from "@/Model/Resume";
import { userId } from "app/helper";

type ResumeRow = {
  id: string;
  label: string;
  updatedAt: string;
  createdAt: string;
  templateId: string;
  accentColor: string;
  displayName: string;
  displayTitle: string;
};

type ResumeDataLike = {
  selectedTemplate?: string;
  accentColor?: string;
  personal?: { name?: string; title?: string };
};

function previewFromStoredData(
  data: unknown,
): Pick<
  ResumeRow,
  "templateId" | "accentColor" | "displayName" | "displayTitle"
> {
  const d = data as ResumeDataLike | null | undefined;
  const personal = d?.personal;
  return {
    templateId:
      typeof d?.selectedTemplate === "string" ? d.selectedTemplate : "minimal",
    accentColor: typeof d?.accentColor === "string" ? d.accentColor : "#2563eb",
    displayName:
      typeof personal?.name === "string" ? personal.name.slice(0, 72) : "",
    displayTitle:
      typeof personal?.title === "string" ? personal.title.slice(0, 72) : "",
  };
}

async function resumeRowsForUser(uid: string): Promise<ResumeRow[]> {
  const list = await Resume.find({ user: uid })
    .sort({ updatedAt: -1 })
    .select("label updatedAt createdAt data")
    .lean();

  return list.map((r) => ({
    id: r._id.toString(),
    label: r.label,
    updatedAt: r.updatedAt?.toISOString?.() ?? "",
    createdAt: r.createdAt?.toISOString?.() ?? "",
    ...previewFromStoredData(r.data),
  }));
}

function resumeQuotaFromList(resumes: ResumeRow[]) {
  return {
    maxResumesPerUser: MAX_RESUMES_PER_USER,
    canCreateResume: resumes.length < MAX_RESUMES_PER_USER,
  };
}

async function resumeQuota(uid: string) {
  const n = uid ? await Resume.countDocuments({ user: uid }) : 0;
  return {
    maxResumesPerUser: MAX_RESUMES_PER_USER,
    canCreateResume: n < MAX_RESUMES_PER_USER,
  };
}

function dashboardUserFromSession():
  | { name?: string; email?: string }
  | undefined {
  const u = auth().user() as
    | { name?: string; email?: string }
    | null
    | undefined;
  if (!u) return undefined;
  if (typeof u.name !== "string" && typeof u.email !== "string") {
    return undefined;
  }
  return { name: u.name, email: u.email };
}

export class ResumeController {
  /** New blank resume in the builder (clears linked saved id so Save creates a row). */
  @Method()
  async create() {
    const uid = userId();
    const resumes = await resumeRowsForUser(uid);
    if (resumes.length >= MAX_RESUMES_PER_USER) {
      return inertia("Dashboard", {
        resumes,
        ...resumeQuotaFromList(resumes),
        resumeLimitNotice: true,
        dashboardUser: dashboardUserFromSession(),
      });
    }
    return inertia("Resume", {
      startFresh: true,
      ...(await resumeQuota(uid)),
    });
  }

  /** Authenticated builder entry: continue local/browser draft (may sync as new or update). */
  @Method()
  async editor() {
    const uid = userId();
    return inertia("Resume", {
      startFresh: false,
      ...(await resumeQuota(uid)),
    });
  }

  /** Authenticated list of saved resumes (Inertia). */
  @Method()
  async index() {
    const resumes = await resumeRowsForUser(userId());
    return inertia("Resumes", {
      resumes,
      ...resumeQuotaFromList(resumes),
    });
  }

  /** Dashboard: all resumes for the signed-in user. */
  async dashboard() {
    const resumes = await resumeRowsForUser(userId());
    return inertia("Dashboard", {
      resumes,
      ...resumeQuotaFromList(resumes),
      dashboardUser: dashboardUserFromSession(),
    });
  }

  /** Open builder with a saved document from the server. */
  async show() {
    const uid = userId();
    if (!uid) {
      return response().redirect(303, "/login");
    }

    const id = request().params.resume;
    const doc = await Resume.findOne({ _id: id, user: uid }).lean();
    if (!doc) {
      return response().status(404).send("Resume not found");
    }

    return inertia("Resume", {
      loadedResume: {
        id: doc._id.toString(),
        label: doc.label,
        data: doc.data,
      },
      ...(await resumeQuota(uid)),
    });
  }
}
