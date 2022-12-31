import {Schema, model} from "mongoose"
const ObjectId = Schema.ObjectId;

const ChatGroupSchema = new Schema({
  name: { type: String, required: true },
  image:{ type: String },
  users: [{ type: ObjectId, ref: "User" }],
  messages: [{ type: ObjectId, ref: "Message" }],
  sockets: [{ type: String }], // Add an array to store socket IDs
  createdAt: { type: Date, default: Date.now },
});
export default model('Groups', ChatGroupSchema, 'groups');

