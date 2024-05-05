import express from "express";
import HandleErrors from "../../middleware/handleError";
import { loginController, signupController } from "./controller";
import { signInValidationSchema, signUpValidationSchema } from "./validations";
import { schemaValidation } from "../../middleware/validateSchema";

export const authRoutes = express.Router();

authRoutes.post(
	"/login",
	schemaValidation(signInValidationSchema),
	HandleErrors(loginController)
);

authRoutes.post(
	"/sign-up",
	schemaValidation(signUpValidationSchema),
	HandleErrors(signupController)
);
