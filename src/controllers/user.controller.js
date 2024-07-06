import { getUser } from "../services/user.service.js";

export async function handleGetUser(req, res) {
	const { id } = req.params;
	const authId = req.user.id;

	if (!id || !authId) throw new Error();

	try {
		const result = await getUser({ userId: id, authId });
		res.status(200).json(result);
	} catch (err) {
		res.status(err.status || 500).json({
			status: "failed",
			message: err.message || "Internal server error",
			statusCode: err.status || 500,
		});
	}
}
