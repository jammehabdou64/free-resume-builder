import { AuthController } from "@Controllers/AuthController";
import { ResumeController } from "@Controllers/ResumeController";
import { ResumeSyncController } from "@Controllers/ResumeSyncController";
import { Route } from "jcc-express-mvc/Core";

Route.middleware("guest").get("/", () => inertia("Index"));

Route.middleware("guest").get("/resume", () => inertia("Resume"));

Route.middleware("guest").get("/login", () => inertia("Auth/Login"));

Route.middleware("guest").get("/register", () => inertia("Auth/Register"));

Route.middleware(["auth"]).get("/home", () => inertia("Home"));

Route.prefix("/resume")
  .middleware(["auth"])
  .controller(ResumeSyncController)
  .group((Route) => {
    Route.get("/sync", "index");
    Route.post("/sync", "sync");
  });

Route.prefix("/resume")
  .middleware(["auth"])
  .controller(ResumeController)
  .group((Route) => {
    Route.get("/", "index");
    Route.get("/preview/{resume}", "show");
  });

Route.prefix("/auth").group((Route) => {
  Route.post("/login", [AuthController, "login"]);
  Route.post("/register", [AuthController, "register"]);
});

Route.middleware(["auth"]).get("/logout", [AuthController, "logout"]);
