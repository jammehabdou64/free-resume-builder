import { auth } from "./auth";
import { cors } from "./cors";
import { engine } from "./engine";
import { rateLimit } from "./rate-limit";
import { service } from "./service";
import { database } from "./database";

export const config = {
  auth,
  engine,
  cors,
  rateLimit,
  database,
  service,
};
