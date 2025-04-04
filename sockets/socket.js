const socketIo = require("socket.io");
const ChatHandler = require("./handlers/chat.handler");
const NotificationHandler = require("./handlers/notification.handler");
const { validateMessageData } = require("../middleware/validate/message.validate");
const { validateSeenChatParams } = require("../middleware/validate/chat.validate");
const UserService = require("../services/user.service");

const onlineUsers = new Map();

const initializeSocket = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    },
  });

  io.on("connection", (socket) => {
    console.log("A socket connected:", socket.id);

    // Lưu user online
    socket.on("user-online", async (data) => {
      const { userId, fcmToken } = data;
      onlineUsers.set(userId, socket.id);
      console.log(`User ${userId} is online`);

      if (fcmToken) {
        await UserService.updateFCMToken(userId, fcmToken);
      }
    });

    // Xử lý gửi tin nhắn
    socket.on("send-message", async (messageData) => {
      const error = validateMessageData(messageData);
      if (error) return socket.emit("socket-error", error);

      await ChatHandler.handleSendMessage(messageData);
      await NotificationHandler.sendMessageNotification(io, onlineUsers, messageData);
    });

    socket.on("seen-chat", async (data) => {
      const error = await validateSeenChatParams(data);
      if (error) return socket.emit("socket-error", error);
      await ChatHandler.handleSeenChat(data);
    });

    // User disconnect
    socket.on("disconnect", async () => {
      let disconnectedUserId = null;

      for (let [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          disconnectedUserId = userId;
          console.log(`User ${userId} disconnected`);
          break;
        }
      }

      if (disconnectedUserId) {
        const isStillOnline = [...onlineUsers.keys()].includes(disconnectedUserId);
        if (!isStillOnline) {
          await UserService.removeFCMToken(disconnectedUserId);
        }
      }
    });
  });
};

module.exports = { initializeSocket };
