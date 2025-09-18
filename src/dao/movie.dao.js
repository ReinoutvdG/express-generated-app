const db = require('../util/db');
const logger = require('../util/logger');

// alle films
function getAllMovies(callback) {
  db.query('SELECT * FROM film', function (err, results) {
    if (err) return callback(err);
    callback(null, results);
  });
}

// film op id
function getMovieById(id, callback) {
  logger.debug(`DAO: running query getMovieById with id=${id}`);

  db.query('SELECT * FROM film WHERE film_id = ?', [id], function (err, results) {
    if (err) {
      logger.error(`DAO error: ${err.message}`);
      return callback(err);
    }

    logger.debug(`DAO result for id=${id}: ${JSON.stringify(results)}`);
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

// film updaten
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

// film verwijderen
function deleteMovie(id, callback) {
  db.query('DELETE FROM film WHERE id = ?', [id], function (err, result) {
    if (err) return callback(err);
    // result.affectedRows > 0 betekent dat er echt iets verwijderd is
    callback(null, result.affectedRows > 0);
  });
}


module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
};
