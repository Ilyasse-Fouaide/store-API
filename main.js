const express = require("express");
const dotenv = require("dotenv");

// load .env variable environment
dotenv.config();

const app = express();

app.listen(5000, () => console.log(`Listening...`));
