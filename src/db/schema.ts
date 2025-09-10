import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  pgEnum,
  AnyPgColumn,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "@auth/core/adapters";

// -- Enum Declaration --

export const userRole = pgEnum("user_role", ["Seller", "Buyer"]);

// -- Authentication --

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  role: userRole("role").default("Buyer").notNull(),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ],
);
/* 
 * -- Not needed as we have transitioned to the jwt strategy --
 *
export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});
 */
export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => [
    {
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
      }),
    },
  ],
);

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => [
    {
      compositePK: primaryKey({
        columns: [authenticator.userId, authenticator.credentialID],
      }),
    },
  ],
);

// -- Seller Data --

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

export const stores = pgTable("stores", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  sellerId: text("seller_id")
    .notNull()
    .references(() => sellers.id, { onDelete: "set null" }),

  // -- store specification details --

  storeName: text("store_name").notNull(),
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

export const productStatus = pgEnum("product_status", [
  "draft",
  "active",
  "archived",
]);

export const products = pgTable("products", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  // linking back to store id
  storeId: text("store_id")
    .notNull()
    .references(() => stores.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),

  status: productStatus("status").default("draft").notNull(),

  // timestamps

  createdAt: timestamp("cretaed_at").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const productVariants = pgTable("product_variants", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  productId: text("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  sku: text("sku").notNull().unique(),

  // variant descriptive attribute
  name: text("name").notNull(),
  color: text("color").notNull(),
  size: text("size").notNull(),
  price: integer("price").notNull(),
  quantity: integer("quantity").notNull(),

  // timestaps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// -- Category Table --

export const categories = pgTable("categories", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),

  // This is a self referencing link to sub categories
  // This is the self-referencing link for sub-categories
  parentId: text("parent_id").references((): AnyPgColumn => categories.id, {
    onDelete: "cascade",
  }),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const tags = pgTable("tags", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull().unique(),
  description: text("description"),

  // time related
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// -- join table --
//
//

export const productToTags = pgTable(
  "product_to_tags",
  {
    productId: text("product_id")
      .notNull()
      .references((): AnyPgColumn => products.id, { onDelete: "cascade" }),
    tagId: text("tag_id")
      .notNull()
      .references((): AnyPgColumn => tags.id, { onDelete: "cascade" }),
  },
  // For creating composite pk
  (table) => [primaryKey({ columns: [table.productId, table.tagId] })],
);

export const productsToCategories = pgTable(
  "products_to_categories",
  {
    productId: text("product_id")
      .notNull()
      .references((): AnyPgColumn => products.id, { onDelete: "cascade" }),
    categoryId: text("category_id")
      .notNull()
      .references((): AnyPgColumn => categories.id, { onDelete: "cascade" }),
  },
  // It will ensure that the product will not be linked to the same category twice, that means the combination will be a primary key
  // It is called composite primary key
  (t) => [primaryKey({ columns: [t.productId, t.categoryId] })],
);
