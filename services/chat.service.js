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

  static async updateChatLastMessage(chatId, lastMessage) {
    return await ChatRepository.updateChat(chatId, lastMessage);
  }
}

module.exports = ChatService;
