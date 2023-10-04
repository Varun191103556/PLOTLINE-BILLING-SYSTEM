import { allCartItems, cartTaxItem } from "../../types/taxed-item";
import { AppDataSource } from "../data-source";
import { Order } from "../entity/Order";
import { OrderItem } from "../entity/OrderItem";
import logger from "../common/logger";

const addOrderItems = async (
  result: allCartItems,
  newOrder: Order
): Promise<void> => {
  /* Add cart items to database */

  const orderItemsRepository = await AppDataSource.getRepository(OrderItem);

  result.products.forEach(async (item: cartTaxItem) => {
    try {
      const product = new OrderItem();
      product.order = newOrder;
      product.product = item.product;
      product.quantity = item.quantity;
      product.tax = item.tax;
      product.price = item.product.price;
      await orderItemsRepository.save(product);
    } catch (err: any) {
      logger.error(err.message);
    }
  });

  logger.info("Added all products from cart to order items");

  result.services.forEach(async (item: cartTaxItem) => {
    try {
      const service = new OrderItem();
      service.order = newOrder;
      service.service = item.service;
      service.quantity = item.quantity;
      service.tax = item.tax;
      service.price = item.service.price;
      await orderItemsRepository.save(service);
    } catch (err: any) {
      logger.error(err.message);
    }
  });

  logger.info("Added all services from cart to order items");
};
export { addOrderItems };
