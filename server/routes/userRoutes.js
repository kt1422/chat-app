const router = require('express').Router();
const userController = require("../controller/userController");
const { auth } = require('../utils/jwt');

//register user
router.post('/register', userController.register);

//login user
router.post('/login', userController.login);

//auth user
router.post('/auth', auth, userController.getUser);

//get all users
router.post('/getAllUsers', auth, userController.getAllUsers);

//change avatar
router.post('/changeAvatar', auth, userController.changeAvatar);

module.exports = router;