const Conversation = require("../models/conversation.model");
module.exports = {
  getAll: async (req, res) => {
    try {
      const { type, id } = req;
      const query = {};
      if (type === 'admin') {
        query.userId = id;
      }
      if (type === 'user') {
        query.adminId = id;
      }

      const conversations = await Conversation.find(query)
        .sort({ updatedAt: -1 })
        .lean();

      return res.status(200).json({
        data: conversations,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error",
        error,
      });
    }
  },
};
