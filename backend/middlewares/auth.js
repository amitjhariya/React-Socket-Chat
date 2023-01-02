import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./../configurations/index.js";

export default function auth(req, res, next) {
  const token = req.header("token");
  if (!token) return res.status(401).json({ message: "Auth Error" });

  try {
    const user = jwt.verify(token, JWT_SECRET);    
    req.user = user;
    next();
  } catch (e) {
     res.status(500).send({ message: "Invalid Token" });     
  }
}
