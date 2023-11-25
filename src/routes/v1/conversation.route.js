const express = require("express");
const router = express.Router();
const { conversationCtrl } = require("../../controllers/index.controller");

router.get("/", conversationCtrl.getAll);

module.exports = router;
