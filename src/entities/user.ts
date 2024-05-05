import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	UpdateDateColumn,
	CreateDateColumn,
} from "typeorm";

export interface IUserSchema {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	account_type: string;
}

@Entity("users")
class UserModel implements IUserSchema {
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
		length: 50,
	})
	account_type: string;

	@CreateDateColumn()
	created_ts: Date;

	@UpdateDateColumn()
	updated_ts: Date;
}

export default UserModel;
