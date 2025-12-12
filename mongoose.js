const mongoose = require('mongoose');
//Mongoose is used to connect your Node.js app with MongoDB and create models/schemas.


// Define schema at top-level so it is accessible everywhere
const schema = new mongoose.Schema({
    name: String,
    course: String,
    mobile_no: Number,
    email: String
});

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/NODE_JS');
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};
connectDB();


const save_data = async () => {
    const userModel = mongoose.model('users', schema);
    // Example operation: create and save a new user
    const data = new userModel({
        name: 'jatin jethava',
        course: 'MERN Stack',
        mobile_no: 8160082638,
        email: 'jatin@gmail.com'
    });
    const result = await data.save();
    console.log('Data saved successfully');
}
// save_data();


const get_data = async () => {
    const userModel = mongoose.model('users', schema);
    const result = await userModel.find();
    console.log(result);
}
// get_data();


const update_data = async (id) => {
    const userModel = mongoose.model('users', schema);
    const result = await userModel.updateOne({ _id: id }, {
        $set: { name: 'jatin jethava' }
    });
    console.log('Data updated successfully');
}
// update_data('693c2215e573701fc28c9f5c');


const delete_data = async (id) => {
    const userModel = mongoose.model('users', schema);
    const result = await userModel.deleteOne({ _id: id });
    console.log('Data deleted successfully');
}
// delete_data('693c2215e573701fc28c9f5c');


module.exports = connectDB;