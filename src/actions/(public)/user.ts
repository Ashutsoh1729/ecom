import { createAddress, deleteAddress } from "./address";
import {
  getCartFromDB,
  addCartItem,
  updateCartItem,
  removeCartItem,
} from "./cart";
import { placeOrder } from "./order";

export {
  // Address related
  createAddress,
  deleteAddress,

  // cart related
  getCartFromDB,
  addCartItem,
  updateCartItem,
  removeCartItem,

  // order related
  placeOrder,
};
