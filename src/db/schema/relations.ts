import { relations } from "drizzle-orm";
import {
  categories,
  products,
  productsToCategories,
  productToTags,
  productVariants,
  tags,
} from "./products";
import { sellers, stores } from "./seller";
import { wishlists, wishlistsItems } from "./wishlist";
import { addresses } from "./address";
import { users } from "./user";
import { cart, cartItems } from "./cart";

// -- defining relations
export const productsRelations = relations(products, ({ many, one }) => {
  return {
    variants: many(productVariants),
    store: one(stores, {
      fields: [products.storeId],
      references: [stores.id],
    }),
    // Many-to-many: For linking products to categories
    productsToCategories: many(productsToCategories),

    // Many-to-many: For linking products to tags
    productToTags: many(productToTags),
    productToWishlistItems: one(wishlistsItems),
  };
});

// relations
// NOTE: Here i had made an error, of not correctly linkging the one - many relations
// 1. one side realtions are always need a configuration object to know how to link
// 2. Array is used to give the column list one one column

export const productVariantsRelations = relations(
  productVariants,
  ({ one }) => {
    return {
      product: one(products, {
        fields: [productVariants.productId],
        references: [products.id],
      }),
    };
  },
);

export const cartRelations = relations(cart, ({ one, many }) => ({
  user: one(users, {
    fields: [cart.userId],
    references: [users.id],
  }),
  items: many(cartItems),
}));

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
  cart: one(cart, {
    fields: [cartItems.cartId],
    references: [cart.id],
  }),
  products: one(products, {
    fields: [cartItems.productId],
    references: [products.id],
  }),
  variants: one(productVariants, {
    fields: [cartItems.variantId],
    references: [productVariants.id],
  }),
}));

// creating the relations for categories

// -- Category & Tag Relations (with M-M and self-referencing) --

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  // Self-referencing: for parent category
  parentCategory: one(categories, {
    fields: [categories.parentId],
    references: [categories.id],
  }),

  // Self-referencing: for sub-categories
  subCategories: many(categories, { relationName: "subCategories" }),

  // Many-to-many: For linking categories to products
  productsToCategories: many(productsToCategories),
}));

// creating the relations for tags

export const tagsRelations = relations(tags, ({ many }) => ({
  // Many-to-many: For linking tags to products
  productToTags: many(productToTags),
}));

// relation for addrss

export const addressRelations = relations(addresses, ({ one }) => {
  return {
    users: one(users, {
      fields: [addresses.userId],
      references: [users.id],
    }),
  };
});

export const productsToCategoriesRelations = relations(
  productsToCategories,
  ({ one }) => ({
    product: one(products, {
      fields: [productsToCategories.productId],
      references: [products.id],
    }),
    category: one(categories, {
      fields: [productsToCategories.categoryId],
      references: [categories.id],
    }),
  }),
);

export const productToTagsRelations = relations(productToTags, ({ one }) => ({
  product: one(products, {
    fields: [productToTags.productId],
    references: [products.id],
  }),
  tag: one(tags, {
    fields: [productToTags.tagId],
    references: [tags.id],
  }),
}));

export const usersRelations = relations(users, ({ one, many }) => {
  return {
    address: many(addresses),

    // A user can have ONE seller profile. This is the "has-one" side.
    // Drizzle infers the relationship from the foreign key on the 'sellers' table.
    // You don't need to specify fields/references here.
    seller: one(sellers),
    wishlists: one(wishlists),
  };
});
