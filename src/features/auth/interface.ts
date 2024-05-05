export interface ILogin {
	email: string;
	password: string;
	account_type?: string;
}

export interface ISignup {
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	account_type: string;
}
