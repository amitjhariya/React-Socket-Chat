import {Schema, model} from "mongoose"
const ObjectId = Schema.ObjectId;

const MessageSchema = new Schema({
  sender: { type: ObjectId, ref: "Users" },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model('Messages', MessageSchema, 'messages');