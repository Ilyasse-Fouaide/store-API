const express = require("express");
const router = require("./routes/product.routes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const config = require("./config/config");
const connect = require("./db/connect");

const app = express();

// routes
app.use("/api/v1/products", router);
// not found route
app.use(notFound);

// error handler middleware that catch all the errors coming from the endpoints 
app.use(errorHandler);

// set up the server
const port = config.PORT || 5001;

// if connected to the Db success then we should listen to the server at any port
const start = async () => {
  try {
    // connect function to the db that return mongoose promise
    await connect()
    // start the server
    app.listen(port, () => console.log(`Listening to the port ${port}...`));
  } catch (error) {
    throw new Error(error);
  }
}

start();
