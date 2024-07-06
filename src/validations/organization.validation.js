import Joi from "joi";

export const createOrgSchena = Joi.object({
	name: Joi.string().required(),
	description: Joi.string().required(),
});
