"use server";

import { auth } from "@/auth";
import slugify from "slugify";
import { storeFormSchema } from "@/components/modals/create-store-modal";
import { db } from "@/db/client";
import { sellers, stores } from "@/db/schema";
import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import z from "zod";
import { nanoid } from "nanoid";

export default async function createNewStore(
  data: z.infer<typeof storeFormSchema>,
) {
  const storeInsertSchema = createInsertSchema(stores);

  // check for whether the user exists or not
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("User dosen't exits.");
    }
    if (!session.user.id) {
      throw new Error("User don't have a id");
    }

    const userId = session.user.id;
    // First getting the seller id from user id

    console.log(userId);
    console.log(data);

    // preparing the data for the db
    const seller = await db.query.sellers.findFirst({
      where: eq(sellers.userId, userId),
    });

    const baseSlug = slugify(data.storeName, {
      lower: true,
      strict: true,
    });

    const uniqueSlug = `${baseSlug}-${nanoid(6)}`; // append a 6-char unique id

    const dbData = {
      ...data,
      sellerId: seller?.id,
      slug: uniqueSlug,
    };

    const finalParsedData = storeInsertSchema.safeParse(dbData);

    if (!finalParsedData.success) {
      console.log("Final data validation failed", finalParsedData.error);
      throw new Error("Internal server parsing error");
    }

    // Inserting the safe parsed into the db

    await db.insert(stores).values(finalParsedData.data);
  } catch (err) {
    console.error("Some error has happened at the server end", err);
  }
}
