const Message = require("../models/message.model");
const Conversation = require("../models/conversation.model");

module.exports = {
  getAll: async (req, res) => {
    try {
      const {conversationId, skip, limit} = req.query;
      console.log('conversationId', conversationId);
      if (!conversationId) {
        return res.status(400).json({
          message: "conversationId is required",
        });
      }
      const totalMessage = await Message.countDocuments({
        conversationId: conversationId,
      });
      let messages = await Message.find({
        conversationId: conversationId,
      })
        .sort({ createdAt: -1 })
        .skip(+skip)
        .limit(+limit)
        .lean();

      messages = messages.reverse();
      res.status(200).send({
        data: {
          messages,
          totalMessage
        },
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error",
        error,
      });
    }
  },

  create: async (socket, data) => {
    try {
      // create message
      const messageObj = {
        ...data,
        createdAt: new Date(),
      };
      messageObj.adminId = messageObj.admin.id;
      messageObj.userId = messageObj.user.id;
      const { conversationId, admin, user, message } = messageObj;

      await Conversation.findOneAndUpdate(
        {
          conversationId,
        },
        {
          $set: {
            conversationId: conversationId,
            lastMessage: message,
            admin: admin,
            user: user,
            updatedAt: new Date(),
          },
        },
        {
          upsert: true,
        },
      );

      const conversation = await Conversation.findOne({conversationId}).lean();

      delete messageObj.admin;
      delete messageObj.user;
      await Message.create(messageObj);
      socket.broadcast.emit("message", messageObj);
      socket.broadcast.emit("conversation", conversation);
    } catch (error) {
      socket.broadcast.emit("send_error", data);
      console.log(error);
    }
  },
};
