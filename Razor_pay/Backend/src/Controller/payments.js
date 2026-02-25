const { razorPayInstance } = require("../razorpay.config")
const razorInstance = razorPayInstance();
const crypto = require("crypto");

const createOrder = async (req, res) => {
    const { courseId, amount } = req.body;

    // create orders
    const option = {
        amount: amount * 100,
        currency: "INR",
        receipt: `order_receipt`
    }

    try {
        razorInstance.orders.create(option, (err, Order) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Something Went Wrong"
                });
            }
            return res.status(200).json({
                success: true,
                message: "Order Is Created.",
                order: Order
            })
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something Went Wrong"
        })
    }

}

const verifyPayment = async (req, res) => {
    try {

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        const secret = process.env.RAZORPAY_KEY_SECRET;

        if (!secret) {
            return res.status(500).json({
                success: false,
                message: "Secret key not configured"
            });
        }

        const hmac = crypto.createHmac("sha256", secret);

        hmac.update(
            razorpay_order_id + "|" + razorpay_payment_id
        );

        const generatedSignature = hmac.digest("hex");

        if (generatedSignature === razorpay_signature) {
            return res.status(200).json({
                success: true,
                message: "Payment Verified Successfully"
            });
        }

        return res.status(400).json({
            success: false,
            message: "Invalid Signature"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Verification Failed",
            error: error.message
        });
    }
}

module.exports = { createOrder, verifyPayment };