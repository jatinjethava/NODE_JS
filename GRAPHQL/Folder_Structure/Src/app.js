require("dotenv").config();
const express = require("express");
const { typeDefs, resolvers } = require("./Graphql/Schema")

const { ApolloServer } = require("apollo-server-express");
// const { expressMiddleware } = require("@apollo/server/express4");


async function startServer() {
    const app = express();
    const server = new ApolloServer({
        typeDefs,
        resolvers
    })
    await server.start();
    server.applyMiddleware({ app, path: "/graphql" });

    return app;
}

module.exports = startServer;