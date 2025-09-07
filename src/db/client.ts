import { neon } from "@neondatabase/serverless";
// import { configDotenv } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";

// configDotenv({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });
