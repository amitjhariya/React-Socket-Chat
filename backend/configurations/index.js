import dotenv from "dotenv"
dotenv.config()
export const PORT =process.env.PORT || 8000
export const MONGO_URL=process.env.MONGO_URL
export const JWT_SECRETE =process.env.JWT_SECRETE