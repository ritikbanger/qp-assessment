import Joi from "joi";

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
		.required(),
});
