import jwt from "jsonwebtoken";
import config from "../config.js";

const generateJWT = (user) => {
	return jwt.sign(
		{
			email: user.email,
			id: user.userId,
			sub: user.userId,
		},
		config.jwt_secret,
		{ expiresIn: "30d" }
	);
};

export default generateJWT;
