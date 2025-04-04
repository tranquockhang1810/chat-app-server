const NotificationStrategy = require("./NotificationStrategy");

class SocketNotificationStrategy extends NotificationStrategy {
  constructor(io, onlineUsers) {
    super();
    this.io = io;
    this.onlineUsers = onlineUsers;
  }

  sendMessageNotification(userId, notificationData) {
    const receiverSocketId = this.onlineUsers.get(userId);
    if (receiverSocketId) {
      this.io.to(receiverSocketId).emit("receive-message", notificationData);
      console.log(`🔵 [Socket] Sent to ${userId}`);
    } else {
      console.log(`🔵 [Socket] User ${userId} is offline.`);
    }
  }
}

module.exports = SocketNotificationStrategy;
