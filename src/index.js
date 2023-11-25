const mongoose = require("mongoose");
const app = require("./app");
require('dotenv').config()

let server = null;
mongoose
  .connect("mongodb+srv://daitoan:daitoan@cluster0.ipllhkr.mongodb.net/chat-socket")
  .then(() => {
    console.log(`Connected to database`);
    server = app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
      console.log(`Listening to port ${process.env.PORT || 3000}`);
    });

    const io = require("socket.io");
    const socketio = io(server, {
      cors: {
        origin: ["http://localhost:4200", "*"],
        methods: ["GET", "POST"],
      },
    });
    require("./sockets")(socketio);
  });

process.on("SIGTERM", () => {
  if (server) {
    server.close();
  }
});
