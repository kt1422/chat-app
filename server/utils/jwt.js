const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.body.token;
    if(!token) return res.send({status: "error", msg: "No token"});
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.getUser = verified;
        next();
    } catch (error) {
        return res.send({status: "error", msg: "Invalid token"});
    }
}

module.exports = {
    auth
}