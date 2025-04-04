const ChatService = require("../services/chat.service");
const MessageService = require("../services/message.service");

class ChatFacade {
  static async getChatMessages(user1Id, user2Id, page, limit) {
    const chat = await ChatService.getOrCreateChat(user1Id, user2Id);
    const { messages, total } = await MessageService.getMessagesByChatId(chat._id, page, limit);
    return { chat, messages, total };
  }

  static async getChatList(userId, page, limit) {
    const { chats, total } = await ChatService.getChatList(userId, page, limit);
    return { chats, total };
  }

  static async sendMessage(messageData) {
    try {
      let { chatId, sender, content, images, receiver } = messageData;
      const messageType = MessageService.determineMessageType(messageData);
      const savedMessage = await MessageService.saveMessage({
        chatId,
        sender,
        content,
        images,
        type: messageType,
      });
      await ChatService.updateChatLastMessage(
        chatId, 
        savedMessage.content || `Has sent ${images.length} image${images.length > 1 ? "s" : ""}`,
        sender,
        receiver
      );

      return savedMessage;
    } catch (error) {
      console.error("Error in ChatFacade.sendMessage:", error.message);
      throw error;
    }
  }

  static async seenChat(chatId, userId) {
    try {
      const updatedChat = await ChatService.seenChat(chatId, userId);
      return updatedChat;
    } catch (error) {
      console.error("Error in ChatFacade.seenChat:", error.message);
      throw error;
    }
  }
}

module.exports = ChatFacade;
