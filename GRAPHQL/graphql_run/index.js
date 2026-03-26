const express = require('express')
const app = express()
const { graphqlHTTP } = require("express-graphql");
const schema = require("./Schema/schema");
const port = 8100

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