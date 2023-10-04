import express from "express";

import * as serviceController from "../controllers/service.controller";
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
  serviceController.getAll
);

/* GET specific product*/
router.get(
  "/specific/:id",
  yupValidator("params", yupGetProduct),
  serviceController.getServicebyID
);

/* POST Add new product*/
router.post(
  "/add",
  yupValidator("headers", yupJwtHeader),
  validateJWT,
  yupValidator("body", yupAddProduct),
  serviceController.addService
);

/* PATCH Modify specific product*/
router.patch(
  "/modify/:id",
  yupValidator("headers", yupJwtHeader),
  validateJWT,
  yupValidator("params", yupGetProduct),
  yupValidator("body", yupModifyProduct),
  serviceController.modifyService
);

/* DELETE Remove specific product*/
router.delete(
  "/delete/:id",
  yupValidator("headers", yupJwtHeader),
  validateJWT,
  yupValidator("params", yupGetProduct),
  serviceController.deleteService
);

export { router as default };
