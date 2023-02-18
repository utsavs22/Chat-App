const router = require('express').Router();
const { signup, temp, login, setAvatar, fetchAllUsers } = require('../controllers/UserController')
const fetchuser = require('./middleware/FetchUser')


router.post("/signup", signup);
router.post("/login", login);
router.get("/temp", fetchuser, temp); //example of using middleware
router.get("/fetchAllUsers", fetchuser, fetchAllUsers); //example of using middleware
router.post("/setAvatar", fetchuser, setAvatar); //example of using middleware

module.exports = router;