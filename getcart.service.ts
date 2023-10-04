import { ServiceAPIResponse } from "../../types/service-response";
import { AppDataSource } from "../data-source";
import { CartItem } from "../entity/CartItem";
import { User } from "../entity/User";
import { allCartItems } from "../../types/taxed-item";
import { itemTaxCalculator } from "./tax.service";

const getCartItems = async (
  user: User
): Promise<ServiceAPIResponse<allCartItems>> => {
  /* Get items of your cart here */
  const items = await AppDataSource.getRepository(CartItem).find({
    relations: {
      product: true,
      service: true,
    },
    where: {
      user: user,
    },
    order: {
      id: "ASC",
    },
  });
  if (!items) {
    return {
      statusCode: 200,
      body: { success: true, message: "🛍️ Your cart is empty" },
    };
  }
  const result: allCartItems = await itemTaxCalculator(items);

  return {
    statusCode: 200,
    body: {
      success: true,
      message: "🛍️ Fetched all items from cart successfully",
      data: result,
    },
  };
};

export { getCartItems };
