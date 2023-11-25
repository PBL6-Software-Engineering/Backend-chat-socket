const express = require("express");
const router = express.Router();
const { messageCtrl } = require("../../controllers/index.controller");

router.get("/", messageCtrl.getAll);

module.exports = router;
