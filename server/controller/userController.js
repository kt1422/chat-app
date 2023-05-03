const User = require("../model/userModel");
const { userValidation, isEmailExisting, isUsernameExisting } = require('../utils/joi');
const { securePassword, comparePassword } = require('../utils/bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { error } = userValidation.validate(req.body);
    if(error) return res.send({status: "error", msg: error.details[0].message});

    const isUsernameExistingMsg = await isUsernameExisting(req.body.username);
    if(isUsernameExistingMsg) return  res.send({status: "error", msg: isUsernameExistingMsg});

    const isEmailExistingMsg = await isEmailExisting(req.body.email);
    if(isEmailExistingMsg) return  res.send({status: "error", msg: isEmailExistingMsg});

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        pic: "",
        password: await securePassword(req.body.password)
    });

    await newUser.save();
    delete newUser.password;
    return res.send({status: "success", msg: "You have successfuly created an account!", newUser})
}

const login = async (req, res) => {
    const logUser = await User.findOne({username: req.body.username});
    if(!logUser) return res.send({status: "error", msg: "The username you've entered is not connected to an account."});

    const isValid = await comparePassword(req.body.password, logUser.password);
    if(!isValid) return res.send({status: "error", msg: "The password you've entered is incorrect."});

    const token = jwt.sign({
        id: logUser.id,
        username: logUser.username
    }, process.env.TOKEN_SECRET, {expiresIn: "2h"});

    delete logUser.password;
    return res.send({status: "success", msg: "Logged In Successfully", token, logUser});
}

const getUser = async (req, res) => {
    const userId = req.getUser.id;
    if(userId){
        const logUser = await User.findOne({_id: userId});
        const user = {
            user_id: userId,
            username: logUser.username,
            email: logUser.email,
            pic: logUser.pic || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        }
        res.send({status: "success", msg: "Hello user", user});
    } else {
        res.send({status: "error", msg: "No user"});
    }
}

const getAllUsers = async (req, res) => {
    const userId = req.getUser.id;
    if(userId){
        const users = await User.find({ _id: { $ne: userId } }).select([
            "_id",
            "username",
            "email",
            "pic",
        ]);
        res.send({status: "success", msg: "Got all users", users});
    } else {
        res.send({status: "error", msg: "No user"});
    }
}

const changeAvatar = async (req, res) => {
    const userId = req.getUser.id;
    if(userId){
        const editUser = await User.findByIdAndUpdate(userId, {
            pic: req.body.pic,
        });
        res.send({
            status: "success",
            message: "You have successfuly update your avatar!"
        });
    } else {
        res.send({status: "error", msg: "No user"});
    }
}

module.exports = {
    register,
    login,
    getUser,
    getAllUsers,
    changeAvatar
}