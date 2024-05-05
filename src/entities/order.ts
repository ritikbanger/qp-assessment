import {
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	ManyToOne,
	OneToMany,
	JoinColumn,
} from "typeorm";
import UserModel from "./user";
import OrderItem from "./orderItem";

@Entity("orders")
class Order {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => UserModel, (user) => user.orders)
	@JoinColumn({ name: "user_id" })
	user: UserModel;

	@CreateDateColumn()
	created_at: Date;

	@OneToMany(() => OrderItem, (orderItem) => orderItem.order)
	order_items: OrderItem[];
}

export default Order;
