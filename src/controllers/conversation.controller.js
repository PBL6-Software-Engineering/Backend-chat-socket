const Conversation = require("../models/conversation.model");
module.exports = {
  getAll: async (req, res) => {
    try {
      const { type, id } = req.query;
      const query = {};
      if (type === 'admin') {
        query['admin.id'] = id
      }
      if (type === 'user') {
        query['user.id'] = id
      }

      console.log('\n\n query::::', JSON.stringify(query));

      const conversations = await Conversation.find(query)
        .sort({ updatedAt: -1 })
        .lean();

      console.log('conversations', conversations);
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
