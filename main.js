const express = require("express");
const dotenv = require("dotenv");
const router = require("./routes/store.routes");
const notFound = require("./middleware/notFound");

// load .env variable environment
dotenv.config();

const app = express();

// routes
app.use("/api/v1/store", router);
app.use(notFound)

// set up the server
const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Listening to the port ${port}...`));
