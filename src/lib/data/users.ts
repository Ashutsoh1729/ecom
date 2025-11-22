// This is created initially. I have transferd the function to the action folder
// where all the server functions are written. As it is used in some places, i have
// kept it still

import { auth } from "@/auth";
import { db } from "@/db/client";
import { addresses, orders } from "@/db/schema";
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

// extracting user orders for showing in account page
export async function getUsersOrders() {
  // getting user id
  const session = await auth();
  if (!session || !session?.user.id) {
    throw new Error("User is not authenticated");
  }

  const userId = session.user.id;

  // Things i need:
  // 1. Recipient Name, 2. Product Name, 3. Product Image,4. Product Price, 5. Product_slug, 6. Product Sku, 7. delivery Time, 8. delivery state, 9. delivery status

  const userOrders = await db.query.orders.findMany({
    where: eq(orders.userId, userId),
    limit: 3,
    columns: {
      status: true,
      deliveryDate: true,
    },
    with: {
      items: {
        columns: {
          id: false,
          orderId: false,
        },
        with: {
          products: {
            columns: {
              name: true,
              slug: true,
              mainImageUrl: true,
            },
            with: {
              variants: {
                columns: {
                  sku: true,
                  price: true,
                },
              },
            },
          },
        },
      },
      address: {
        columns: {
          state: true,
          city: true,
          recipientName: true,
        },
      },
    },
  });

  return userOrders;
}
