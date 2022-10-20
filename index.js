"use-strict";

const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
  res.send("hello world");
});

const PORT = process.env.PORT;
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else console.log(`It's working yo, at http://localhost:${PORT}`);
});
