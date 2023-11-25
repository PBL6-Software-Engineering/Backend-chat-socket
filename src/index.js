const mongoose = require("mongoose");
const app = require("./app");
let server = null;
mongoose
  .connect("mongodb+srv://daitoan:daitoan@cluster0.ipllhkr.mongodb.net/chat-socket", {
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connected to database`);
    server = app.listen(3000, () => {
      console.log(`Listening to port ${3000}`);
    });

    const io = require("socket.io");
    const socketio = io(server, {
      cors: {
        origin: "*",
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
