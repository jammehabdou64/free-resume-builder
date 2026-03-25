import { httpContext, type Request } from "jcc-express-mvc";
import { Inject, Method } from "jcc-express-mvc/Core/Dependency";
import mongoose from "mongoose";
import { Resume, MAX_RESUMES_PER_USER } from "@/Model/Resume";
import { isResumeDataBody, userId } from "app/helper";

@Inject()
export class ResumeController {
  /** List current user's resumes (metadata only). */

  async index() {
    const uid = userId();
    if (!uid) return response().status(401).json({ message: "Unauthorized" });

    const list = await Resume.find({ user: uid })
      .sort({ updatedAt: -1 })
      .select("label updatedAt createdAt")
      .lean();

    return response().json({
      resumes: list.map((r) => ({
        id: r._id.toString(),
        label: r.label,
        updatedAt: r.updatedAt,
        createdAt: r.createdAt,
      })),
    });
  }

  /** Full document for editing. */
  @Method()
  async show({ req, res } = httpContext) {
    const uid = userId();
    if (!uid) return res.status(401).json({ message: "Unauthorized" });
    const doc = await Resume.findOne({
      _id: req.params.id,
      user: uid,
    }).lean();
    if (!doc) return res.status(404).json({ message: "Resume not found" });
    return res.json({
      id: doc._id.toString(),
      label: doc.label,
      data: doc.data,
      updatedAt: doc.updatedAt,
    });
  }

  @Method()
  async store({ req, res } = httpContext) {
    const uid = userId();
    if (!uid) return res.status(401).json({ message: "Unauthorized" });
    if (!isResumeDataBody(req.body)) {
      return res
        .status(422)
        .json({ message: "Missing or invalid `data` object" });
    }
    const label =
      typeof req.body.label === "string"
        ? req.body.label.trim().slice(0, 120)
        : undefined;
    try {
      const created = await Resume.create({
        user: uid,
        label: label || "Untitled resume",
        data: req.body.data,
      });
      return res.status(201).json({
        id: created._id.toString(),
        label: created.label,
        data: created.data,
      });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Could not create resume";
      if (msg.includes("at most")) {
        return res
          .status(403)
          .json({ message: msg, max: MAX_RESUMES_PER_USER });
      }
      return res.status(500).json({ message: msg });
    }
  }

  @Method()
  async update({ req, res } = httpContext) {
    const uid = userId();
    if (!uid) return res.status(401).json({ message: "Unauthorized" });
    if (!isResumeDataBody(req.body)) {
      return res
        .status(422)
        .json({ message: "Missing or invalid `data` object" });
    }
    const label =
      typeof req.body.label === "string"
        ? req.body.label.trim().slice(0, 120)
        : undefined;
    const doc = await Resume.findOne({ _id: req.params.id, user: uid });
    if (!doc) return res.status(404).json({ message: "Resume not found" });
    doc.data = req.body.data;
    if (label !== undefined) doc.label = label;
    await doc.save();
    return res.json({
      id: doc._id.toString(),
      label: doc.label,
      data: doc.data,
      updatedAt: doc.updatedAt,
    });
  }

  @Method({ params: ["id"] })
  async destroy(id: string) {
    const uid = userId();

    const result = await Resume.deleteOne({ _id: id, user: uid });
    if (result.deletedCount === 0) {
      return response().status(404).json({ message: "Resume not found" });
    }
    return response().status(204).send();
  }
}
