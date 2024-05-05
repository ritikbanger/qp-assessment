import Joi from "joi";
import { labels } from "../../utils/constants";

const joiObject = Joi.object().options({ abortEarly: false });

export const createOrderSchema = joiObject.keys({
	items: Joi.array()
		.items(
			Joi.object({
				groceryItemId: Joi.number().integer().positive().required(),
				quantity: Joi.number().integer().positive().required(),
			})
		)
		.min(1)
		.label(labels.items)
		.required(),
});
