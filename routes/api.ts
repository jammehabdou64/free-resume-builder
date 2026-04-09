import { ResumeController } from "@Controllers/API/ResumeController";
import { Route } from "jcc-express-mvc/Core";
import { User } from "@/Model/User";

Route.get("/", function () {
  return { msg: [] };
});

Route.prefix("/resumes")
  .middleware(["auth"])
  .controller(ResumeController)
  .group((Route) => {
    Route.get("/", "index");
    Route.get("/{id}", "show");
    Route.post("/", "store");
    Route.put("/{id}", "update");
    Route.delete("/{id}", "destroy");
  });

Route.get("/num-users", async () => {
  return await User.countDocuments({});
});
