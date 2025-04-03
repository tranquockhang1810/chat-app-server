const Chat = require("../models/chat.model");

class ChatRepository {
  static async findChatByParticipants(user1Id, user2Id) {
    return Chat.findOne({ participants: { $all: [user1Id, user2Id] } })
      .select("participants lastMessage lastMessageAt")
      .populate("participants", "name avatar")
      .lean();
  }

  static async createChat(participants) {
    return Chat.create({ participants });
  }

  static async updateChat(chatId, lastMessage) {
    return Chat.findByIdAndUpdate(chatId, { lastMessage, lastMessageAt: Date.now() }, { new: true });
  }

  static async getChats(userId, skip, limit) {
    return await Chat.find({ participants: userId })
      .sort({ lastMessageAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("participants lastMessage lastMessageAt")
      .populate("participants", "name avatar")
      .lean();
  }

  static async countChats(userId) {
    return await Chat.countDocuments({ participants: userId });
  }
}

module.exports = ChatRepository;
