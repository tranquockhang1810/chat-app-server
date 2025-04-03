const socketIo = require("socket.io");
const ChatHandler = require("./handlers/chat.handler");
const { validateMessageData } = require("../middleware/validate/message.validate");

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
    socket.on("user-online", (userId) => {
      onlineUsers.set(userId, socket.id);
      console.log(`User ${userId} is online`);
    });

    // Xử lý gửi tin nhắn
    socket.on("send-message", async (messageData) => {
      const error = validateMessageData(messageData);
      if (error) return socket.emit("message-error", error);

      const savedMessage = await ChatHandler.handleSendMessage(messageData);
      
      const receiverSocketId = onlineUsers.get(messageData.receiver);
      if (receiverSocketId && savedMessage) {
        io.to(receiverSocketId).emit("receive-message", savedMessage);
      }
    });

    // User disconnect
    socket.on("disconnect", () => {
      for (let [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          console.log(`User ${userId} disconnected`);
          break;
        }
      }
    });
  });
};

module.exports = { initializeSocket };
