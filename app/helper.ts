import { checkJwtAccessTokenPayload } from "jcc-express-mvc";
import { jwtSubjectId } from "jcc-express-mvc/lib/util";
import { User } from "@/Model/User";
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

export const getAuth = async () => {
  //
  try {
    const token = request().cookies.auth_token;
    if (!token) {
      return {};
    }
    const payload = jwtVerify(token);
    if (!checkJwtAccessTokenPayload(payload).ok) return {};

    const id = jwtSubjectId(payload);
    return User.findById(id) || {};
  } catch (error) {
    return {};
  }
};
