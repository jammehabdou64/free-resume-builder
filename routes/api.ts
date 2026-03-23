import { apiAuth } from "jcc-express-mvc";
import { Route } from "jcc-express-mvc/Core";
import { ResumeController } from "@Controllers/API/ResumeController";

Route.get("/", async function (req, res) {
  return res.json({ msg: [] });
});

Route.middleware([apiAuth]).controller(ResumeController).group((Route) => {
  Route.get("/resumes", "index");
  Route.post("/resumes", "store");
  Route.get("/resumes/:id", "show");
  Route.put("/resumes/:id", "update");
  Route.patch("/resumes/:id", "update");
  Route.delete("/resumes/:id", "destroy");
});
