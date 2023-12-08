const express = require("express");
const dotenv = require("dotenv");

// load .env variable environment
dotenv.config();

const app = express();

const promise = () => {
  return new Promise((resolve, reject) => {
    reject();
  });
}

app.get("/ok", async (req, res, next) => {
  try {
    await promise()
    res.status(200).json({ message: result });
  } catch (error) {
    next("app broke")
  }
});

app.use((err, req, res, next) => {
  console.log("logged...");
  res.status(500).json({ error: err })
});

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Listening to the port ${port}...`));
