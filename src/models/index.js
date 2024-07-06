import { Sequelize, DataTypes } from "sequelize";
import config from "../config.js";
import UserModel from "./user.model.js";
import OrgModel from "./organization.model.js";
import UserOrganizationsModel from "./userOrganization.model.js";

const sequelize = new Sequelize(
	config.db_name,
	config.db_username,
	config.db_password,
	{
		host: config.db_host,
		port: config.db_port,
		dialect: "postgres",
		dialectModule: require("pg"),
	}
);

const User = UserModel(sequelize, DataTypes);
const Organization = OrgModel(sequelize, DataTypes);
const UserOrganizations = UserOrganizationsModel(sequelize, DataTypes);

const models = { User, Organization, UserOrganizations };

Object.keys(models).forEach((modelName) => {
	if (models[modelName].associate) {
		models[modelName].associate(models);
	}
});

// User.associate(models);
// Organization.associate(models);

// User.associate = (models) => {
// 	User.hasOne(models.Organization, {
// 		foreignKey: "ownerId",
// 		as: "createdOrganization",
// 	});

// 	User.belongsToMany(models.Organization, {
// 		through: models.UserOrganizations,
// 		as: "joinedOrganizations",
// 		foreignKey: "userId",
// 		otherKey: "orgId",
// 	});
// };

// Organization.associate = (models) => {
// 	Organization.belongsTo(models.User, {
// 		foreignKey: "ownerId",
// 		as: "creator",
// 	});

// 	Organization.belongsToMany(models.User, {
// 		through: models.UserOrganizations,
// 		as: "members",
// 		foreignKey: "orgId",
// 		otherKey: "userId",
// 	});
// };

sequelize
	.authenticate()
	.then(() => {
		console.log("Connection has been established successfully.");
	})
	.catch((error) => {
		console.log("Error connecting to db", error.message);
	});

sequelize
	.sync({ force: false })
	.then(() => {
		console.log("Tables synced successfully");
	})
	.catch((error) => {
		console.error("Error syncing tables: ", error.message);
	});

export default {
	sequelize,
	Sequelize,
	User,
	Organization,
	UserOrganizations,
};
