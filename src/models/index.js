import { Sequelize, DataTypes } from "sequelize";
import config from "../config.js";
import UserModel from "./user.model.js";
import OrgModel from "./organization.model.js";
import UserOrganizationsModel from "./userOrganization.model.js";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
	config.db_name || "tasktwo",
	config.db_username || "postgres",
	config.db_password || "admin",
	{
		host: config.db_host || "localhost",
		port: config.db_port || 5433,
		dialect: "postgres",
		dialectModule: pg,
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

// sequelize
// 	.authenticate()
// 	.then(() => {
// 		console.log("Connection has been established successfully.");
// 	})
// 	.catch((error) => {
// 		console.log("Error connecting to db", error.message);
// 	});

// sequelize
// 	.sync({ force: false })
// 	.then(() => {
// 		console.log("Tables synced successfully");
// 	})
// 	.catch((error) => {
// 		console.error("Error syncing tables: ", error.message);
// 	});

export default {
	sequelize,
	Sequelize,
	User,
	Organization,
	UserOrganizations,
};
