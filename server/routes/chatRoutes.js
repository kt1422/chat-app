const router = require('express').Router();
const chatController = require("../controller/chatController");
const { auth } = require('../utils/jwt');

//get messages
router.post('/getMessage', auth, chatController.getMessage);

//send messages
router.post('/sendMessage', auth, chatController.sendMessage);

module.exports = router;