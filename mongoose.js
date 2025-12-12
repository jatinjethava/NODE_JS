const mongoose = require('mongoose');
//Mongoose is used to connect your Node.js app with MongoDB and create models/schemas.

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/NODE_JS');
        // Define a schema and model
        const schema = new mongoose.Schema({
            name: String,
            course: String,
            mobile_no: Number,
            email: String
        });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};

const save_data = async () => {
    const userModel = mongoose.model('users', schema);
    // Example operation: create and save a new user
    let data = new userModel({
        name: 'jatin jethava',
        course: 'MERN Stack',
        mobile_no: 8160082638,
        email: 'jatin@gmail.com'
    });
    let result = await data.save();
    console.log('Data saved successfully');
}
save_data();

const get_data = async () => {
    const userModel = mongoose.model('users', schema);
    let data = await userModel.find();
    console.log(data);
}
get_data();

const update_data = async (id) => {
    const userModel = mongoose.model('users', schema);
    let data = await userModel.updateOne({ _id: id }, {
        $set: { name: 'Updated Name' }
    });
    console.log('Data updated successfully');
}
update_data('64a7f0c2f1d3c2b1a5e4d6f7');

const delete_data = async (id) => {
    const userModel = mongoose.model('users', schema);
    let data = await userModel.deleteOne({ _id: id });
    console.log('Data deleted successfully');
}
delete_data('64a7f0c2f1d3c2b1a5e4d6f7');
connectDB();

module.exports = connectDB;