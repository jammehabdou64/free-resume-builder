import { config } from "jcc-express-mvc";
export const database = {
  orm: config.get("DB_ORM", "jcc"),
  sequelize: {
    database: config.get("DB_DATABASE"),
    username: config.get("DB_USERNAME", "root"),
    password: config.get("DB_PASSWORD"),

    options: {
      dialect: config.get("DB_CONNECTION", "mysql"),
      host: config.get("DB_HOST", "localhost"),
      port: Number(config.get("DB_PORT", "3306")),
    },

    sync: {
      force: false,
      alter: true,
      //   logging: config.get("DB_LOGGING", false),
    },
    dropTables: false,
  },
  mongoose: {
    host: config.get("DB_HOST", "127.0.0.1"),
    port: Number(config.get("DB_PORT", "27017")),
    database: config.get("DB_DATABASE", ""),
    username: config.get("DB_USERNAME", ""),
    password: config.get("DB_PASSWORD", ""),
    options: {},
  },
};
