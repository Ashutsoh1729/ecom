import {
  timestamp,
  pgTable,
  text,
  integer,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { users } from "./user";
import { products, productVariants } from "./products";
// -- Enum Declaration --
/**
 * The 'cart' table stores the active shopping cart for a user (one-to-one).
 */
export const cart = pgTable("cart", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  // Foreign key to the user table, ensuring one cart per user
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const cartItems = pgTable(
  "cart_items",
  {
    id: text("id")
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    // Link back to the parent cart
    cartId: text("cart_id")
      .notNull()
      .references(() => cart.id, { onDelete: "cascade" }),
    // Reference the product/variant being added
    productId: text("product_id")
      .notNull()
      .references(() => products.id),
    variantId: text("variant_id")
      .notNull()
      .references(() => productVariants.id),
    quantity: integer("quantity").notNull().default(1),
    addedAt: timestamp("added_at").defaultNow().notNull(),
  },
  (t) => [
    uniqueIndex("cart_product_variant_unique").on(
      t.variantId,
      t.productId,
      t.cartId,
    ),
  ],
);
