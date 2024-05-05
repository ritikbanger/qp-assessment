import { NextFunction, Response, Request } from "express";
import * as jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { apiResponse } from "../utils/constants";
import envConfig from "../config/envConfig";

export const isAuthorized = (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	try {
		const keys = envConfig();

		try {
			const token =
				<string>request.headers.auth ||
				<string>request.headers.authorization ||
				<string>request.headers.Authorization;

			if (!token) {
				return response.status(401).send({
					message: apiResponse.NO_AUTH_TOKEN,
					success: false,
					error: "token-not-found",
				});
			}
			const verify = jwt.verify(
				token.split(" ")[1],
				keys.jwt_secret
			) as JwtPayload;

			if (verify) {
				request.token = token;
				request.userId = +verify.id;
				request.accountType = verify.account_type;

				next();
			}
		} catch (error) {
			response.status(401).send({
				message: apiResponse.AUTH_TOKEN_VERIFICATION_FAILED,
				success: false,
				error: "AUTH_TOKEN_VERIFICATION_FAILED",
			});
		}
	} catch (error) {
		response.status(401).send({
			message: apiResponse.INVALID_AUTH_TOKEN,
			success: false,
			error: "token-expired",
		});
	}
};

export default isAuthorized;
