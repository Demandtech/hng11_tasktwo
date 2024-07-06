import {
	userOrganizations,
	singleOrganization,
	createOrganization,
} from "../services/organization.service.js";

export async function handleUserOrganizations(req, res) {
	const authUser = req.user.id;

	if (!authUser) {
		res.status(401).json({
			status: "failed to fetch",
			message: "UnAuthenticated User",
			statusCode: 401,
		});
	}

	try {
		const response = await userOrganizations(authUser);

		res.json(response);
	} catch (err) {
		res.status(err.status || 500).json({
			status: "failed to fetch",
			message: err.message || "Internal server error, please try again!",
			statusCode: err.status || 500,
		});
	}
}

export async function handleSingleOrganization(req, res) {
	const { orgId } = req.params;

	if (!orgId) {
		res.status(400).json({
			status: "failed",
			message: "organization id is required",
			statusCode: 400,
		});
	}

	try {
		const result = await singleOrganization(orgId);

		res.status(200).json(result);
	} catch (err) {
		res.status(err.status || 500).json({
			status: "failed",
			message: err.message || "Internal server error, please try again!",
			statusCode: 400,
		});
	}
}

export async function handleCreateOrganization(req, res) {
	const { name, description } = req.body;
	const authId = req.user.id;

	if (!authId || !name || !description) {
		throw new Error();
	}
	try {
		const result = await createOrganization({ name, description, ownerId: authId });

		res.status(201).json(result);
		
	} catch (err) {
		res.status(400).json({
			status: "Bad Request",
			message: "Client error",
			statusCode: 400,
		});
	}
}
