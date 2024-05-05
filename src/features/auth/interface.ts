import { ACCOUNT_TYPE } from "../../utils/constants";

export interface ILogin {
	email: string;
	password: string;
	account_type?: ACCOUNT_TYPE;
}

export interface ISignup {
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	account_type: ACCOUNT_TYPE;
}
