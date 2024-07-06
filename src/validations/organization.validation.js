import Joi from "joi";

export const createOrgSchena = Joi.object({
	name: Joi.string().required(),
	description: Joi.string().required(),
});

export const joinOrgSchema = Joi.object({
	userId: Joi.string().required(),
});
