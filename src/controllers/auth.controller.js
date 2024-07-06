import { createUser, loginUser } from "../services/auth.service.js";

export async function handleCreateUser(req, res) {
	const { firstName, lastName, email, phone, password } = req.body;

	if (!firstName || !email || !lastName || !password) {
		throw new Error();
	}

	try {
		const newUser = await createUser({
			firstName,
			lastName,
			email,
			phone,
			password,
		});
		res.status(201).json(newUser);
	} catch (error) {
		// return res.status(error.status || 500).json({
		// 	status: "Bad request",
		// 	message: error.message || "Internal Server error",
		// 	statusCode: error.status || 500,
		// });
		return res.status(400).json({
			status: "Bad request",
			message: "Registration unsuccessful",
			statusCode: 400,
		});
	}
}

export async function handleLoginUser(req, res) {
	const { email, password } = req.body;

	if (!email || !password) {
		throw new Error();
	}

	try {
		const user = await loginUser({ email, password });
		res.status(200).json(user);
	} catch (error) {
		// return res.status(error.status || 500).json({
		// 	status: "Bad request",
		// 	message: error.message || "Internal Server error",
		// 	statusCode: error.status || 500,
		// });
		console.log(error)
		return res.status(401).json({
			status: "Bad request",
			message: "Authentication failed",
			statusCode: 401,
		});
	}
}
