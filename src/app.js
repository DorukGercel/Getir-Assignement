const express = require('express');
const app = express();
const config = require("./configs");
const load = require("./loaders");
const {RecordRoutes, ErrorRoutes} = require("./routes")
const {Logger} = require("./logger/Logger")
const cors = require("cors")

// Initialize process env configs
config();
// Load db and connect
load();
// Arrange CORS settings
app.use(cors());
app.options('*', cors());
// Use json for API
app.use(express.json());

app.listen(process.env.PORT, () => {
    Logger.info(`Currently listening port ${process.env.PORT}`);
    // Set app routes
    app.use("/", RecordRoutes);
    app.use(ErrorRoutes);
})