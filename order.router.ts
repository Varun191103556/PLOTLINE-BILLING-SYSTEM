import express from "express";
import { validateJWT, yupValidator } from "../middleware";
import * as orderController from "../controllers/order.controller";
import { yupJwtHeader } from "../validators/jwt.validator";
import { yupGetProduct } from "../validators/product.validator";

const router = express.Router();

/* GET all orders of an user */
router.get(
  "/get/all",
  yupValidator("headers", yupJwtHeader),
  validateJWT,
  orderController.getOrders
);

/* GET all orders items of an order */
router.get(
  "/get/items/:id",
  yupValidator("headers", yupJwtHeader),
  validateJWT,
  yupValidator("params", yupGetProduct),
  orderController.getOrderItems
);

/* POST place order with all cart items */
router.post(
  "/place",
  yupValidator("headers", yupJwtHeader),
  validateJWT,
  orderController.placeOrder
);

export { router as default };
