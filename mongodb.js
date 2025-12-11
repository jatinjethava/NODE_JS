const { ObjectId } = require('mongodb');
const db_connection = require('./database_connection');

// 1. Example usage of the db_connection function to fetch and log all users
// const get_users = async () => {
//     let db = await db_connection();
//     let data = await db.find().toArray();
//     console.log(data);
// }

// get_users();


// 2. Example usage of the db_connection function to insert a new user
// const add_user = async (user) => {
//     let db = await db_connection();
//     let result = await db.insertMany(user);
//     // { name: "yashdip jethava", course: "MERN", mobile_no: 1234567890, email: "yashdip@gmail.com" } also wrighten like this
//     if (result.acknowledged) {
//         console.log('User added successfully');
//     }
// }
// add_user([
//     {
//         name: "yashdip jethava",
//         course: "BCA",
//         mobile_no: 7048798733,
//         email: "yashdip@gmail.com"
//     },
    // {
    //     name: "kalpesh jethava",
    //     course: "B.COM",
    //     mobile_no: 9638211368,
    //     email: "kalpesh@gmail.com"
    // }
// ]);


// 3. Example usage of the db_connection function to update a user
// const update_user = async (userId, updatedData) => {
//     let collection = await db_connection();
//     let result = await collection.updateOne({ _id: new ObjectId(userId) }, { $set: updatedData });
//     if (result.modifiedCount > 0) {
//         console.log('User updated successfully');
//     } else {
//         console.log('No changes made to the user');
//     }
// }
// update_user('693aa264494a9aeb205e194e', { mobile_no: 7048798733 });


// 4. Example usage of the db_connection function to delete a user
const delete_user = async (userId) => {
    let collection = await db_connection();
    let result = await collection.deleteOne({ _id: new ObjectId(userId) });
    console.log('Number of documents deleted:', result.deletedCount);
}
delete_user('693aa264494a9aeb205e194f');