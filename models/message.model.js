const mongoose = require("mongoose");
const MessageType = require("../consts/MessageTypeConsts");

const MessageSchema = new mongoose.Schema(
  {
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat", required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: Object.values(MessageType), required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { discriminatorKey: "type", collection: "messages" }
);

const Message = mongoose.model("Message", MessageSchema);

// Các kiểu tin nhắn khác nhau
const TextMessage = Message.discriminator(
  MessageType.TEXT,
  new mongoose.Schema({ content: { type: String, required: true } })
);

const ImageMessage = Message.discriminator(
  MessageType.IMAGE,
  new mongoose.Schema({ images: [{ type: String, required: true }] })
);

module.exports = {
  Message,
  TextMessage,
  ImageMessage
};
