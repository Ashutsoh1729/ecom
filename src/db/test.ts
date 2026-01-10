import { db } from "./client"; // your drizzle db instance
import { sql } from "drizzle-orm";

async function testSearch() {
  // 2. Run a search query
  const query = "allen solly shirt";

  const result = await db.execute(sql`
    SELECT id, name
    FROM products
    WHERE search_vector @@ plainto_tsquery('english', ${query});
  `);

  console.log("Search results:", result.rows);
}

testSearch()
  .then(() => process.exit(0))
  .catch(console.error);
