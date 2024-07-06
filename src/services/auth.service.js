import { ErrorAndStatus } from "../exceptions/errorWithStatus.js";
import generateJWT from "../helpers/generateToken.js";
import db from "../models/index.js";
import bcrypt from "bcrypt";

const User = db.User;
const Organization = db.Organization;
export async function createUser(data) {
	try {
		const existingUser = await User.findOne({ where: { email: data.email } });

		if (existingUser) {
			throw new ErrorAndStatus("User already exists", 409);
		}

		const hashedPassword = await bcrypt.hash(data.password, 10);

		data.password = hashedPassword;

		const newUser = await User.create(data);

		const newUserObject = newUser.get({ plain: true });

		delete newUserObject.password;
		delete newUserObject.createdAt;
		delete newUserObject.updatedAt;

		await Organization.create({
			name: `${newUserObject.firstName}'s Organization`,
			ownerId: newUserObject.userId,
		});

		const token = generateJWT(newUserObject);

		return {
			status: "success",
			message: "Registration successful",
			data: { accessToken: token, user: newUserObject },
		};
	} catch (error) {
		console.log(error);
		if (error instanceof db.Sequelize.ConnectionError) {
			throw new ErrorAndStatus("Database connection error", 503);
		} else if (error instanceof db.Sequelize.ValidationError) {
			throw new ErrorAndStatus("Validation error", 422);
		} else {
			throw new ErrorAndStatus(
				error.message || "Internal server error",
				error.status || 500
			);
		}
	}
}

export async function loginUser(data) {
	console.log(data);
	try {
		let user = await User.findOne({ where: { email: data.email } });

		if (!user) {
			throw new ErrorAndStatus("Username or Password is incorrect", 401);
		}

		const passwordMatch = await bcrypt.compare(data.password, user.password);

		if (!passwordMatch) {
			throw new ErrorAndStatus("Username or Password is incorrect", 401);
		}

		const token = generateJWT(user);

		const userObject = user.get({ plain: true });

		delete userObject.password;
		delete userObject.createdAt;
		delete userObject.updatedAt;

		return {
			status: "success",
			message: "Login successful",
			data: { accessToken: token, user: userObject },
		};
	} catch (error) {
		throw new ErrorAndStatus(
			error.message || "Internal Server error",
			error.status || 500
		);
	}
}
