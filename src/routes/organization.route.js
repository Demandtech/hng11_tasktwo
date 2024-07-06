import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validateMiddleware } from "../middlewares/validation.middleware.js";
import { createOrgSchena } from "../validations/organization.validation.js";

import {
	handleUserOrganizations,
	handleSingleOrganization,
	handleCreateOrganization,
} from "../controllers/organization.controller.js";

const organizationRoute = Router();

organizationRoute.use(authMiddleware);

organizationRoute.get("/", handleUserOrganizations);
organizationRoute.get("/:orgId", handleSingleOrganization);
organizationRoute.post(
	"/",
	validateMiddleware(createOrgSchena),
	handleCreateOrganization
);

export default organizationRoute;
