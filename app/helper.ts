import mongoose from "mongoose";

export const userId = (): string => {
  const u = auth() as { _id?: mongoose.Types.ObjectId; id?: string };
  if (!u) return "";
  return u._id?.toString() ?? String(u.id ?? "");
};

export const isResumeDataBody = (
  body: unknown,
): body is {
  data: Record<string, unknown>;
  label?: string;
  resume_id?: string;
} => {
  return (
    body !== null &&
    typeof body === "object" &&
    "data" in body &&
    typeof (body as { data: unknown }).data === "object" &&
    (body as { data: unknown }).data !== null
  );
};
