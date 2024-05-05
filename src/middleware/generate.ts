import jwt from "jsonwebtoken";
import envConfig from "../config/envConfig";
import { ACCOUNT_TYPE } from "../utils/constants";

interface ITokenGenerate {
	email: string;
	id: number;
	account_type: ACCOUNT_TYPE;
}

const createToken = async (user: ITokenGenerate): Promise<string> => {
	try {
		const keys = envConfig();
		const expiresIn = 60 * 60 * 72;
		return jwt.sign({ ...user }, keys.jwt_secret, { expiresIn });
	} catch (error) {
		console.error("An error occurred while creating a token:", error);
		return "Something went wrong";
	}
};

export default createToken;
