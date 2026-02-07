import { cart, cartItems } from "./cart";
import {
  users,
  userRole,
  verificationTokens,
  accounts,
  authenticators,
} from "./user";
import { addresses } from "./address";
import {
  orders,
  orderItems,
  orderStatus,
  orderRelations,
  orderItemsToProducts,
} from "./order";
import {
  wishlists,
  wishlistsItems,
  wishlistsRelations,
  wishlistsItemsRelations,
} from "./wishlist";
import { sellers, sellerRelations, stores, storeRelations } from "./seller";
import {
  products,
  categories,
  tags,
  productToTags,
  productVariants,
  productsToCategories,
} from "./products";

import {
  productsRelations,
  productToTagsRelations,
  productVariantsRelations,
  productsToCategoriesRelations,
  categoriesRelations,
  tagsRelations,
  cartRelations,
  cartItemsRelations,
  addressRelations,
  usersRelations,
} from "./relations";

export {
  // users
  users,
  userRole,
  verificationTokens,
  accounts,
  authenticators,

  // address
  addresses,

  // orders
  orders,
  orderItems,
  orderStatus,
  orderRelations,
  orderItemsToProducts,

  // wishlists
  wishlists,
  wishlistsItems,
  wishlistsRelations,
  wishlistsItemsRelations,

  //cart
  cart,
  cartItems,

  // sellers
  sellers,
  sellerRelations,
  stores,
  storeRelations,

  // products
  products,
  productToTags,
  productVariants,
  productsToCategories,

  // category
  categories,
  tags,

  // relations
  productsRelations,
  productToTagsRelations,
  productVariantsRelations,
  productsToCategoriesRelations,
  categoriesRelations,
  tagsRelations,
  cartRelations,
  cartItemsRelations,
  addressRelations,
  usersRelations,
};
