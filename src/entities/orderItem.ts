import {
	Entity,
	PrimaryGeneratedColumn,
	ManyToOne,
	JoinColumn,
	Column,
} from "typeorm";
import GroceryItem from "./groceryItem";
import Order from "./order";

@Entity("order_items")
class OrderItem {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Order, (order) => order.order_items)
	@JoinColumn({ name: "order_id" })
	order: Order;

	@ManyToOne(() => GroceryItem, (groceryItem) => groceryItem.order_items)
	@JoinColumn({ name: "grocery_item_id" })
	grocery_item: GroceryItem;

	@Column("int")
	quantity: number;
}

export default OrderItem;
