"use-strict";

const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DATABASE,
  wairForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.get("/", (req, res) => {
  pool.query("SELECT * FROM city", function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/city", (req, res) => {
  pool.query("SELECT * FROM city WHERE name LIKE 'a%'", function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/country/:code2", (req, res) => {
  const { code2 } = req.params;
  pool.query(
    `SELECT * FROM country WHERE Code2 = '${code2}';`,
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send(result);
      }
    }
  );
});

// app.get("/country/HighestLifeExpectancy/:limit", (req, res) => {
//   const { limit } = req.params;
//   pool.query(
//     `SELECT * FROM country
// ORDER BY LifeExpectancy desc
// LIMIT ${limit}`,
//     (error, result) => {
//       if (error) {
//         console.log(error);
//       } else {
//         res.send(result);
//       }
//     }
//   );
// });

// Exercise 3
app.get("/countryHighestLifeExpectancy/", (req, res) => {
  // query the db
  pool.query(
    `SELECT * FROM country ORDER BY LifeExpectancy DESC LIMIT ${req.query.limit};`,
    (err, myQueryResult) => {
      res.send(myQueryResult);
    }
  );
});

const PORT = process.env.PORT;
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else console.log(`It's working yo, at http://localhost:${PORT}`);
});
