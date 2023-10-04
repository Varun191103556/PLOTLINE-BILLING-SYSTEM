import { CartItem } from "../src/entity/CartItem";

interface cartTaxItem extends CartItem {
  tax: number;
  taxItemPrice: number;
  itemTotal: number;
}

interface allCartItems {
  products: cartTaxItem[];
  services: cartTaxItem[];
  cartTotal: number;
  taxTotal: number;
}
export { cartTaxItem, allCartItems };
