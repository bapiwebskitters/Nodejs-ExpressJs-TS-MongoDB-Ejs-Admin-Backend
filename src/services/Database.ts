// src/services/Database.ts
import mongoose from 'mongoose';
import { MONGO_URI } from '../config';

const connectDatabase = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('DB Connected!');
    } catch (error) {
        console.error('DB Connection Error:', error);
        throw error; 
    }
};

export default connectDatabase;
