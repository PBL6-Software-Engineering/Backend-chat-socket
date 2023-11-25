const express = require("express");
const messageRoute = require("./message.route");
const conversationRoute = require("./conversation.route");

const router = express.Router();

const routes = [
  {
    path: "/messages",
    route: messageRoute,
  },
  {
    path: "/conversations",
    route: conversationRoute,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
