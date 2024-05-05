import express from "express";
import HandleErrors from "../../middleware/handleError";
import { schemaValidation } from "../../middleware/validateSchema";
import {
	createOrderController,
	listAvailableItemsController,
} from "./controller";
import { createOrderSchema } from "./validations";
import isAuthorized from "../../utils/isAuthorized";

export const userRoutes = express.Router();

userRoutes.get(
	"/groceries",
	isAuthorized,
	HandleErrors(listAvailableItemsController)
);

userRoutes.post(
	"/order",
	schemaValidation(createOrderSchema),
	isAuthorized,
	HandleErrors(createOrderController)
);
