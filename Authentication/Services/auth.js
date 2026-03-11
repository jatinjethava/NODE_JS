const jwt = require("jsonwebtoken");
const secret = "jatin_jethava_8100";

function setUser(user) {
    return jwt.sign({
        _id: user.id,
        email: user.email
    }, secret);
}

function getUser(token) {
    if (!token) {
        return null;
    }
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
}

module.exports = {
    setUser,
    getUser,
}