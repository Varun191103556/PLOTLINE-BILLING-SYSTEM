import express from "express";
import { validateJWT, yupValidator } from "../middleware";
import * as cartController from "../controllers/cart.controller";
import { yupAddCart } from "../validators/cart.validator";
import { yupJwtHeader } from "../validators/jwt.validator";
import { yupGetProduct } from "../validators/product.validator";

const router = express.Router();

/* GET Show all items of cart */
router.get(
  "/get/all",
  yupValidator("headers", yupJwtHeader),
  validateJWT,
  cartController.getCartItems
);

/* POST Add item to cart */
router.post(
  "/add",
  yupValidator("headers", yupJwtHeader),
  validateJWT,
  yupValidator("body", yupAddCart),
  cartController.addCart
);

/* DELETE Delete items from the cart */
router.delete(
  "/delete/all",
  yupValidator("headers", yupJwtHeader),
  validateJWT,
  cartController.deleteCartItems
);

/* DELETE Delete specific item from the cart */
router.delete(
  "/delete/specific/:id",
  yupValidator("headers", yupJwtHeader),
  validateJWT,
  yupValidator("params", yupGetProduct),
  cartController.deleteSpecificCartItems
);

export { router as default };
