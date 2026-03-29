import { AuthController } from "@Controllers/AuthController";
import { ResumeController } from "@Controllers/ResumeController";
import { ResumeSyncController } from "@Controllers/ResumeSyncController";
import { resumeLoginDataPreserver } from "app/Http/Middlewares/preLoginDataPreserver";
import { Route } from "jcc-express-mvc/Core";
import { getAuth } from "app/helper";

Route.get("/", async () => {
  const auth = await getAuth();
  inertia("Index", { auth });
});

Route.middleware("auth").get("/resume", () => inertia("Resume"));

Route.middleware("guest").get("/login", () => inertia("Auth/Login"));

Route.middleware("guest").get("/register", () => inertia("Auth/Register"));

Route.middleware(["auth"]).get("/dashboard", [ResumeController, "dashboard"]);

Route.middleware(["auth"]).get("/home", [ResumeController, "dashboard"]);

Route.prefix("/resume")
  .middleware([resumeLoginDataPreserver, "auth"])
  .controller(ResumeSyncController)
  .group((Route) => {
    Route.get("/sync", "index");
    Route.post("/sync", "sync");
  });

Route.prefix("/resume")
  .middleware(["auth"])
  .controller(ResumeSyncController)
  .group((Route) => {
    Route.post("/photo", "uploadPhoto");
  });

Route.middleware(["auth"]).get("/resumes", [ResumeController, "index"]);

Route.prefix("/resume")
  .middleware(["auth"])
  .controller(ResumeController)
  .group((Route) => {
    Route.get("/create", "create");
    Route.get("/preview/{resume}", "show");
  });

Route.prefix("/auth").group((Route) => {
  Route.post("/login", [AuthController, "login"]);
  Route.post("/register", [AuthController, "register"]);
});

Route.middleware(["auth"]).get("/logout", [AuthController, "logout"]);

Route.get("/auth/google", [AuthController, "google"]);
Route.get("/auth/google/callback", [AuthController, "googleCallback"]);

Route.get("/auth/github", [AuthController, "github"]);
Route.get("/auth/github/callback", [AuthController, "githubCallback"]);

Route.get("/auth/facebook", [AuthController, "facebook"]);
Route.get("/auth/facebook/callback", [AuthController, "facebookCallback"]);

Route.get("/auth/gitlab", [AuthController, "gitlab"]);
Route.get("/auth/gitlab/callback", [AuthController, "gitlabCallback"]);

Route.get("/auth/twitter", [AuthController, "twitter"]);
Route.get("/auth/twitter/callback", [AuthController, "twitterCallback"]);
