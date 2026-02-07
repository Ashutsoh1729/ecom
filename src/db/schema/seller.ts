// -- Seller Data --

import {
  boolean,
  customType,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { users } from "./user";
import { relations } from "drizzle-orm";
import { products } from "./products";

export const sellers = pgTable("sellers", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  // store info
  businessName: text("business_name").notNull(),
  phoneNumber: integer("phone_number").notNull().unique(),

  // -- payment --
  // The ID for the seller's account on a payment platform like Stripe
  stripeAccountId: text("stripe_account_id").unique(),

  // -- verification --
  isVerified: boolean("is_verified").notNull().default(false),
  agreedToTerms: boolean("agreed_to_terms").notNull().default(false),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const sellerRelations = relations(sellers, ({ many, one }) => {
  return {
    stores: many(stores),

    // A seller profile belongs to ONE user. This is the "belongs-to" side.
    // We explicitly define the relationship here.

    users: one(users, {
      fields: [sellers.userId],
      references: [users.id],
    }),
  };
});

export const stores = pgTable("stores", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  sellerId: text("seller_id")
    .notNull()
    .references(() => sellers.id, { onDelete: "set null" }),

  // -- store specification details --

  storeName: text("store_name").notNull().unique(),
  storeDescription: text("store_desctiption"),
  slug: text("slug").unique().notNull(),
  logoImage: text("logo_image"),
  coverImage: text("cover_image"),

  // to let the seller to temporarily deactive their stoer
  isActive: boolean("is_active").notNull().default(false),

  // time specification
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// NOTE: while linking i have link the relation on both sides

export const storeRelations = relations(stores, ({ many, one }) => {
  return {
    products: many(products),
    seller: one(sellers, {
      fields: [stores.sellerId],
      references: [sellers.id],
    }),
  };
});
export const productStatus = pgEnum("product_status", [
  "draft",
  "active",
  "archived",
]);

export const tsvector = customType<{
  data: string;
}>({
  dataType() {
    return `tsvector`;
  },
});
