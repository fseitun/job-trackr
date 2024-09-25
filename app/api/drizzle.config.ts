import type { Config } from "drizzle-kit";

const config: Config = {
  schema: "./src/database/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host: process.env.DATABASE_HOST || "localhost",
    port: parseInt(process.env.DATABASE_PORT || "5433"),
    user: process.env.DATABASE_USER || "postgres",
    password: process.env.DATABASE_PASSWORD || "difficult-password",
    database: process.env.DATABASE_NAME || "db_name",
    ssl: false,
  },
};

export default config;
