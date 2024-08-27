// src/config/index.ts
export const MONGO_URI = 'mongodb://127.0.0.1:27017/online_food_delivery';
export const APP_SECRET = '238745623hsdf'
export const APP_NAME = process.env.APP_NAME || 'NodeJS Backend';
export const BASE_URL = process.env.HOST || 'http://localhost';
export const PORT = process.env.PORT || 8000;
