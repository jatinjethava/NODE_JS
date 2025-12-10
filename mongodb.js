const { mongoClient, MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbName = 'NODE_JS';
const client = new MongoClient(url);

async function get_data() {
    let result = await client.connect();
    let db = result.db(dbName);
    let collection = db.collection('products');
    let data = await collection.find({}).toArray();
    console.log(data);
}

get_data();