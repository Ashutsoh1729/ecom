import { auth } from "@/auth";
import { db } from "@/db/client";
import { addresses } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUserAddress() {
  const session = await auth();
  if (!session || !session?.user.id) {
    throw new Error("User is not authenticated");
  }

  const userId = session.user.id;
  const address = await db.query.addresses.findMany({
    where: eq(addresses.userId, userId),
    columns: {
      userId: false,
    },
  });

  return address;
}
