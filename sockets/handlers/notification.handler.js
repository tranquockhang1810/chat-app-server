const NotificationService = require('../../services/notification.service');
const UserService = require('../../services/user.service');
const SocketNotificationStrategy = require('../../strategies/notification/SocketNotificationStrategy');
const FirebaseNotificationStrategy = require('../../strategies/notification/FirebaseNotificationStrategy');

class NotificationHandler {
  static async sendMessageNotification(io, onlineUsers, messageData) {
    const notificationService = new NotificationService(
      new SocketNotificationStrategy(io, onlineUsers),
      // new FirebaseNotificationStrategy()
    );

    const userExists = await UserService.getUserById(messageData.sender);
    if (!userExists) return;
    
    await notificationService.send(messageData.receiver, {
      ...messageData,
      fcmToken: userExists.fcmTokens,
    });
  }
}

module.exports = NotificationHandler;