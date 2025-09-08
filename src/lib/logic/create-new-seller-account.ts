import { auth } from "@/auth";
import { sellerFormSchema } from "@/components/util/modals/seller-modal";
import { db } from "@/db/client";
import { sellers, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export async function createNewSellerAccount(
  data: z.infer<typeof sellerFormSchema>,
) {
  const sellerInsertSchema = createInsertSchema(sellers);
  /* 
  const validatedClientData = sellerFormSchema.safeParse(data);

  if (!validatedClientData.success) {
    console.log(validatedClientData.error);
    throw new Error("Data is not valid");
  } */

  const session = await auth();
  if (!session?.user) {
    throw new Error("User dosen't exits.");
  }
  if (!session.user.id) {
    throw new Error("User don't have a id");
  }

  // Preparing the data for db
  const dataForDb = {
    ...data,
    userId: session.user.id,
    phoneNumber: parseInt(data.phoneNumber, 10),
  };

  // Validating the whole data with the database insert schema

  const finalParsedData = sellerInsertSchema.safeParse(dataForDb);

  if (!finalParsedData.success) {
    console.log("Final data validation failed", finalParsedData.error);
    throw new Error("Internal server parsing error");
  }

  await db.insert(sellers).values(finalParsedData.data);

  try {
    await db
      .update(users)
      .set({ role: "Seller" })
      .where(eq(users.id, session.user.id));
  } catch (err) {
    if (err instanceof Error) {
      console.log("error happen while updating the user role", err.message);
    } else {
      console.log("Unexpected error happened while updating the user role");
    }
  }
}
