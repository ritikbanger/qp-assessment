import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	UpdateDateColumn,
	CreateDateColumn,
	OneToMany,
} from "typeorm";

import Order from "./order";
import { ACCOUNT_TYPE } from "../utils/constants";

export interface IUserSchema {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	account_type: string;
}

@Entity("users")
export class UserModel {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		length: 50,
	})
	first_name: string;

	@Column({
		length: 50,
	})
	last_name: string;

	@Column({
		length: 50,
		unique: true,
	})
	email: string;

	@Column({
		length: 150,
		nullable: true,
	})
	password: string;

	@Column({
		type: "enum",
		enum: ACCOUNT_TYPE,
		default: ACCOUNT_TYPE.USER,
	})
	account_type: ACCOUNT_TYPE;

	@CreateDateColumn()
	created_ts: Date;

	@UpdateDateColumn()
	updated_ts: Date;

	@OneToMany(() => Order, (order) => order.user)
	orders: Order[];
}

export default UserModel;
