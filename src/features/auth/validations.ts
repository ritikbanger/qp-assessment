import Joi from "joi";

import { labels, emailRegex, passwordRegex } from "../../utils/constants";

const joiObject = Joi.object().options({ abortEarly: false });
export const emailValidation = joiObject.keys({
	email: Joi.string().regex(emailRegex).label(labels.email).required(),
});
export const passwordValidation = joiObject.keys({
	password: Joi.string().label(labels.password).regex(passwordRegex).required(),
});

export const nameValidation = joiObject.keys({
	first_name: Joi.string().label(labels.firstName).required(),
	last_name: Joi.string().label(labels.lastName).required(),
});

export const accountTypeValidation = joiObject.keys({
	account_type: Joi.string().label(labels.accountType).required(),
});

export const signInValidationSchema = Joi.object()
	.concat(emailValidation)
	.concat(accountTypeValidation)
	.keys({
		password: Joi.string().label(labels.password).required(),
	});

export const signUpValidationSchema = Joi.object()
	.concat(nameValidation)
	.concat(emailValidation)
	.concat(passwordValidation)
	.concat(accountTypeValidation);
