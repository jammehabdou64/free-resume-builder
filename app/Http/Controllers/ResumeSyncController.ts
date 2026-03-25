import { httpContext } from "jcc-express-mvc";
import { Inject, Method } from "jcc-express-mvc/Core/Dependency";
import { Resume, MAX_RESUMES_PER_USER } from "@/Model/Resume";
import { isResumeDataBody, userId } from "app/helper";

/**
 * Inertia POST target: saves resume JSON from the builder (same payload as the API).
 */
@Inject()
export class ResumeSyncController {
  @Method()
  async sync({ req, res } = httpContext) {
    const uid = userId();
    if (!uid) {
      return res.status(422).json({ errors: { save: "Not authenticated." } });
    }

    if (!isResumeDataBody(req.body)) {
      return res.status(422).json({ errors: { save: "Missing or invalid resume data." } });
    }

    const body = req.body;
    const label =
      typeof body.label === "string" ? body.label.trim().slice(0, 120) : undefined;
    const data = body.data;
    const rid =
      typeof body.resume_id === "string" ? body.resume_id.trim() : "";

    if (rid) {
      const doc = await Resume.findOne({ _id: rid, user: uid });
      if (doc) {
        doc.data = data;
        if (label !== undefined) doc.label = label;
        await doc.save();
        return res.inertia("Resume", {
          resumeRemoteSync: { id: doc._id.toString() },
        });
      }
    }

    try {
      const created = await Resume.create({
        user: uid,
        label: label || "Untitled resume",
        data,
      });
      return res.inertia("Resume", {
        resumeRemoteSync: { id: created._id.toString() },
      });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Could not save resume";
      if (msg.includes("at most")) {
        return res.status(422).json({
          errors: { save: `${msg} (max ${MAX_RESUMES_PER_USER})` },
        });
      }
      return res.status(422).json({ errors: { save: msg } });
    }
  }
}
