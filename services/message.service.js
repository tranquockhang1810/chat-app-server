const MessageRepository = require("../repositories/message.repository");
const MessageType = require("../consts/MessageTypeConsts");

class MessageService {
  static async saveMessage(messageData) {
    return await MessageRepository.createMessage(messageData);
  }

  static determineMessageType({ content, images }) {
    if (Array.isArray(images) && images.length > 0) return MessageType.IMAGE;
    return content ? MessageType.TEXT : null;
  }  

  static async getMessagesByChatId(chatId, page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    const [messages, total] = await Promise.all([
      MessageRepository.getMessages(chatId, skip, limit),
      MessageRepository.countMessages(chatId),
    ]);

    return { messages, total };
  }
}

module.exports = MessageService;
