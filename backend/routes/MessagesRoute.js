const router = require('express').Router();
const { getAllMessages, addMessage } = require('../controllers/MessagesController')
const fetchuser = require('./middleware/FetchUser')

router.post("/addMessage", fetchuser, addMessage);
router.post("/getAllMessages", fetchuser, getAllMessages);

module.exports = router;
