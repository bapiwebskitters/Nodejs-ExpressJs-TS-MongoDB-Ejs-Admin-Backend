// src/routes/web/auth.ts
import express from "express";
import HomeController from "../../controllers/api/HomeController";
import { requireJWTAuth } from "../../middlewares/auth";

const routeLabel = require("route-label");
const router = express.Router();
const namedRouter = routeLabel(router);

const HomeCtl = new HomeController();

namedRouter.get("user.profile", "/user/profile", requireJWTAuth, HomeCtl.user);

export default router;
