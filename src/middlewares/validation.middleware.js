export const validateMiddleware = (schema) => {
	return (req, res, next) => {
		if (schema) {
			// const result = schema.validate(req.body);

			// if (result.error) {
			// 	return res
			// 		.status(422)
			// 		.json({ message: "Validation error", errors: result.error });
			// }

			const { error } = schema.validate(req.body, { abortEarly: false });

			if (error) {
				const formattedErrors = error.details.map((err) => ({
					field: err.context.key,
					message: err.message,
				}));

				return res.status(422).json({
					errors: formattedErrors,
				});
			}
		}
		next();
	};
};
