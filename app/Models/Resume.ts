import mongoose, {
  type HydratedDocument,
  type InferSchemaType,
  Schema,
} from "mongoose";

/** Maximum saved resumes per user (enforced in pre-save hook). */
export const MAX_RESUMES_PER_USER = 3;

const ResumeSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    label: {
      type: String,
      trim: true,
      maxlength: 120,
      default: "Untitled resume",
    },
    /** Full builder payload: personal, experience[], education[], skills[], etc. */
    data: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true },
);

ResumeSchema.index({ user: 1, updatedAt: -1 });

type ResumeDoc = HydratedDocument<InferSchemaType<typeof ResumeSchema>>;

ResumeSchema.pre("save", async function resumeLimitPreSave() {
  if (!this.isNew) return;
  const ResumeModel = this.constructor as mongoose.Model<ResumeDoc>;
  const existing = await ResumeModel.countDocuments({ user: this.user });
  if (existing >= MAX_RESUMES_PER_USER) {
    throw new Error(
      `Each user may have at most ${MAX_RESUMES_PER_USER} resumes. Delete one before creating another.`,
    );
  }
});

export type ResumeDocument = ResumeDoc;
export const Resume = mongoose.model("Resume", ResumeSchema);
