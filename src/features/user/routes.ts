import express from "express";
import HandleErrors from "../../middleware/handleError";
import { schemaValidation } from "../../middleware/validateSchema";
import {
	createOrderController,
	listAvailableItemsController,
} from "./controller";
import { createOrderSchema } from "./validations";

export const userRoutes = express.Router();

userRoutes.get("/groceries", HandleErrors(listAvailableItemsController));

userRoutes.post(
	"/order",
	schemaValidation(createOrderSchema),
	HandleErrors(createOrderController)
);
