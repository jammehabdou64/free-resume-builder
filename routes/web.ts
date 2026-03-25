import { AuthController } from "@Controllers/AuthController";
import { ResumeSyncController } from "@Controllers/ResumeSyncController";
import { Auth } from "jcc-express-mvc/";
import { Route } from "jcc-express-mvc/Core";

Route.middleware("guest").get("/", () => {
  return response().inertia("Index");
});

Route.middleware("guest").get("/resume", () => {
  return response().inertia("Resume");
});

Route.middleware("guest").get("/login", () => {
  response().inertia("Auth/Login");
});

Route.middleware("guest").get("/register", () =>
  response().inertia("Auth/Register"),
);

Route.middleware(["auth"]).get("/home", () => {
  return response().inertia("Home");
});

Route.middleware(["auth"]).post("/resume/sync", [ResumeSyncController, "sync"]);

Route.prefix("/auth").group((Route) => {
  Route.post("/login", [AuthController, "login"]);
  Route.post("/register", [AuthController, "register"]);
});
Route.middleware(["auth"]).get("/logout", [AuthController, "logout"]);
