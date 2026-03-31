const express = require('express')
const app = express()
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const Schema = require("./Controller/Controller");
const port = 8100

async function ConnectDB(url) {
    await mongoose.connect(url);
    console.log("database connected");
}
ConnectDB("mongodb://localhost:27017/GRAPH_QL");

app.use("/graphql", graphqlHTTP({
    schema: Schema,
    graphiql: true
}))

app.listen(port, () => {
    console.log(`http://localhost:${port}!`)
})