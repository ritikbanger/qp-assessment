import { Request, Response } from "express";
import AuthService from "./services";

export const loginController = async (req: Request, res: Response) => {
	const data = await AuthService.login(req.body);
	res.status(200).json({
		...data,
	});
};

export const signupController = async (req: Request, res: Response) => {
	const data = await AuthService.signUp(req.body);
	res.status(200).json({
		...data,
	});
};
