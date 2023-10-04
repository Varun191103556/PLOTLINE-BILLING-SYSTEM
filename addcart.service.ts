import { ServiceAPIResponse } from "../../types/service-response";
import { AppDataSource } from "../data-source";
import { CartItem } from "../entity/CartItem";
import { Product } from "../entity/Product";
import { Service } from "../entity/Service";
import { User } from "../entity/User";
import { AddCartSchema } from "../validators/cart.validator";

const addCart = async (
  data: AddCartSchema,
  userModel: User
): Promise<ServiceAPIResponse<Object>> => {
  /* Add item to your cart here */
  if (!data.product_id && !data.service_id) {
    return {
      statusCode: 404,
      body: {
        success: false,
        message: "🔗 Please provide a product or service ID ",
      },
    };
  }

  if (data.product_id && data.service_id) {
    return {
      statusCode: 400,
      body: {
        success: false,
        message:
          "🔗 Please provide only one item. Either product or service ID",
      },
    };
  }

  let item;
  if (data.product_id) {
    item = await AppDataSource.getRepository(Product).findOneBy({
      id: data.product_id,
    });
  } else {
    item = await AppDataSource.getRepository(Service).findOneBy({
      id: data.service_id,
    });
  }
  if (!item) {
    return {
      statusCode: 404,
      body: {
        success: false,
        message: "📦 No product or service is there with the ID",
      },
    };
  }

  const cartItem = new CartItem();
  cartItem.quantity = data.quantity;
  cartItem.user = userModel;
  data.product_id ? (cartItem.product = item) : (cartItem.service = item);

  const cartRepository = await AppDataSource.getRepository(CartItem);
  const addedItem = await cartRepository.save(cartItem);
  return {
    statusCode: 200,
    body: {
      success: true,
      message: "🛍️ Added the product successfully",
      data: {
        id: addedItem.id,
        item: data.product_id ? cartItem.product : cartItem.service,
        type: data.product_id ? "product" : "service",
      },
    },
  };
};

export { addCart };
