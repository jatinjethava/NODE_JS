const express = require('express')
const app = express()
const { graphqlHTTP } = require("express-graphql");
const schema = require("./Controller/Controller");
const mongoose = require("mongoose");
const port = 8100

async function ConnectDB(url) {
    await mongoose.connect(url);
    console.log("database connected");
}
ConnectDB("mongodb://localhost:27017/GRAPH_QL");

app.use("/graphql", graphqlHTTP({
    schema, // only that data can be return which was define in schema
    graphiql: true // graphql UI
}));

app.listen(port, () => {
    console.log(`http://localhost:${port}!`)
})