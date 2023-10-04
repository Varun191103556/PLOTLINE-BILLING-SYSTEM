import express from "express";

import * as productController from "../controllers/product.controller";
import { yupValidator } from "../middleware";
import {
  yupAddProduct,
  yupGetProduct,
  yupModifyProduct,
} from "../validators/product.validator";
import { validateJWT } from "../middleware";
import { yupJwtHeader } from "../validators/jwt.validator";

const router = express.Router();

/* GET all products */
router.get(
  "/all/:id",
  yupValidator("params", yupGetProduct),
  productController.getAll
);

/* GET specific product*/
router.get(
  "/specific/:id",
  yupValidator("params", yupGetProduct),
  productController.getProductbyID
);

/* POST Add new product*/
router.post(
  "/add",
  yupValidator("headers", yupJwtHeader),
  validateJWT,
  yupValidator("body", yupAddProduct),
  productController.addProduct
);

/* PATCH Modify specific product*/
router.patch(
  "/modify/:id",
  yupValidator("headers", yupJwtHeader),
  validateJWT,
  yupValidator("params", yupGetProduct),
  yupValidator("body", yupModifyProduct),
  productController.modifyProduct
);

/* DELETE Remove specific product*/
router.delete(
  "/delete/:id",
  yupValidator("headers", yupJwtHeader),
  validateJWT,
  yupValidator("params", yupGetProduct),
  productController.deleteProduct
);

export { router as default };
