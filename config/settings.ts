import dotenv from "dotenv";
dotenv.config();

// const NODE_ENV: string = process.env.NODE_ENV || 'development';

export const MONGO_URI: string = process.env.MONGO_URI || 'mongodb://localhost:27017/test';
export const SERVER_PORT: number = +(process.env.SERVER_PORT || 5000);
export const JWT_SECRET: string = process.env.JWT_SECRET || 'someSecretKey33485';