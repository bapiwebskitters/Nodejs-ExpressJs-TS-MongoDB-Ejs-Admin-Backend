// src/config/index.ts
import dotenv from 'dotenv';
dotenv.config();

export const APP_NAME = process.env.APP_NAME || 'NodeJS Backend';

export const BASE_URL = process.env.HOST || 'http://localhost';
export const PORT = process.env.PORT || 8000;

export const JWT_SECRET = process.env.JWT_SECRET || 'mytoken';

export const DB_CONNECTION = process.env.DB_CONNECTION || 'moongose';
export const DB_HOST = process.env.DB_HOST || 'mongo2.webskitters.in';
export const DB_PORT = process.env.DB_PORT || '27117';
export const DB_DATABASE = process.env.DB_DATABASE || 'aaahealthcare';
export const DB_USERNAME = process.env.DB_USERNAME || 'developer';
export const DB_PASSWORD = process.env.DB_PASSWORD || 'aaahealthcare@123$';
