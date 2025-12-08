import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import { getDevEnvValue } from "../lib/env-reader";

const dbUrl = getDevEnvValue("DATABASE_URL", ".env.local");

if (!dbUrl || typeof dbUrl !== "string") {
  throw new Error("DATABASE_URL is not defined or not a string");
}

const pool = new Pool({
  connectionString: dbUrl,
});

export const db = drizzle(pool, { schema, logger: true });
