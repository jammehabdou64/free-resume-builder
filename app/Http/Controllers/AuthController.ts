import { Auth } from "jcc-express-mvc";
import { httpContext } from "jcc-express-mvc";
import { Inject, Method } from "jcc-express-mvc/Core/Dependency";
import { AuthRequest } from "@/Request/AuthRequest";

export class AuthController {
  //

  //

  @Method()
  async register({ next } = httpContext, authRequest: AuthRequest) {
    const save = await authRequest.save();
    return save
      ? Auth.attempt(next)
      : response().status(401).json({ message: "Invalid credentials" });
  }

  //

  async login({ req, next } = httpContext) {
    return Auth.attempt(next);
  }

  logout({ req, res } = httpContext) {
    return (Auth as { logout: (r: typeof req, s: typeof res) => unknown }).logout(
      req,
      res,
    );
  }
}
