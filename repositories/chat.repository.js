const Chat = require("../models/chat.model");

class ChatRepository {
  static async findChatByParticipants(user1Id, user2Id) {
    return Chat.findOne({ participants: { $all: [user1Id, user2Id] } })
      .select("participants lastMessage lastMessageAt lastMessageStatus")
      .populate("participants", "name avatar")
      .lean();
  }

  static async createChat(participants) {
    return Chat.create({ participants });
  }

  static async updateChat(chatId, lastMessage, senderId, receiverId) {
    return Chat.findByIdAndUpdate(
      chatId,
      {
        lastMessage,
        lastMessageAt: Date.now(),
        lastMessageStatus: {
          [senderId]: true,
          [receiverId]: false,
        },
      },
      { new: true }
    );
  }

  static async seenChat(chatId, userId) {
    return await Chat.findByIdAndUpdate(
      chatId,
      { [`lastMessageStatus.${userId}`]: true },
      { new: true }
    ).lean();
  }

  static async getChats(userId, skip, limit) {
    return await Chat.find({ participants: userId })
      .sort({ lastMessageAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("participants lastMessage lastMessageAt lastMessageStatus")
      .populate("participants", "name avatar")
      .lean();
  }

  static async countChats(userId) {
    return await Chat.countDocuments({ participants: userId });
  }

  static async isUserInChat(chatId, userId) {
    const chat = await Chat.findOne({ _id: chatId, participants: userId }).lean();
    return !!chat;
  }

  static async getChatById(chatId) {
    return await Chat.findById(chatId)
      .select("participants lastMessage lastMessageAt lastMessageStatus")
      .populate("participants", "name avatar")
      .lean();
  }
}

module.exports = ChatRepository;
