import Joi from "joi";

export const registerSchema = Joi.object({
	firstName: Joi.string().required(),
	lastName: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string()
		.min(8)
		.required()
		.pattern(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{};':"\\|,.<>?])[A-Za-z\d!@#$%^&*()_+\[\]{};':"\\|,.<>?]{8,}$/,
			"password requirements"
		)
		.messages({
			"string.pattern.base":
				"Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.",
		}),
	phone: Joi.string(),
});

export const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(8).required(),
});
