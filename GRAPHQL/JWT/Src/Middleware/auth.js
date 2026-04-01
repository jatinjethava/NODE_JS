const jwt = require("jsonwebtoken");

const AuthMiddleware = (req) => {
    const authHeader = req.headers.authorization || "";
    if (!authHeader) return null;

    const token = authHeader.replace("Bearer ", "");
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        return decoded;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = AuthMiddleware;