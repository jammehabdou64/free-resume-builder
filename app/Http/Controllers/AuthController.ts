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

  async logout() {
    return Auth.logout(request(), response());
  }
}
