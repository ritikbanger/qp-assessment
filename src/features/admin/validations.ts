import Joi from "joi";
import { labels } from "../../utils/constants";

const joiObject = Joi.object().options({ abortEarly: false });

export const addGroceryItemValidationSchema = joiObject.keys({
	name: Joi.string().required().min(3).max(100).label(labels.name),
	price: Joi.number().required().positive().label(labels.price),
	inventory_count: Joi.number()
		.required()
		.integer()
		.min(0)
		.label(labels.inventory_count),
});

export const updateGroceryItemValidationSchema = Joi.object({
	name: Joi.string().min(3).max(100).optional().label(labels.name),
	price: Joi.number().positive().optional().label(labels.price),
})
	.or("name", "price")
	.messages({
		"object.missing": labels.updateGroceryNeed,
	});

export const manageInventoryValidationSchema = Joi.object({
	inventory_count: Joi.number()
		.integer()
		.min(0)
		.required()
		.label(labels.inventory),
});
