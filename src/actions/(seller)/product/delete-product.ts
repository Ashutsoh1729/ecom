import { db } from "@/db/client";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { deleteFileFromS3 } from "./s3";

const deleteProduct = async ({ id }: { id: string }) => {
  if (!id) {
    console.log("The product id is not present. Can't delete the product.");
    throw new Error("Provide product id. ");
  }
  const imageUrl = await db.query.products.findFirst({
    where: eq(products.id, id),
    columns: {
      mainImageUrl: true,
    },
  });

  if (!imageUrl) {
    throw new Error("Image of the product not found. Internal Server error");
  }

  console.log("Image url: ", imageUrl);

  await deleteFileFromS3(imageUrl.mainImageUrl);

  await db.delete(products).where(eq(products.id, id));
};

export default deleteProduct;
