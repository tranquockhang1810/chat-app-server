const ChatRepository = require("../repositories/chat.repository");

class ChatService {
  static async getOrCreateChat(user1Id, user2Id) {
    let chat = await ChatRepository.findChatByParticipants(user1Id, user2Id);
    if (!chat) {
      chat = await ChatRepository.createChat([user1Id, user2Id]);
    }
    return chat;
  }

  static async getChatList(userId, page, limit) {
    const skip = (page - 1) * limit;
    const [chats, total] = await Promise.all([
      ChatRepository.getChats(userId, skip, limit),
      ChatRepository.countChats(userId),
    ]);
    return { chats, total };
  }

  static async updateChatLastMessage(chatId, lastMessage, senderId, receiverId) {
    return await ChatRepository.updateChat(chatId, lastMessage, senderId, receiverId);
  }

  static async seenChat(chatId, userId) {
    return await ChatRepository.seenChat(chatId, userId);
  }

  static async isUserInChat(chatId, userId) {
    return await ChatRepository.isUserInChat(chatId, userId);
  }

  static async getChatById(chatId) {
    return await ChatRepository.getChatById(chatId);
  }
}

module.exports = ChatService;
