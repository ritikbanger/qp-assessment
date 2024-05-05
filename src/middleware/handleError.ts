import { Request, Response, NextFunction } from "express";

const HandleErrors =
	(func) =>
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async (req: Request, res: Response, next: NextFunction): Promise<any> => {
		try {
			await func(req, res, next);
		} catch (error) {
			console.error("Error Handler", error);
			res.status(400).send(error);
			next(error);
		}
	};

export default HandleErrors;
