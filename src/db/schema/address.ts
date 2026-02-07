import { pgTable, text, pgEnum, AnyPgColumn } from "drizzle-orm/pg-core";
import { users } from "./user";

export const AddressType = pgEnum("address_type", ["Home", "Work", "Other"]);
export const AddressCountry = pgEnum("address_country", [
  "India",
  "United States",
]);

export const addresses = pgTable("addresses", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references((): AnyPgColumn => users.id, {
      onDelete: "cascade",
    }),
  recipientName: text("recipient_name").notNull(),
  lane1: text("lane1").notNull(),
  lane2: text("lane2"),
  landmark: text("landmark"),
  city: text("city").notNull(),
  state: text("state").notNull(),
  postalCode: text("postal_code").notNull(),
  country: AddressCountry("country").notNull(),
  addressType: AddressType("address_type").notNull(),
  otherAddressType: text("other_address_type"),
});
