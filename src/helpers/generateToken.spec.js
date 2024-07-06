import jwt from "jsonwebtoken";
import generateJWT from "./generateToken";


jest.mock("../config", () => ({
	jwt_secret: "test_secret", 
}));

describe("generateJWT", () => {
	it("should generate a token with the correct user details", () => {
		const user = { email: "test@example.com", userId: "123456" };
		const token = generateJWT(user);

		const decoded = jwt.decode(token);

		expect(decoded).toHaveProperty("email", user.email);
		expect(decoded).toHaveProperty("id", user.userId);
		expect(decoded).toHaveProperty("sub", user.userId);
	});

	it("should set the token to expire in 30 days", () => {
		const user = { email: "test@example.com", userId: "123456" };
		const token = generateJWT(user);

		const decoded = jwt.decode(token);

		const currentTime = Math.floor(Date.now() / 1000);
		const thirtyDaysInSeconds = 30 * 24 * 60 * 60;
		const expirationTime = decoded.exp;

		expect(expirationTime).toBeGreaterThan(currentTime);
		expect(expirationTime).toBeLessThanOrEqual(
			currentTime + thirtyDaysInSeconds
		);
	});
});
