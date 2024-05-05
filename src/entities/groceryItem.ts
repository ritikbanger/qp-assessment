import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import OrderItem from "./orderItem";

@Entity("grocery_items")
class GroceryItem {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		length: 100,
	})
	name: string;

	@Column("decimal", { precision: 10, scale: 2 })
	price: number;

	@Column("int")
	inventory_count: number;

	@OneToMany(() => OrderItem, (orderItem) => orderItem.grocery_item)
	order_items: OrderItem[];
}

export default GroceryItem;
