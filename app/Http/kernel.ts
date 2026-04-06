import { auth, guest } from "jcc-express-mvc";
import { inertia } from "jcc-express-mvc/Core/Inertia";
import { resumeLoginDataPreserver } from "app/Http/Middlewares/preLoginDataPreserver";
export class Kernel {
  //

  public middlewares = [
    //
    inertia({ rootView: "index", ssr: true }),
  ];

  public middlewareAliases = {
    auth,
    guest,
    resumeLoginDataPreserver,
  };
}
