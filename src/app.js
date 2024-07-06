import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import organizationRoute from "./routes/organization.route.js";

const app = express();

app.use(bodyParser.json());

app.use("/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/organizations", organizationRoute);

app.get("/", (_, res) => {
	res.json({ message: "Welcome to HNG11 task two" });
});

app.get("*", (_, res) => {
	res.json({ message: "Not found" });
});

export default app;
