const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/NODE_JS');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/NODE_JS');
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};

module.exports.connectDB = connectDB;