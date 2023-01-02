import dotenv from "dotenv"
dotenv.config()
export const PORT =process.env.PORT || 8000
export const MONGO_URL=process.env.MONGO_URL
export const JWT_SECRET =process.env.JWT_SECRET
export const CLIENT_URL=process.env.CLIENT_URL