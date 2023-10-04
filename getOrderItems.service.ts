import { ServiceAPIResponse } from "../../types/service-response";
import { AppDataSource } from "../data-source";
import { Order } from "../entity/Order";
import { User } from "../entity/User";

const getOrderItems = async (
  user: User,
  id: number
): Promise<ServiceAPIResponse<Order[]>> => {
  /* Get items of your order here */
  const orderItems = await AppDataSource.getRepository(Order).find({
    where: {
      id: id,
      user: user,
    },
    relations: {
      orderItems: true,
    },
    order: {
      id: "ASC",
    },
  });

  if (orderItems.length === 0) {
    return {
      statusCode: 404,
      body: {
        success: false,
        message: "🚚 Your order has no item within it or it is not accessible",
      },
    };
  }

  return {
    statusCode: 200,
    body: {
      success: true,
      message: "🚚 Fetched all order items successfully",
      data: orderItems,
    },
  };
};

export { getOrderItems };
