import { Auth, Socialite } from "jcc-express-mvc";
import { httpContext } from "jcc-express-mvc";
import { Method } from "jcc-express-mvc/Core/Dependency";
import { AuthRequest } from "@/Request/AuthRequest";
import { User } from "@/Model/User";

export class AuthController {
  //

  //

  @Method()
  async register({ next } = httpContext, authRequest: AuthRequest) {
    const save = await authRequest.save();
    return save
      ? Auth.attempt(next, "/dashboard")
      : response().status(401).json({ message: "Invalid credentials" });
  }

  //

  async login({ req, next } = httpContext) {
    return Auth.attempt(next, "/dashboard");
  }

  google() {
    return Socialite.driver("google").redirect();
  }
  async googleCallback() {
    const user = (await Socialite.driver("google").user()) as any;
    const updatedUser = await User.findOneAndUpdate(
      { email: user.email },
      {
        $setOnInsert: {
          name: user.name,
          email: user.email,
          google_id: user.id,
        },
      },
      { returnDocument: "after", upsert: true },
    );
    return Auth.socialLogin(updatedUser._id.toString());
  }
  github() {
    return Socialite.driver("github").redirect();
  }
  async githubCallback({ next } = httpContext) {
    const user = (await Socialite.driver("github").user()) as any;
    try {
      const updatedUser = await User.findOneAndUpdate(
        { email: user.email },
        {
          $setOnInsert: {
            name: user.name,
            email: user.email,
            github_id: user.id,
          },
        },
        { returnDocument: "after", upsert: true },
      );
      return Auth.socialLogin(updatedUser._id.toString());
    } catch (err) {
      next(err);
    }
  }

  facebook() {
    return Socialite.driver("facebook").redirect();
  }
  async facebookCallback() {
    const user = (await Socialite.driver("facebook").user()) as any;
    const updatedUser = await User.findOneAndUpdate(
      { email: user.email },
      {
        $setOnInsert: {
          name: user.name,
          email: user.email,
          facebook_id: user.id,
        },
      },
      { returnDocument: "after", upsert: true },
    );
    return Auth.socialLogin(updatedUser._id.toString());
  }

  gitlab() {
    return Socialite.driver("gitlab").redirect();
  }
  async gitlabCallback({ next } = httpContext) {
    const user = (await Socialite.driver("gitlab").user()) as any;
    try {
      const updatedUser = await User.findOneAndUpdate(
        { email: user.email },
        {
          $setOnInsert: {
            name: user.name,
            email: user.email,
            gitlab_id: user.id,
          },
        },
        { returnDocument: "after", upsert: true },
      );
      return Auth.socialLogin(updatedUser._id.toString());
    } catch (err) {
      next(err);
    }
  }

  twitter() {
    return Socialite.driver("twitter").redirect();
  }
  async twitterCallback() {
    const user = (await Socialite.driver("twitter").user()) as any;
    const email =
      typeof user.email === "string" && user.email.trim()
        ? user.email.trim()
        : `twitter_${user.id}@oauth.local`;
    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        $setOnInsert: {
          name: user.name,
          email,
          twitter_id: user.id,
        },
      },
      { returnDocument: "after", upsert: true },
    );
    return Auth.socialLogin(updatedUser._id.toString());
  }

  logout() {
    return Auth.logout();
  }
}
