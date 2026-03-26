import { Auth, type Next, type Request, type Response } from "jcc-express-mvc";

export const resumeLoginDataPreserver = (
  req: Request,
  res: Response,
  next: Next,
) => {
  if (!Auth.check()) {
    const s = session();
    if (
      s != null &&
      req.method === "POST" &&
      req.body &&
      typeof req.body === "object"
    ) {
      s.put("resumeLoginData", req.body);
    }
  }

  next();
};
