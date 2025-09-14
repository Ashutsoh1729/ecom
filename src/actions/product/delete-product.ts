import { db } from "@/db/client";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";

const deleteProduct = async ({ id }: { id: string }) => {
  if (!id) {
    console.log("The product id is not present. Can't delete the product.");
    throw new Error("Provide product id. ");
  }

  await db.delete(products).where(eq(products.id, id));
};

export default deleteProduct;
