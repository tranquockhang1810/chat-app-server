const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  lastMessage: { type: String },
  lastMessageAt: { type: Date, default: Date.now },
  lastMessageStatus: {
    type: Map,
    of: Boolean,
    default: {},
  },
}, { timestamps: true });

module.exports = mongoose.model("Chat", ChatSchema);