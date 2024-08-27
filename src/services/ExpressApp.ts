// src/services/Express.ts
import express, { Application } from "express";
import path from "path";
import passport from "passport";
import NamedRoutes from "named-routes";
import session from "express-session";
import routes from "../routes";
import expressLayouts from "express-ejs-layouts";
import { JWT_SECRET } from "../config/index";
import dotenv from "dotenv";
dotenv.config();
const setupExpressApp = async (app: Application) => {
  // Initialize NamedRoutes
  const namedRoutes = new NamedRoutes();
  namedRoutes.extendExpress(app as express.Express);
  namedRoutes.registerAppHelpers(app as express.Express);

  // Setup view engine
  app.use(expressLayouts);
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "../views"));
  app.set("layout", "layouts/mainlayout");

  // Middleware setup
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Session setup with default in-memory store
  app.use(
    session({
      secret: JWT_SECRET, // Use a secret key to sign the session ID cookie
      resave: false, // Don't save session if unmodified
      saveUninitialized: false, // Don't create session until something is stored
      cookie: {
        // Cookie settings
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        httpOnly: true, // Helps prevent cross-site scripting attacks
        maxAge: 1000 * 60 * 60 * 24, // 1 day in milliseconds
      },
    })
  );

  // Initialize Passport and its session management
  app.use(passport.initialize());
  app.use(passport.session());

  const imagePath = path.join(__dirname, "../public/images");
  app.use("/images", express.static(imagePath));

  // Initialize Routes
  app.use(routes);

  return app;
};

export default setupExpressApp;
