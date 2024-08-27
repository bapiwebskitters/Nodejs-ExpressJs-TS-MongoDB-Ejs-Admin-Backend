// src/config/index.ts
import dotenv from 'dotenv';
dotenv.config();

export const MONGO_URI =  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/node_backend';
export const APP_NAME = process.env.APP_NAME || 'NodeJS Backend';
export const BASE_URL = process.env.HOST || 'http://localhost';
export const PORT = process.env.PORT || 8000;
export const JWT_SECRET = process.env.JWT_SECRET || 'mytoken';
