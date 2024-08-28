// src/routes/web/auth.ts
import express from 'express';
import AuthController from '../../controllers/api/AuthController';
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);

const AuthCtl = new AuthController();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication management
 */


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid credentials
 */
namedRouter.post('auth.login', '/auth/login', AuthCtl.login);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User register in successfully
 *       401:
 *         description: Invalid credentials
 */
namedRouter.post('auth.register', '/auth/register', AuthCtl.register);

export default router;
