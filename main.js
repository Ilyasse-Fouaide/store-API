const express = require("express");
const router = require("./routes/store.routes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const config = require("./config/config");
const connect = require("./db/connect");

// connect to the mongo database
connect();

const app = express();

// routes
app.use("/api/v1/store", router);
app.use(notFound);

app.use(errorHandler);

// set up the server
const port = config.PORT || 5001;
app.listen(port, () => console.log(`Listening to the port ${port}...`));
