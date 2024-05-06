export const PORT = process.env.PORT || 8000;
export const MONGO_USER = process.env.MONGODB_USER;
export const MONGO_PASSWORD = process.env.MONGODB_PASSWORD;
export const MONGO_URL = process.env.MONGODB_URL;

export type MongoConfig = {
  MONGO_URL: string;
  MONGO_USER: string;
  MONGO_PASSWORD: string;
};

export const mongoConfig: MongoConfig = {
  MONGO_URL,
  MONGO_USER,
  MONGO_PASSWORD,
};
