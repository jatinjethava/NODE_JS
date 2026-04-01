require("dotenv").config();
const express = require('express')
const cors = require("cors");

const http = require("http");
const { execute, subscribe } = require("graphql");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { createApollo, startServer } = require("./Src/app");

const connectDB = require('./Src/Config/connection')
const schema = require('./Src/Graphql/Schema');

const app = express()
const PORT = process.env.PORT || 3000

console.log('Starting application...');

(async () => {
    try {

        const server = http.createServer(app);

        app.use(cors());
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        await connectDB();
        await createApollo(app);
        await startServer();

        SubscriptionServer.create(
            {
                schema,
                execute,
                subscribe,
                onConnect: () => {
                    console.log("client connected for subscription");
                },
                onDisconnect: () => {
                    console.log("client Disconnected for subscription");
                }
            },
            {
                server: server,
                path: "/graphql"
            }
        )

        server.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}/graphql`);
        });
    } catch (error) {
        console.error('Application startup error:', error);
        process.exit(1);
    }
})()
