const { ApolloServer } = require('apollo-server-express');
const schema = require('./Graphql/Schema');

async function createApollo(app) {

    const server = new ApolloServer({
        schema,
    });

    await server.start();
    server.applyMiddleware({ app, path: "/graphql" });

    return server;
}

async function startServer(app) {
    return app;
}

module.exports = { createApollo, startServer };
