import { Request, Response } from "express";
import GroceryService from "./services";

export const addGroceryItemController = async (req: Request, res: Response) => {
	const { name, price, inventory_count } = req.body;
	const data = await GroceryService.addGroceryItem({
		name,
		price,
		inventory_count,
	});
	res.status(200).json(data);
};

export async function getAllGroceryItemsController(
	req: Request,
	res: Response
) {
	const items = await GroceryService.getAllGroceryItems();
	res.json(items);
}

export async function removeGroceryItemController(req: Request, res: Response) {
	const { id } = req.params;
	const deletedItem = await GroceryService.removeGroceryItem(parseInt(id));
	res.status(200).send(deletedItem);
}

export async function updateGroceryItemController(req: Request, res: Response) {
	const { id } = req.params;
	const updateData = req.body;
	const updatedItem = await GroceryService.updateGroceryItem(
		parseInt(id),
		updateData
	);
	res.status(200).json(updatedItem);
}

export async function manageInventoryController(req: Request, res: Response) {
	const { id } = req.params;
	const { inventory_count } = req.body;
	const updatedItem = await GroceryService.manageInventory(
		parseInt(id),
		inventory_count
	);
	res.status(200).json(updatedItem);
}
