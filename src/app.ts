// src/app.ts
import express from "express";
import App from "./services/ExpressApp";
import dbConnection from "./services/Database";
import { APP_NAME, BASE_URL, PORT } from "./config";
import { setupSwagger } from "./config/swagger";
import 'colors';

const StartServer = async () => {
  const app = express();

  try {
    await dbConnection();
    await App(app);
    // Setup Swagger
    setupSwagger(app);

    app.listen(PORT, () => {
      console.log(`${APP_NAME} is running on :  ${BASE_URL}:${PORT}`.blue.bold);
			console.log(`API Base URL is :  ${BASE_URL}:${PORT}/api`.blue.bold);
			console.log(`Swagger docs are available on :  ${BASE_URL}:${PORT}/api-docs`.blue.bold);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

StartServer();
