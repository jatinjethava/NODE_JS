const razorpay = require("razorpay");

exports.razorPayInstance = () => {
    return new razorpay({
        key_id: process.env.razorpay_key_id,
        key_secret: process.env.razorpay_key_secret
    })
}