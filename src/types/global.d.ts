import { ACCOUNT_TYPE } from "../utils/constants";

declare global {
	namespace Express {
		export interface Request {
			userId: number;
			token: string;
			accountType: ACCOUNT_TYPE;
		}
	}
}

export {};
