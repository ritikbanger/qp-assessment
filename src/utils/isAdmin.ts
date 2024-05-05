import { NextFunction, Response, Request } from "express";
import { ACCOUNT_TYPE, apiResponse } from "../utils/constants";

export const isAdmin = (
	request: Request,
	response: Response,
	next: NextFunction
): void => {
	try {
		if (request.accountType === ACCOUNT_TYPE.ADMIN) next();
		else {
			response.status(401).send({
				message: apiResponse.UNAUTHORIZED_USER,
				success: false,
			});
		}
	} catch (error) {
		response.status(401).send({
			message: apiResponse.UNAUTHORIZED_USER,
			success: false,
		});
	}
};
