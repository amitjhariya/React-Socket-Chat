import mongoose from 'mongoose'
import { MONGO_URL } from "./index.js";
export const InitiateMongoServer = async () => {
  try {
    mongoose.set('strictQuery', false);
    mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};
