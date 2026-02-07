import {
  timestamp,
  pgTable,
  text,
  integer,
  pgEnum,
  numeric,
} from "drizzle-orm/pg-core";
import { products, productVariants } from "./products";
import { relations, sql } from "drizzle-orm";
import { addresses } from "./address";
import { users } from "./user";
// -- Order Table --
// Info needed:
//

export const orderStatus = pgEnum("order_status", [
  "PENDING",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
]);

export const orders = pgTable("orders", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  status: orderStatus("status").default("PENDING").notNull(),
  totalAmount: numeric("total_amount", { scale: 2, precision: 10 })
    .notNull()
    .$type<number>(),
  shippingAddressId: text("shipping_address_id")
    .notNull()
    .references(() => addresses.id),
  orderDate: timestamp("order_date").defaultNow().notNull(),
  deliveryDate: timestamp("delivery_date")
    .default(sql`now() + interval '5 days'`)
    .notNull(),
});

export const orderRelations = relations(orders, ({ one, many }) => ({
  address: one(addresses, {
    fields: [orders.shippingAddressId],
    references: [addresses.id],
  }),
  items: many(orderItems),
}));

export const orderItems = pgTable("order_items", {
  id: text("id")
    .notNull()
    .$defaultFn(() => crypto.randomUUID()),
  orderId: text("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  productId: text("product_id")
    .notNull()
    .references(() => products.id),
  variantId: text("variant_id")
    .notNull()
    .references(() => productVariants.id),
  quantity: integer("quantity").notNull(),
  // CRITICAL: The price at the time the order was placed. This MUST be saved!
  priceAtOrder: numeric("price_at_order", {
    precision: 10,
    scale: 2,
  })
    .notNull()
    .$type<number>(),
});

export const orderItemsToProducts = relations(orderItems, ({ one }) => ({
  products: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
}));

// OrderItems relations
// OrderItems -> products, orders, variants
