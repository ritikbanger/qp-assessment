import express from "express";
import HandleErrors from "../../middleware/handleError";
import {
	addGroceryItemController,
	getAllGroceryItemsController,
	manageInventoryController,
	removeGroceryItemController,
	updateGroceryItemController,
} from "./controller";
import {
	addGroceryItemValidationSchema,
	manageInventoryValidationSchema,
	updateGroceryItemValidationSchema,
} from "./validations";
import { schemaValidation } from "../../middleware/validateSchema";
import { isAdmin } from "../../utils/isAdmin";
import isAuthorized from "../../utils/isAuthorized";

export const groceryRoutes = express.Router();

groceryRoutes.post(
	"/add-grocery-item",
	schemaValidation(addGroceryItemValidationSchema),
	isAuthorized,
	isAdmin,
	HandleErrors(addGroceryItemController)
);

groceryRoutes.get(
	"/grocery-items",
	isAuthorized,
	isAdmin,
	HandleErrors(getAllGroceryItemsController)
);

groceryRoutes.delete(
	"/grocery-item/:id",
	isAuthorized,
	isAdmin,
	HandleErrors(removeGroceryItemController)
);

groceryRoutes.put(
	"/grocery-item/:id",
	schemaValidation(updateGroceryItemValidationSchema),
	isAuthorized,
	isAdmin,
	HandleErrors(updateGroceryItemController)
);

groceryRoutes.patch(
	"/grocery-item/:id/inventory",
	schemaValidation(manageInventoryValidationSchema),
	isAuthorized,
	isAdmin,
	HandleErrors(manageInventoryController)
);
