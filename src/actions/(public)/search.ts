"use server";

import { db } from "@/db/client";
import { sql } from "drizzle-orm";

export type ProductSearchResult = {
  id: string;
  name: string;
  main_img: string;
  slug: string;
};

export async function searchProducts(query: string) {
  const result = await db.execute(sql`
    SELECT id, name, main_img, slug
    FROM products
    WHERE search_vector @@ plainto_tsquery('english', ${query})
	LIMIT 20
`);

  return result.rows as ProductSearchResult[];
}
