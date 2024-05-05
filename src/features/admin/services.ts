import { ResponseObject } from "../../interface/commonInterface";
import DbConnection from "../../db/dbConnection";

import GroceryItem from "../../entities/groceryItem";
import { IAddGroceryItem } from "./interface";
import { apiResponse } from "../../utils/constants";

export class GroceryService {
	static response: ResponseObject;

	static async addGroceryItem(data: IAddGroceryItem): Promise<ResponseObject> {
		const groceryRepository = await DbConnection.getRepository(GroceryItem);
		const groceryItem = groceryRepository.create(data);
		await groceryRepository.save(groceryItem);

		return (this.response = {
			data: groceryItem,
			success: true,
			message: apiResponse.ITEM_CREATED_SUCCESS,
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
		if (!res.affected) {
			return (this.response = {
				success: false,
				message: apiResponse.ITEM_DELETION_FAILED,
			});
		}
		return (this.response = {
			success: true,
			message: apiResponse.ITEM_DELETED_SUCCESS,
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
				message: apiResponse.ITEM_NOT_EXIST,
			});
		}
		groceryRepository.merge(item, updateData);
		await groceryRepository.save(item);
		return (this.response = {
			data: item,
			success: true,
			message: apiResponse.ITEM_UPDATE_SUCCESS,
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
				message: apiResponse.ITEM_NOT_EXIST,
			});
		}
		item.inventory_count = inventoryCount;
		await groceryRepository.save(item);
		return (this.response = {
			data: item,
			success: true,
			message: apiResponse.ITEM_UPDATE_SUCCESS,
		});
	}
}

export default GroceryService;
