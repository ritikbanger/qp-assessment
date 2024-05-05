import { ResponseObject } from "../../interface/commonInterface";
import DbConnection from "../../db/dbConnection";

import GroceryItem from "../../entities/groceryItem";
import { IAddGroceryItem } from "./interface";

export class GroceryService {
	static response: ResponseObject;

	static async addGroceryItem(data: IAddGroceryItem): Promise<ResponseObject> {
		const groceryRepository = await DbConnection.getRepository(GroceryItem);
		const groceryItem = groceryRepository.create(data);
		await groceryRepository.save(groceryItem);

		return (this.response = {
			data: groceryItem,
			success: true,
			message: "Grocery Item created successfully",
		});
	}

	static async getAllGroceryItems(): Promise<ResponseObject> {
		const groceryRepository = await DbConnection.getRepository(GroceryItem);
		const allItems = await groceryRepository.find();
		return {
			data: allItems,
			success: true,
		};
	}

	static async removeGroceryItem(id: number): Promise<ResponseObject> {
		const groceryRepository = await DbConnection.getRepository(GroceryItem);
		const res = await groceryRepository.delete(id);
		console.log(res);
		if (!res.affected) {
			return (this.response = {
				success: false,
				message: "Item deletion failed. ",
			});
		}
		return (this.response = {
			success: true,
			message: "Item deleted successfully",
		});
	}

	static async updateGroceryItem(
		id: number,
		updateData: { name?: string; price?: number }
	): Promise<ResponseObject> {
		const groceryRepository = await DbConnection.getRepository(GroceryItem);
		const item = await groceryRepository.findOne({ where: { id } });
		if (!item) {
			return (this.response = {
				success: false,
				message: "No Such item exists",
			});
		}
		groceryRepository.merge(item, updateData);
		await groceryRepository.save(item);
		return (this.response = {
			data: item,
			success: true,
			message: "item is updated successfully",
		});
	}

	static async manageInventory(
		id: number,
		inventoryCount: number
	): Promise<ResponseObject> {
		const groceryRepository = await DbConnection.getRepository(GroceryItem);
		const item = await groceryRepository.findOne({ where: { id } });
		if (!item) {
			return (this.response = {
				success: false,
				message: "No Such item exists",
			});
		}
		item.inventory_count = inventoryCount;
		await groceryRepository.save(item);
		return (this.response = {
			data: item,
			success: true,
			message: "item is updated successfully",
		});
	}
}

export default GroceryService;
