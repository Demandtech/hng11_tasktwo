import bcrypt from "bcrypt";
import generateJWT from "../../helpers/generateToken";
import db from "../../models/index.js";
import app from "../../app.js";
import request from "supertest";

describe("/auth/register", () => {
	let testUser;

	const userData = {
		firstName: "John",
		lastName: "Doe",
		email: "john.doe@example.com",
		password: "Techman01.",
		phone: "12324566",
	};

	beforeAll(async () => {
		await db.sequelize.sync({ force: false });
	});

	afterAll(async () => {
		await db.sequelize.close();
	});

	afterEach(async () => {
		if (testUser) {
			await db.User.destroy({ where: { email: testUser.data.user.email } });

			testUser = null;
		}
	});

	beforeEach(async () => {
		const response = await request(app)
			.post("/auth/register")
			.send(userData)
			.expect(201);

		testUser = response.body;
	});

	it("should register user successfully and create organization with correct name", async () => {
		expect(testUser.status).toBe("success");
		expect(testUser.message).toBe("Registration successful");
		expect(testUser.data.accessToken).toBeTruthy();
		expect(testUser.data.user.firstName).toBe("John");
		expect(testUser.data.user.lastName).toBe("Doe");
		expect(testUser.data.user.email).toBe("john.doe@example.com");
		expect(testUser.data.user.phone).toBe("12324566");

		const user = await db.User.findOne({
			where: { email: testUser.data.user.email },
		});
		const organization = await db.Organization.findOne({
			where: { ownerId: user.userId },
		});

		expect(organization).toBeTruthy();
		expect(organization.name).toBe("John's Organization");
	});

	it("It Should Fail If Required Fields Are Missing", async () => {
		let incompleteUserData = { ...userData };
		delete incompleteUserData.firstName;

		const response = await request(app)
			.post("/auth/register")
			.send(incompleteUserData)
			.expect(422);

		expect(response.body.errors).toBeTruthy();
		// expect(response.body.message).toBe("Validation error");
	});

	it("It Should Fail if there’s Duplicate Email", async () => {
		const response = await request(app)
			.post("/auth/register")
			.send(userData)
			.expect(400);

		expect(response.body.status).toBe("Bad request");
		expect(response.body.message).toBe("Registration unsuccessful");
		expect(response.body.statusCode).toBe(400);
	});

	it("should log a user successfully", async () => {
		const user = await request(app)
			.post("/auth/login")
			.send({ email: testUser.data.user.email, password: userData.password });

		expect(user.body.status).toBe("success");
		expect(user.body.message).toBe("Login successful");
		expect(user.body.data.accessToken).toBeTruthy();
		expect(user.body.data.user.firstName).toBe("John");
		expect(user.body.data.user.lastName).toBe("Doe");
		expect(user.body.data.user.email).toBe("john.doe@example.com");
		expect(user.body.data.user.phone).toBe("12324566");
	});
});
