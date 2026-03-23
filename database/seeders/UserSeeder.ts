import { bcrypt } from "jcc-express-mvc";
import { User } from "../../app/Models/User";
export class UserSeeder {
  //

  async run() {
    const users = [
      {
        name: "Administrator",
        email: "admin@example.com",
        password: await bcrypt("password"),
        address: "Busumbala",
      },
      {
        name: "User",
        email: "user@example.com",
        password: await bcrypt("password"),
        address: "Busumbala",
      },
    ];

    await User.create(users);
  }
}
