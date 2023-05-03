const User = require("../model/userModel");

const checkUser = async (id) => {
    if(id) {
        const sender = await User.findOne({_id: id});
        return sender.username;
    }
}

module.exports = {
    checkUser
};