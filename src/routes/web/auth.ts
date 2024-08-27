// src/routes/web/auth.ts
import express from 'express';
import AuthController from '../../controllers/web/AuthController';
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);

const AuthCtl = new AuthController();

// Define named routes
namedRouter.get('admin.auth.login', '/admin/login', (req: any, res: any) => {
    console.log("admin.auth.login");
    res.render('login', { title: 'Admin Login', layout: './layouts/authlayout' });
});

namedRouter.post('admin.auth.login', '/admin/login', AuthCtl.login);

export default router;
