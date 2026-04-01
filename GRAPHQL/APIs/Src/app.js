const { ApolloServer } = require("apollo-server-express");
const schema = require("./Graphql/Schema");

async function startServer(app) {

    const server = new ApolloServer({
        schema
    });
    await server.start();
    server.applyMiddleware({ app, path: "/graphql" });
    console.log('Apollo Server started successfully');
}

module.exports = startServer;