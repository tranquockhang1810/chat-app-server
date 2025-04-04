const { Message } = require("../models/message.model");

class MessageRepository {
  static async createMessage(messageData) {
    if (!messageData.type) {
      throw new Error("Message type is required");
    }

    return (await Message.create(messageData))
      .populate("sender", "avatar name");
  }

  static async getMessages(chatId, skip, limit) {
    return await Message.find({ chatId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
  }

  static async countMessages(chatId) {
    return await Message.countDocuments({ chatId });
  }
}

module.exports = MessageRepository;
