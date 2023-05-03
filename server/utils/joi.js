const joi = require("joi");
const User = require('../model/userModel');

const userValidation = joi.object({
    username: joi.string().alphanum().min(3).max(30).required(),
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: joi.string().min(8).required(),
    confirmPassword: joi.ref('password')
}).with('password', 'confirmPassword');

const isUsernameExisting = async (inputUsername) => {
    const username = await User.findOne({username: inputUsername}); 
    if(username) {
        error = `${inputUsername} is already exist!`;
        return error;
    }
}

const isEmailExisting = async (inputEmail) => {
    const email = await User.findOne({email: inputEmail}); 
    if(email) {
        error = `${inputEmail} is already exist!`;
        return error;
    }
}

module.exports = {
    userValidation,
    // loginValidation,
    isEmailExisting,
    isUsernameExisting
}