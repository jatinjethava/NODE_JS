const express = require('express')
const app = express()
const { graphqlHTTP } = require("express-graphql");
const schema = require("./Controller/user.controller");
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

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`http://localhost:${port}!`)
})