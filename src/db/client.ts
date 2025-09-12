import { neon, Pool } from "@neondatabase/serverless";
// import { configDotenv } from "dotenv";
import { drizzle } from "drizzle-orm/neon-serverless";
import * as schema from "./schema";

// configDotenv({ path: ".env.local" });

const pg = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle({ client: pg, schema: schema });
