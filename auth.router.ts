import express from "express";
import { yupValidator } from "../middleware";
import * as authController from "../controllers/auth.controller";
import { yupSignupSchema, yupSignInSchema } from "../validators/auth.validator";

const router = express.Router();

/* POST New User Registration */
router.post(
  "/signup",
  yupValidator("body", yupSignupSchema),
  authController.signUp
);

/* POST Registered User Login */
router.post(
  "/signin",
  yupValidator("body", yupSignInSchema),
  authController.signIn
);

export { router as default };
