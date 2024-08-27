// src/app.ts
import express from 'express';
import App from './services/ExpressApp';
import dbConnection from './services/Database';
import { APP_NAME, BASE_URL, PORT } from './config';

const StartServer = async () => {
    const app = express();

    try {
        await dbConnection();
        await App(app);
        app.listen(PORT, () => {
            console.log(`${APP_NAME} is running on ${BASE_URL}:${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
};

StartServer();
