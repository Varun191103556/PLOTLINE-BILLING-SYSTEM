import { Request, Response } from "express";
import logger from "../common/logger";
import * as getOrderService from "../services/getorders.service";
import * as placeOrderService from "../services/placeorder.service";
import * as getOrderItemsService from "../services/getOrderItems.service";

const getOrders = async (req: Request, res: Response) => {
  try {
    const data = await getOrderService.getOrders(res.locals.user);

    res.status(data.statusCode).send(data.body);
  } catch (e: any) {
    logger.error(e.message);

    res.status(500).send(e.message);
  }
};

const getOrderItems = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await getOrderItemsService.getOrderItems(res.locals.user, +id);

    res.status(data.statusCode).send(data.body);
  } catch (e: any) {
    logger.error(e.message);

    res.status(500).send(e.message);
  }
};

const placeOrder = async (req: Request, res: Response) => {
  try {
    const data = await placeOrderService.placeOrder(res.locals.user);

    res.status(data.statusCode).send(data.body);
  } catch (e: any) {
    logger.error(e.message);

    res.status(500).send(e.message);
  }
};

export { getOrders, placeOrder, getOrderItems };
