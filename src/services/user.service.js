import { ErrorAndStatus } from "../exceptions/errorWithStatus.js";
import db from "../models/index.js";

const User = db.User;
const UserOrganizations = db.UserOrganizations;
const Organization = db.Organization;
export async function getUser({ userId, authId }) {
	try {
		if (userId === authId) {
			const user = await User.findOne({ where: { userId } });

			if (!user) throw new Error();

			const userObject = user.get({ plain: true });

			delete userObject.password;
			delete userObject.createdAt;
			delete userObject.updatedAt;

			return {
				status: "success",
				message: "Auth User",
				data: userObject,
			};
		}

		const userOrgs = await UserOrganizations.findAll({ where: { userId } });
		const authOrgs = await UserOrganizations.findAll({
			where: { userId: authId },
		});

		const commonOrgs = userOrgs.filter((org) => {
			return authOrgs.some((authOrg) => authOrg.orgId === org.orgId);
		});

		if (commonOrgs.length > 0) {
			const user = await User.findOne({ where: { userId } });

			if (!user) throw new Error();

			const userObject = user.get({ plain: true });

			delete userObject.password;
			delete userObject.createdAt;
			delete userObject.updatedAt;

			return {
				status: "success",
				message: "User found with common organizations",
				data: userObject,
			};
		}

		const ownedOrgs = await Organization.findAll({
			where: { ownerId: authId },
		});

		const userInOwnedOrgs = userOrgs.filter((org) => {
			return ownedOrgs.some((ownedOrg) => ownedOrg.orgId === org.orgId);
		});

		if (userInOwnedOrgs.length > 0) {
			const user = await User.findOne({ where: { userId } });

			if (!user) throw new Error();

			const userObject = user.get({ plain: true });

			delete userObject.password;
			delete userObject.createdAt;
			delete userObject.updatedAt;

			return {
				status: "success",
				message: "User found in organizations created by auth user",
				data: userObject,
				// organizationsCreated: userInOwnedOrgs,
			};
		}

		throw new ErrorAndStatus(
			"No common organizations or organizations created by auth user found",
			404
		);
	} catch (err) {
		console.log(err);
		throw new ErrorAndStatus(
			err.message || "Internal server error",
			err.status || 500
		);
	}
}
