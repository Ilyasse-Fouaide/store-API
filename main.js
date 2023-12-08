const express = require("express");
const dotenv = require("dotenv");
const router = require("./routes/store.routes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

// load .env variable environment
dotenv.config();

const app = express();

// routes
app.use("/api/v1/store", router);
app.use(notFound);

app.use(errorHandler);

// set up the server
const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Listening to the port ${port}...`));
