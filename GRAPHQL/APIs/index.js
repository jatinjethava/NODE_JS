require("dotenv").config();

const express = require('express')
const cors = require("cors");

const startServer = require("./Src/app");
const ConnectDB = require('./Src/Config/Connection')

const app = express()
const PORT = process.env.PORT || 3000

console.log('Starting application...');

(async () => {
    try {

        app.use(cors());
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        await ConnectDB();
        await startServer(app);

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}/graphql`);
        });
    } catch (error) {
        console.error('Application startup error:', error);
        process.exit(1);
    }
})()
