import { Request, Response } from "express";
import UserGroceryService from "./services";

export async function listAvailableItemsController(
	req: Request,
	res: Response
) {
	const data = await UserGroceryService.getAllAvailableGroceryItems();
	res.status(200).json(data);
}

export async function createOrderController(req: Request, res: Response) {
	const userId = req.userId;

	const { items } = req.body;
	const order = await UserGroceryService.createOrder(userId, items);
	res.status(201).json(order);
}
