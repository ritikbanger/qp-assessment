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

export const groceryRoutes = express.Router();

groceryRoutes.post(
	"/add-grocery-item",
	schemaValidation(addGroceryItemValidationSchema),
	HandleErrors(addGroceryItemController)
);

groceryRoutes.get("/grocery-items", getAllGroceryItemsController);

groceryRoutes.delete("/grocery-item/:id", removeGroceryItemController);

groceryRoutes.put(
	"/grocery-item/:id",
	schemaValidation(updateGroceryItemValidationSchema),
	updateGroceryItemController
);

groceryRoutes.patch(
	"/grocery-item/:id/inventory",
	schemaValidation(manageInventoryValidationSchema),
	manageInventoryController
);
