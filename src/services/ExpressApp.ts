// src/services/Express.ts
import express, { Application } from 'express';
import path from 'path';
import passport from 'passport';
import NamedRoutes from 'named-routes';
import session from 'express-session';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';
import routes from '../routes';
import expressLayouts from 'express-ejs-layouts';

const setupExpressApp = async (app: Application) => {
    // Create a Redis client
    const redisClient = createClient({
        url: 'redis://localhost:6379',
    });

    redisClient.on('error', (err) => {
        console.error('Redis Client Error:', err);
    });

    // Initialize NamedRoutes
    const namedRoutes = new NamedRoutes();
    namedRoutes.extendExpress(app as express.Express);
    namedRoutes.registerAppHelpers(app as express.Express);

    // Setup view engine
    app.use(expressLayouts);
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '../views'));
    app.set('layout', 'layouts/mainlayout');

    // Middleware setup
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(session({
        store: new RedisStore({ client: redisClient }),
        secret: process.env.SESSION_SECRET || 'your-secret',
        resave: false,
        saveUninitialized: false,
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    const imagePath = path.join(__dirname, '../public/images');
    app.use('/images', express.static(imagePath));

    // Initialize Routes
    app.use(routes);

    return app;
};

export default setupExpressApp;

