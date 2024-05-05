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

groceryRoutes.get("/grocery-items", HandleErrors(getAllGroceryItemsController));

groceryRoutes.delete(
	"/grocery-item/:id",
	HandleErrors(removeGroceryItemController)
);

groceryRoutes.put(
	"/grocery-item/:id",
	schemaValidation(updateGroceryItemValidationSchema),
	HandleErrors(updateGroceryItemController)
);

groceryRoutes.patch(
	"/grocery-item/:id/inventory",
	schemaValidation(manageInventoryValidationSchema),
	HandleErrors(manageInventoryController)
);
