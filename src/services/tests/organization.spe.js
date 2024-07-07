// import { userOrganizations } from "../organization.service.js";
// // import db from "../../models/index.js"

// jest.mock("../../models", () => {
//     const SequelizeMock = require("sequelize-mock");

//     const DBConnectionMock = new SequelizeMock();

// 	const OrganizationMock = DBConnectionMock.define("Organization", {
// 		orgId: 1,
// 		name: "Test Organization",
// 		description: "This is a test organization",
// 		ownerId: "user123",
// 	});

// 	const UserOrganizationMock = DBConnectionMock.define("UserOrganization", {
// 		userId: "user123",
// 		orgId: 2,
// 	});

// 	UserOrganizationMock.belongsTo(OrganizationMock, { foreignKey: "orgId" });

// 	UserOrganizationMock.$queryInterface.$useHandler((query, queryOptions) => {
       
// 		if (query === "findAll" && queryOptions.include) {
// 			return UserOrganizationMock.build({
// 				orgId: 2,
// 				name: "Joined Organization",
// 				description: "This is a joined organization",
// 			});
// 		}
// 		return null;
// 	});

// 	return {
// 		Organization: OrganizationMock,
// 		UserOrganization: UserOrganizationMock,
// 	};
// });

// describe("userOrganizations", () => {
// 	it("should return organizations owner or joined by user", async () => {
// 		const authId = "user123";

// 		const result = await userOrganizations(authId);

// 		expect(result.status).toBe("success");
// 		expect(result.message).toBe("User organizations");
// 		expect(result.data).toEqual([
// 			{
// 				orgId: 1,
// 				name: "Test Organization",
// 				description: "This is a test organization",
// 			},
// 			{
// 				orgId: 2,
// 				name: "Joined Organization",
// 				description: "This is a joined organization",
// 			},
// 		]);
// 	});
// });
