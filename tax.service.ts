import { allCartItems, cartTaxItem } from "../../types/taxed-item";
import { CartItem } from "../entity/CartItem";

const productTax = (price: number): number => {
  let [pa, pb, pc] = [0, 0, 200];
  if (price > 1000 && price <= 5000) {
    pa = price * 0.12;
  }
  if (price > 5000) {
    pb = price * 0.18;
  }

  return +(pa + pb + pc).toFixed(2);
};

const serviceTax = (price: number): number => {
  let [sa, sb, sc] = [0, 0, 100];
  if (price > 1000 && price <= 8000) {
    sa = price * 0.1;
  }
  if (price > 8000) {
    sb = price * 0.15;
  }
  return +(sa + sb + sc).toFixed(2);
};

const makeProductTotal = (
  result: allCartItems
): { sumPrice: number; sumTax: number } => {
  let [sumPrice, sumTax] = [0, 0];

  result.products.forEach(
    (product) => (sumPrice += product.taxItemPrice * product.quantity)
  );

  result.products.forEach(
    (product) => (sumTax += product.tax * product.quantity)
  );

  return { sumPrice: +sumPrice.toFixed(2), sumTax: +sumTax.toFixed(2) };
};

const makeServiceTotal = (
  result: allCartItems
): { sumPrice: number; sumTax: number } => {
  let [sumPrice, sumTax] = [0, 0];

  result.services.forEach(
    (service) => (sumPrice += service.taxItemPrice * service.quantity)
  );

  result.services.forEach(
    (service) => (sumTax += service.tax * service.quantity)
  );

  return { sumPrice: +sumPrice.toFixed(2), sumTax: +sumTax.toFixed(2) };
};

const itemTaxCalculator = async (items: CartItem[]): Promise<allCartItems> => {
  let result: allCartItems = {
    products: [],
    services: [],
    cartTotal: 0,
    taxTotal: 0,
  };
  items.forEach((item) => {
    if (item.service === null) {
      const price = item.product.price;
      const tax = productTax(price);

      const itemToPush: cartTaxItem = {
        ...item,
        tax: tax,
        taxItemPrice: price + tax,
        itemTotal: (price + tax) * item.quantity,
      };

      result.products.push(itemToPush);
    } else {
      const price = item.service.price;
      const tax = serviceTax(price);

      const itemToPush: cartTaxItem = {
        ...item,
        tax: tax,
        taxItemPrice: price + tax,
        itemTotal: (price + tax) * item.quantity,
      };

      result.services.push(itemToPush);
    }
  });
  result.cartTotal =
    makeProductTotal(result).sumPrice + makeServiceTotal(result).sumPrice;
  result.taxTotal =
    makeProductTotal(result).sumTax + makeServiceTotal(result).sumTax;
  return result;
};
export { itemTaxCalculator };
