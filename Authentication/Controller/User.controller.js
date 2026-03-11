const User = require("../Models/user.module");
const { v4: uuidv4 } = require("uuid");
const { setUser, getUser } = require("../Services/auth")

const SignUp = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(500).json({ success: false, message: "All Feilds Are Required." })
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: "Email already registered"
        });
    }

    await User.create({
        name,
        email,
        password,
    });

    res.status(200).json({ success: true, message: "User created successfully" });
}

const Login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(500).json({ success: false, message: "All Feilds Are Required." })
    }

    const logUser = await User.findOne({
        email,
        password,
    });

    if (!logUser) {
        return res.status(500).json({ success: false, message: "Invalid Email Or Password." })
    }

    const token = setUser(logUser);
    res.cookie("uid", token);
    console.log(token)
    res.status(200).json({ success: true, message: "User Login successfully" });
}

module.exports = {
    SignUp,
    Login
};