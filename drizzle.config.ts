import { defineConfig } from "drizzle-kit";
import { getDevEnvValue } from "./lib/env-reader";

const dbUrl = getDevEnvValue("DATABASE_URL", ".env.local");

if (!dbUrl || typeof dbUrl !== "string") {
  throw new Error("DATABASE_URL is not defined or not a string");
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schema.ts",
  out: "./drizzle/migrations",
  dbCredentials: {
    url: dbUrl,
  },
  strict: true,
});
