import mongoose, { HydratedDocument, InferSchemaType } from "mongoose";

//
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

UserSchema.virtual("resumes", {
  ref: "Resume",
  localField: "_id",
  foreignField: "user",
});

UserSchema.set("toJSON", { virtuals: true });
UserSchema.set("toObject", { virtuals: true });

export const User = mongoose.model("User", UserSchema);
export type UserDocument = HydratedDocument<InferSchemaType<typeof UserSchema>>;
