const ChatFacade = require("../../facades/chat.facade");

class ChatHandler {
  static async handleSendMessage(messageData) {
    return await ChatFacade.sendMessage(messageData);
  }
}

module.exports = ChatHandler;
