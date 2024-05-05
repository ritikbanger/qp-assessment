import { ResponseObject } from "../../interface/commonInterface";
import GroceryItem from "../../entities/groceryItem";
import dbConnection from "../../db/dbConnection";
import Order from "../../entities/order";
import OrderItem from "../../entities/orderItem";
import { MoreThan } from "typeorm";
import UserModel from "../../entities/user";

export class UserGroceryService {
	static response: ResponseObject;

	static async getAllAvailableGroceryItems(): Promise<ResponseObject> {
		const groceryRepository = await dbConnection.getRepository(GroceryItem);
		const availableItems = await groceryRepository.find({
			where: {
				inventory_count: MoreThan(0),
			},
		});
		return (this.response = {
			data: availableItems ?? [],
			success: true,
		});
	}

	static async createOrder(
		userId: number,
		items: { groceryItemId: number; quantity: number }[]
	): Promise<ResponseObject> {
		const userRepository = await dbConnection.getRepository(UserModel);
		const groceryRepository = await dbConnection.getRepository(GroceryItem);

		const user = await userRepository.findOne({ where: { id: userId } });

		if (!user) {
			return (this.response = {
				success: false,
				message: "User does not exist, signup to place order",
			});
		}

		try {
			const validatedItems = await Promise.all(
				items.map(async (item) => {
					const groceryItem = await groceryRepository.findOne({
						where: { id: item.groceryItemId },
					});
					if (!groceryItem) {
						throw new Error(
							`Grocery item with ID ${item.groceryItemId} does not exist.`
						);
					}
					if (groceryItem.inventory_count < item.quantity) {
						throw new Error(
							`Insufficient inventory for item ID ${item.groceryItemId}. Available: ${groceryItem.inventory_count}, requested: ${item.quantity}.`
						);
					}
					return { groceryItem, quantity: item.quantity };
				})
			);

			const savedOrder = await (
				await dbConnection.getManager()
			).transaction(async (transactionalEntityManager) => {
				const order = new Order();
				order.user = user;
				order.created_at = new Date();

				const savedOrder = await transactionalEntityManager.save(order);

				for (const validatedItem of validatedItems) {
					const orderItem = new OrderItem();
					orderItem.order = savedOrder;
					orderItem.grocery_item = validatedItem.groceryItem;
					orderItem.quantity = validatedItem.quantity;
					await transactionalEntityManager.save(orderItem);

					validatedItem.groceryItem.inventory_count -= validatedItem.quantity;
					await transactionalEntityManager.save(validatedItem.groceryItem);
				}
				return savedOrder;
			});

			return {
				data: { id: savedOrder.id },
				success: true,
				message: "Order placed successfully",
			};
		} catch (error) {
			return {
				success: false,
				message: error.message,
			};
		}
	}
}

export default UserGroceryService;
