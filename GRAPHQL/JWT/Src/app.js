const { ApolloServer } = require('apollo-server-express');
const schema = require('./Graphql/Schema');

async function startServer(app) {
    const server = new ApolloServer({ schema });
    await server.start();
    server.applyMiddleware({ app, path: "/graphql" });
}

module.exports = startServer;
