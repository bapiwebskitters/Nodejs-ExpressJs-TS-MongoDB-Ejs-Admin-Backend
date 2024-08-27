// src/routes/web/auth.ts
import express from 'express';
import AuthController from '../../controllers/api/AuthController';
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);

const AuthCtl = new AuthController();

namedRouter.post('auth.login', '/auth/login', AuthCtl.login);
namedRouter.post('auth.register', '/auth/register', AuthCtl.register);

export default router;
