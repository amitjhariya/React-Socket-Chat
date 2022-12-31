const MessageSchema = new Schema({
  sender: { type: ObjectId, ref: "User" },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
