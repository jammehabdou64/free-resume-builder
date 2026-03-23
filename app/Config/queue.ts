import { config } from "jcc-express-mvc";

export default {
  driver: config.get("QUEUE_CONNECTION", "memory"),

  connections: {
    memory: {
      queue: "default",
      file: "storage/queue.json", // Persists to file so queue:work works
    },

    database: {
      table: "jobs",
      queue: "default",
      retry_after: 90,
    },

    redis: {
      connection: {
        host: config.get("REDIS_HOST"),
        port: parseInt(config.get("REDIS_PORT", "6379"), 10),
        username: config.get("REDIS_USERNAME"),
        password: config.get("REDIS_PASSWORD"),
        db: parseInt(config.get("REDIS_DB") || "0", 10),
      },
      queue: "default",
      prefix: "queue",
      blockFor: 5,
    },
  },
};
