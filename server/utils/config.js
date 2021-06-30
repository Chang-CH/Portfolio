import dotenv from 'dotenv';

dotenv.config();

export const CLIENT_ID = process.env.CLIENT_ID;
export const CLIENT_SECRET = process.env.CLIENT_SECRET;
export const REDIRECT_URI = process.env.REDIRECT_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const SIGN_COOKIE_SECRET = process.env.SIGN_COOKIE_SECRET;
export const FRONT_END = process.env.FRONT_END;
export const BACK_END = process.env.BACK_END;
export const MONGO_URL = process.env.MONGO_URL;
export const PORT = process.env.PORT;
export const ENCRYPT_KEY = process.env.ENCRYPT_KEY;
export const PEXELS_API_KEY = process.env.PEXELS_API_KEY;