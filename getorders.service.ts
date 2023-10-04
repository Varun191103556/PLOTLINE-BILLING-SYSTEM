import { ServiceAPIResponse } from "../../types/service-response";
import { AppDataSource } from "../data-source";
import { Order } from "../entity/Order";
import { User } from "../entity/User";

const getOrders = async (user: User): Promise<ServiceAPIResponse<Order[]>> => {
  /* Get items of your cart here */
  const orders = await AppDataSource.getRepository(Order).find({
    where: {
      user: user,
    },
    order: {
      id: "ASC",
    },
  });

  if (!orders) {
    return {
      statusCode: 404,
      body: {
        success: false,
        message: "🚚 Your order history is empty",
      },
    };
  }

  return {
    statusCode: 200,
    body: {
      success: true,
      message: "🚚 Fetched all order history successfully",
      data: orders,
    },
  };
};

export { getOrders };
