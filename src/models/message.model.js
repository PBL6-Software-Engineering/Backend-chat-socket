const { Schema, model } = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var messageSchema = new Schema({
  messageId: {
    type: String,
  },
  conversationId: {
    type: String,
  },
  userId: {
    type: String,
  },
  adminId: {
    type: String,
  },
  isUserSend: {
    type: Boolean,
  },
  isAdminSend: {
    type: Boolean,
  },
  message: {
    type: String,
  },
  attachment: {
    type: String,
    url: String,
    name: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//Export the model
module.exports = model("message", messageSchema);
