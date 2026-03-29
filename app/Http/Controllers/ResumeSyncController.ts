import { httpContext } from "jcc-express-mvc";
import { Resume, MAX_RESUMES_PER_USER } from "@/Model/Resume";
import { isResumeDataBody, userId } from "app/helper";
import { resumeDataWithStoredPhoto } from "app/resume-photo";

async function forgetResumeLoginData(): Promise<void> {
  const sess = session();
  if (sess == null) return;
  sess.forget("resumeLoginData");
  await sess.save();
}

/**
 * Inertia POST target: saves resume JSON from the builder (same payload as the API).
 */
export class ResumeSyncController {
  async index() {
    const sess = session();
    if (sess == null) {
      return inertia("SyncResume", {
        pendingResumeLoginData: null,
      });
    }
    const pending = sess.get("resumeLoginData") as unknown;
    await forgetResumeLoginData();
    return inertia("SyncResume", {
      pendingResumeLoginData: pending ?? null,
    });
  }

  /** Multipart upload for profile photo after crop (field `photo`). */
  async uploadPhoto({ req, res } = httpContext) {
    const uid = userId();
    if (!uid) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!req.hasFile("photo")) {
      return res.status(422).json({ message: "No photo uploaded." });
    }
    const folder = `uploads/resume-photos/${uid}`;
    const fileName = req.file("photo").store(folder);
    if (!fileName) {
      return res.status(500).json({ message: "Could not save image." });
    }
    const url = `/${folder}/${fileName}`;
    return res.json({ url });
  }

  async sync({ req, res } = httpContext) {
    const uid = userId();
    if (!uid) {
      return res.status(422).json({ errors: { save: "Not authenticated." } });
    }

    if (!isResumeDataBody(req.body)) {
      return res
        .status(422)
        .json({ errors: { save: "Missing or invalid resume data." } });
    }

    const body = req.body;
    const label =
      typeof body.label === "string"
        ? body.label.trim().slice(0, 120)
        : undefined;
    let data: Record<string, unknown>;
    try {
      data = await resumeDataWithStoredPhoto(
        body.data as Record<string, unknown>,
        uid,
      );
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Invalid profile photo.";
      return res.status(422).json({ errors: { save: msg } });
    }

    const rid = typeof body.resume_id === "string" ? body.resume_id.trim() : "";

    if (rid) {
      const doc = await Resume.findOne({ _id: rid, user: uid });
      if (doc) {
        doc.data = data;
        if (label !== undefined) doc.label = label;
        await doc.save();
        await forgetResumeLoginData();
        return res.redirect(303, `/resume/preview/${doc._id.toString()}`);
      }
    }

    const existingCount = await Resume.countDocuments({ user: uid });
    if (existingCount >= MAX_RESUMES_PER_USER) {
      return res.status(422).json({
        errors: {
          save: `You can save at most ${MAX_RESUMES_PER_USER} resumes. Delete one in your dashboard to add another.`,
        },
      });
    }

    try {
      const created = await Resume.create({
        user: uid,
        label: label || "Untitled resume",
        data,
      });
      await forgetResumeLoginData();
      return res.redirect(303, `/resume/preview/${created._id.toString()}`);
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
