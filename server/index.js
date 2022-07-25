const express = require('express');
const app = express();
const port = 8001;
const morgan = require('morgan');
const cors = require('cors');
const pool = require('./db')
app.use(cors());
app.use(express.json()); //req.body
app.use(morgan('dev'));

app.listen(port, () => {console.log(`Tool swap app running on port ${port}.`);});

//list tools
app.get("/tools", async (req, res) => {
  try {
    console.log(req);
    const getAllTools = await pool.query(
      // `SELECT movie_id, movie_title, movie_year, movie_genre_id, movie_imdb, genre_title
      // FROM movies JOIN genres ON genres.genre_id = movies.movie_genre_id
      // ORDER BY movie_id DESC`
      `SELECT * FROM tools`
    );
    res.json(getAllTools.rows);
  } catch (err) {
    console.error(err.message);
  }
})