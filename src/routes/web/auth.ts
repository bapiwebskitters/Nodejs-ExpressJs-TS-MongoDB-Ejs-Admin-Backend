// src/routes/web/auth.ts
import express from 'express';
import passport from 'passport';

const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);

namedRouter.get('admin.auth.login', '/admin/login', (req: any, res: any) => {
    res.render('login', { title: 'Admin Login', layout: './layouts/authlayout' });
});  

// Use passport.authenticate for handling the login POST request
namedRouter.post('admin.auth.login', '/admin/login', passport.authenticate('local', {
    successRedirect: '/admin/dashboard', 
    failureRedirect: '/admin/login', 
    failureFlash: true
}));

export default router;
