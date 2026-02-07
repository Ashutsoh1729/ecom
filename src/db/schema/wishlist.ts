import { timestamp, pgTable, text, uniqueIndex } from "drizzle-orm/pg-core";
import { users } from "./user";
import { relations } from "drizzle-orm";
import { products } from "./products";
// -- Like Table -
// Will add the like option

export const wishlists = pgTable("wishlists", {
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

// wishlists relations
export const wishlistsRelations = relations(wishlists, ({ one, many }) => ({
  user: one(users, {
    fields: [wishlists.userId],
    references: [users.id],
  }),
  wishlistItems: many(wishlistsItems),
}));

export const wishlistsItems = pgTable(
  "wishlists_items",
  {
    id: text("id")
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    // Link back to the parent cart
    wishlistsId: text("wishlists_id")
      .notNull()
      .references(() => wishlists.id, { onDelete: "cascade" }),
    // Reference the product/variant being added
    productId: text("product_id")
      .notNull()
      .references(() => products.id),
    addedAt: timestamp("added_at").defaultNow().notNull(),
  },
  (t) => [
    uniqueIndex("uniqueWishlistAndProduct").on(t.wishlistsId, t.productId),
  ],
);

// wishlistsItems relations
export const wishlistsItemsRelations = relations(wishlistsItems, ({ one }) => ({
  wishlists: one(wishlists, {
    fields: [wishlistsItems.wishlistsId],
    references: [wishlists.id],
  }),
  products: one(products, {
    fields: [wishlistsItems.productId],
    references: [products.id],
  }),
}));
