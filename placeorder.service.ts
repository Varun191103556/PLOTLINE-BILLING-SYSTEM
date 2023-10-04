import { ServiceAPIResponse } from "../../types/service-response";
import { allCartItems } from "../../types/taxed-item";
import { AppDataSource } from "../data-source";
import { CartItem } from "../entity/CartItem";
import { Order } from "../entity/Order";
import { User } from "../entity/User";
import { addOrderItems } from "./addOrderItem.service";
import { deleteCartItems } from "./deletecart.service";
import { itemTaxCalculator } from "./tax.service";

const placeOrder = async (user: User): Promise<ServiceAPIResponse<Object>> => {
  /* Place order with cart items */
  const orderRepository = await AppDataSource.getRepository(Order);
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

  const newOrder = new Order();
  newOrder.user = user;
  newOrder.totalAmount = result.cartTotal;
  const orderDetails = await orderRepository.save(newOrder);

  await addOrderItems(result, newOrder);

  await deleteCartItems(user);

  return {
    statusCode: 200,
    body: {
      success: true,
      message: "🚚 Order placed successfully",
      data: { id: orderDetails.id, totalAmount: orderDetails.totalAmount },
    },
  };
};

export { placeOrder };
