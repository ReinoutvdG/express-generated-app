const db = require('../util/db');

// alle films
function getAllMovies(callback) {
  db.query('SELECT * FROM film', function (err, results) {
    if (err) return callback(err);
    callback(null, results);
  });
}

// film op id
function getMovieById(id, callback) {
  db.query('SELECT * FROM film WHERE id = ?', [id], function (err, results) {
    if (err) return callback(err);
    callback(null, results[0]);
  });
}

// film toevoegen
function createMovie(movie, callback) {
  db.query(
    'INSERT INTO film (title, year) VALUES (?, ?)',
    [movie.title, movie.year],
    function (err, result) {
      if (err) return callback(err);
      callback(null, result.insertId);
    }
  );
}

function updateMovie(id, movie, callback) {
  db.query(
    'UPDATE movies SET title = ?, year = ? WHERE id = ?',
    [movie.title, movie.year, id],
    function (err, result) {
      if (err) return callback(err);
      callback(null, result);
    }
  );
}

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie
};
