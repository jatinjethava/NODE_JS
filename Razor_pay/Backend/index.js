const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = require("./src/app.js");
const razorpay = require("razorpay");
const validateSign = require("razorpay/dist/utils/razorpay-utils")
const path = require("path");
const connectDB = require("./src/database_connection.js");
const PORT = process.env.PORT;

connectDB();

app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "x-rtb-fingerprint-id"],
    exposedHeaders: ["Content-Type", "Authorization"]
}));

app.use("/api/payments", require('./src/Routes/Payments.route.js'))

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});