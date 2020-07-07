const express = require('express');
const router = express.Router();
const pg = require('pg');

const Pool = pg.Pool;

const pool = new Pool({
  database: 'jazzy_ajax',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
});
// static content. this will be replaced with a database table
// const songListArray = [
//   {
//     title: 'Take Five',
//     length: '2:55',
//     date_released: '1959-09-29',
//   },
//   {
//     title: 'So What',
//     length: '9:22',
//     date_released: '1959-08-17',
//   },
// ];

// get info from the server
router.get('/', (req, res) => {
  console.log(`In /songs GET`);
  const queryText = `SELECT * FROM "songs" ORDER BY "title";`;
  pool
    .query(queryText)
    .then((dbResponse) => {
      console.log(dbResponse.rows);
      res.send(dbResponse.rows);
    })
    .catch((error) => {
      console.log(error);
      console.log("Something was suppose to come back, but it didn't.");
      res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
  const songs = req.body;
  const queryText = `INSERT INTO "songs" ("title", "length", "date_released")
VALUES ($1, $2, $3);`;
  pool
    .query(queryText, [songs.title, songs.length, songs.date_released])
    .then((dbResponse) => {
      console.log(dbResponse);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(error);
      console.log("I don't think that's it's chief");
      res.sendStatus(500);
    });
});

module.exports = router;
