const get_data = require('./database_connection');

const get_users = async () => {
    let collection = await get_data();
    let data = await collection.find().toArray();
    console.log(data);
}

get_users();