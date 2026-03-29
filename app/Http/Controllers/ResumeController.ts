import { httpContext } from "jcc-express-mvc";
import { Inject, Method } from "jcc-express-mvc/Core/Dependency";
import { Resume } from "@/Model/Resume";
import { userId } from "app/helper";

type ResumeRow = {
  id: string;
  label: string;
  updatedAt: string;
  createdAt: string;
};

async function resumeRowsForUser(uid: string): Promise<ResumeRow[]> {
  const list = await Resume.find({ user: uid })
    .sort({ updatedAt: -1 })
    .select("label updatedAt createdAt")
    .lean();

  return list.map((r) => ({
    id: r._id.toString(),
    label: r.label,
    updatedAt: r.updatedAt?.toISOString?.() ?? "",
    createdAt: r.createdAt?.toISOString?.() ?? "",
  }));
}

export class ResumeController {
  /** New blank resume in the builder. */
  @Method()
  create() {
    return inertia("Resume");
  }

  /** Authenticated list of saved resumes (Inertia). */
  @Method()
  async index() {
    const resumes = await resumeRowsForUser(userId());
    return inertia("Resumes", { resumes });
  }

  /** Dashboard: all resumes for the signed-in user. */
  async dashboard() {
    const resumes = await resumeRowsForUser(userId());
    return inertia("Dashboard", { resumes });
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
    });
  }
}
