const express = require("express");
const dotenv = require("dotenv");

// load .env variable environment
dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ message: "ok!." });
})

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Listening to the port ${port}...`));
