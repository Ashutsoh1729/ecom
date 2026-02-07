import {
  timestamp,
  pgTable,
  text,
  integer,
  AnyPgColumn,
  index,
  primaryKey,
} from "drizzle-orm/pg-core";
import { productStatus, stores, tsvector } from "./seller";
import { sql, SQL } from "drizzle-orm";

export const products = pgTable(
  "products",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    // linking back to store id
    storeId: text("store_id")
      .notNull()
      .references(() => stores.id, { onDelete: "cascade" }),
    name: text("name").notNull().unique(),
    description: text("description"),

    // adding auto generated columns, for search functionalities
    productSearch: tsvector("search_vector")
      .notNull()
      .generatedAlwaysAs(
        (): SQL =>
          sql`to_tsvector('english', ${products.name} || ' ' || coalesce(${products.description}, ''))`,
      ),
    slug: text("slug").notNull().unique(),

    // store image url here
    mainImageUrl: text("main_img").notNull().unique(),

    status: productStatus("status").default("draft").notNull(),

    // timestamps

    createdAt: timestamp("cretaed_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },

  // for search functionalities
  (t) => [index("idx_product_search").using("gin", t.productSearch)],
);

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
