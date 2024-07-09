import { ErrorAndStatus } from "../exceptions/errorWithStatus.js";
import db from "../models/index.js";

const Organization = db.Organization;
const UserOrganization = db.UserOrganizations;

export async function userOrganizations(authId) {
	try {
		const ownedOrgs = await Organization.findAll({
			where: { ownerId: authId },
			raw: true,
		});

		const joinedOrgs = await UserOrganization.findAll({
			where: { userId: authId },
			include: [{ model: Organization, as: "Organization" }],
			raw: true,
			nest: true,
		});

		const joinedOrganizations = joinedOrgs.map((join) => join.Organization);


		let allOrgs = [...ownedOrgs, ...joinedOrganizations];

		allOrgs = allOrgs.map((org) => {
			return {
				orgId: org.orgId,
				name: org.name,
				description: org.description,
			};
		});

		return { status: "success", message: "User organisations", data:{ organisations: allOrgs }};
	} catch (err) {
		console.log(err);
		throw new ErrorAndStatus(
			"Could not fetch organizations",
			err.status || 500
		);
	}
}

export async function singleOrganization(orgId) {
	try {
		const singleOrg = await Organization.findOne({ where: { orgId } });

		if (!singleOrg) throw new ErrorAndStatus("Organization not found", 404);

		const singleOrgObj = singleOrg.get({ plain: true });

		delete singleOrgObj.createdAt;
		delete singleOrgObj.updatedAt;
		delete singleOrgObj.ownerId;

		return {
			status: "success",
			message: "Single Organization",
			data: singleOrgObj,
		};
	} catch (err) {
		throw new ErrorAndStatus(
			err.message || "Internal server error",
			err.status || 500
		);
	}
}

export async function createOrganization(data) {
	try {
		const newOrg = await Organization.create(data);

		const newOrgObj = newOrg.get({ plain: true });

		delete newOrgObj.createdAt;
		delete newOrgObj.updatedAt;
		delete newOrgObj.ownerId;

		return {
			status: "success",
			message: "Organisation created successfully",
			data: newOrg,
		};
	} catch (err) {
		throw new ErrorAndStatus(
			err.message || "Internal server error",
			err.status || 500
		);
	}
}

export async function joinOrganization({ userId, orgId }) {
	try {
		await UserOrganization.create({ userId, orgId });

		return {
			status: "success",
			message: "User added to organisation successfully",
		};
	} catch (err) {
		throw new ErrorAndStatus(
			err.message || "Internal server error",
			err.status || 500
		);
	}
}
