import { Sequelize, DataTypes } from "sequelize";
import config from "../config.js";
import UserModel from "./user.model.js";
import OrgModel from "./organization.model.js";
import UserOrganizationsModel from "./userOrganization.model.js";
import pg from "pg";

const sequelize = new Sequelize(
	config.db_name,
	config.db_username,
	config.db_password,
	{
		host: config.db_host,
		port: config.db_port,
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
