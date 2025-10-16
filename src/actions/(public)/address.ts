"use server";

import { auth } from "@/auth";
import { AddressFormType } from "@/components/modals/address-modal";
import { db } from "@/db/client";
import { addresses } from "@/db/schema";
import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";

// Here all the user related server functions are written

export async function createAddress(data: AddressFormType) {
  if (!data) {
    console.error("Data is required");
    throw new Error("Address data is required");
  }

  // I had forgot to add the userId to the inserting data
  const session = await auth();
  if (!session || !session?.user.id) {
    throw new Error("User is not authenticated");
  }

  const userId = session.user.id;
  const newInsertData = { ...data, userId: userId };

  // creating insert validation schema
  const addressInsertSchema = createInsertSchema(addresses);
  const validatedData = addressInsertSchema.safeParse(newInsertData);

  // Most likely the function will fail here
  if (!validatedData.success) {
    throw new Error("Data type mismatch at inserting address");
  }

  await db.insert(addresses).values(validatedData.data);
}

export async function deleteAddress(addressId: string) {
  console.log(`User want to delete his address`);
  await db.delete(addresses).where(eq(addresses.id, addressId));
}

export async function getAddress() {
  const session = await auth();
  if (!session || !session?.user.id) {
    throw new Error("User is not authenticated");
  }

  const userId = session.user.id;

  const allAddress = await db.query.addresses.findMany({
    where: eq(addresses.userId, userId),
    columns: {
      userId: false,
    },
  });

  return allAddress;
}
