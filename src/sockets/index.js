const messageController = require("../controllers/message.controller");
module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    // người dùng gửi tin nhắn
    socket.on("message", (data) => {
      console.log("message: " + JSON.stringify(data));
      // lưu tin nhắn vào db
      messageController.create(socket, data);
      // gửi tin nhắn cho tất cả người dùng
      // io.sockets.emit('message', data);
    });
  });
};
