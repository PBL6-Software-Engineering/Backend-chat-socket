const { Schema, model } = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var conversationSchema = new Schema({
  conversationId: {
    type: String,
    required: true,
    unique: true,
  },
  lastMessage: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  admin: {
    type: {
      id: String,
      name: String,
      avatar: String,
    }
  },
  user: {
    type: {
      id: String,
      name: String,
      avatar: String,
    }
  },
  userRemoved: {
    type: Boolean,
    default: false,
  },
  adminRemoved: {
    type: Boolean,
    default: false,
  },
  countMessageUnread: {
    type: Number,
    default: 0,
  },
});

//Export the model
module.exports = model("conversation", conversationSchema);
