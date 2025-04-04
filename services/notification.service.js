class NotificationService {
  constructor(...strategies) {
    this.strategies = strategies;
  }

  async send(userId, notificationData) {
    for (const strategy of this.strategies) {
      await strategy.sendMessageNotification(userId, notificationData);
    }
  }
}

module.exports = NotificationService;
