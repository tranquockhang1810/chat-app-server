const admin = require("../../config/firebase");
const NotificationStrategy = require("./NotificationStrategy");

class FirebaseNotificationStrategy extends NotificationStrategy {
  async sendMessageNotification(userId, notificationData) {
    if (!notificationData.fcmToken) {
      console.log(`🔥 [Firebase] User ${userId} has no FCM token.`);
      return;
    }

    const message = {
      token: notificationData.fcmToken,
      notification: {
        title: notificationData.sender.name,
        body: notificationData.type === "text" ? notificationData.content : "Has sent images",
        imageUrl: notificationData.sender.avatar,
      }
    };

    try {
      await admin.messaging().send(message);
      console.log(`🔥 [Firebase] Sent to ${userId}`);
    } catch (error) {
      console.error("🔥 [Firebase] Error:", error.message);
    }
  }
}

module.exports = FirebaseNotificationStrategy;
