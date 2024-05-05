import Joi from "joi";

const joiObject = Joi.object().options({ abortEarly: false });

export const addGroceryItemValidationSchema = joiObject.keys({
	name: Joi.string().required().min(3).max(100),
	price: Joi.number().required().positive(),
	inventory_count: Joi.number().required().integer().min(0),
});

export const updateGroceryItemValidationSchema = Joi.object({
	name: Joi.string().min(3).max(100).optional(),
	price: Joi.number().positive().optional(),
})
	.or("name", "price")
	.messages({
		"object.missing": "At least one field must be provided: name or price.",
	});

export const manageInventoryValidationSchema = Joi.object({
	inventory_count: Joi.number().integer().min(0).required(),
});
