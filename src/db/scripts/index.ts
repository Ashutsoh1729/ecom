/* // Populating the slug values

import { eq, isNull } from "drizzle-orm";
import { db } from "../client";
import { products } from "../schema";
import { generateProductSlug } from "../logic";

async function backfillSlug() {
  console.log("Starting backfill for product slugs...");

  // finding all the products to update
  const productsToUpdate = await db
    .select()
    .from(products)
    .where(isNull(products.slug));

  // handling the case where every product has a slug value
  if (productsToUpdate.length === 0) {
    console.log("No products need a slug. All done!");
    return;
  }
  console.log(`Found ${productsToUpdate.length} products to update.`);

  await db.transaction(async (tx) => {
    for (const product of productsToUpdate) {
      const newSlug = generateProductSlug(product.name);
      await tx
        .update(products)
        .set({ slug: newSlug })
        .where(eq(products.id, product.id));
    }
  });

  console.log("Backfill complete!");
}

backfillSlug().catch(console.error); */
