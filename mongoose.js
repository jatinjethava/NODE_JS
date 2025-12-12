const mongoose = require('mongoose');
//Mongoose is used to connect your Node.js app with MongoDB and create models/schemas.

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/NODE_JS');
        // Define a schema and model
        const schema = new mongoose.Schema({
            name: String
        });
        console.log('MongoDB connected successfully');

        const userModel = mongoose.model('users', schema);

        // Example operation: create and save a new user
        let data = new userModel({
            name: 'jethava'
        });
        let result = await data.save();
        console.log(result);
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};

// module.exports = connectDB;
connectDB()