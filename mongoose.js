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
    const User = mongoose.model('users', schema);
    // Example operation: create and save a new user
    const data = new User({
        name: 'jatin jethava',
        course: 'MERN Stack',
        mobile_no: 1234567890,
        email: 'jatin@gmail.com'
    });
    const result = await data.save();
    console.log('Data saved successfully');
}
// save_data();


const get_data = async () => {
    const User = mongoose.model('users', schema);
    const result = await User.find();
    console.log(result);
}
// get_data();


const update_data = async (id) => {
    const User = mongoose.model('users', schema);
    const result = await User.updateOne({ _id: id }, {
        $set: { mobile_no: 8160082638 }
    });
    console.log('Data updated successfully');
}
// update_data('693c25b509bfd4cfaf436b2e');


const delete_data = async (id) => {
    const User = mongoose.model('users', schema);
    const result = await User.deleteOne({ _id: id });
    console.log('Data deleted successfully');
}
// delete_data('693c25b509bfd4cfaf436b2e');


module.exports = connectDB;