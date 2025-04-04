const ChatFacade = require("../../facades/chat.facade");

class ChatHandler {
  static async handleSendMessage(messageData) {
    return await ChatFacade.sendMessage(messageData);
  }

  static async handleSeenChat(data) {
    return await ChatFacade.seenChat(data.chatId, data.userId);
  }
}

module.exports = ChatHandler;
