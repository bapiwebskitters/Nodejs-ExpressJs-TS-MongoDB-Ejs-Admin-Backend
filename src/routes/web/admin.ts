// src/routes/web/admin.ts
import express from 'express';
import { requireAdminAuth } from '../../middlewares/auth';
import { HomeController } from '../../controllers/web/HomeController';

const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);

// Create an instance of HomeController class
const homeController = new HomeController();

// Define named route for dashboard
namedRouter.get('admin.dashboard', '/admin/dashboard', requireAdminAuth, homeController.dashboard);

export default router;

