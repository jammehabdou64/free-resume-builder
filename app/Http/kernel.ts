import { auth, guest } from "jcc-express-mvc";
import { inertia } from "jcc-express-mvc/Core/Inertia";

export class Kernel {
  //

  public middlewares = [
    //
    inertia({ rootView: "index" }),
  ];

  public middlewareAliases = {
    auth,
    guest,
  };
}
