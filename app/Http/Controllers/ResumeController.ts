import { httpContext } from "jcc-express-mvc";
import { Inject, Method } from "jcc-express-mvc/Core/Dependency";
import { Resume } from "@/Model/Resume";
import { userId } from "app/helper";

@Inject()
export class ResumeController {
  /** Authenticated list of saved resumes (Inertia). */
  @Method()
  async index({ res } = httpContext) {
    const uid = userId();
    if (!uid) {
      return res.redirect(303, "/login?redirect=/resumes");
    }

    const list = await Resume.find({ user: uid })
      .sort({ updatedAt: -1 })
      .select("label updatedAt createdAt")
      .lean();

    return res.inertia("Resumes", {
      resumes: list.map((r) => ({
        id: r._id.toString(),
        label: r.label,
        updatedAt: r.updatedAt?.toISOString?.() ?? "",
        createdAt: r.createdAt?.toISOString?.() ?? "",
      })),
    });
  }

  /** Open builder with a saved document from the server. */
  @Method()
  async show({ req, res } = httpContext) {
    const uid = userId();
    if (!uid) {
      return res.redirect(303, "/login");
    }

    const id = req.params.resume;
    const doc = await Resume.findOne({ _id: id, user: uid }).lean();
    if (!doc) {
      return res.status(404).send("Resume not found");
    }

    return res.inertia("Resume", {
      loadedResume: {
        id: doc._id.toString(),
        label: doc.label,
        data: doc.data,
      },
    });
  }
}
