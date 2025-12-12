const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: String,
    course: String,
    mobile_no: Number,
    email: String
});

module.exports.User = mongoose.model('users', schema);
// const User = mongoose.model('users', schema);
// export default User;