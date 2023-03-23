import dotenv from "dotenv";
dotenv.config();
export const USER_API_URL: string | undefined = process.env.USER_API_URL;
export const RECEIPT_API_URL: string | undefined = process.env.RECEIPT_API_URL;
export const URL: string | undefined = process.env.URL;
export const CLODUINARY_API_URL: string | undefined =
  process.env.CLODUINARY_API_URL;
