const db = require('../util/db');
const logger = require('../util/logger');

// alle films
function getAllMovies(callback) {
  db.query('SELECT film_id, title, description, release_year, language_id, rental_duration, rental_rate, length, replacement_cost, rating FROM film', function (err, results) {
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
  const sql = `
    INSERT INTO film 
      (title, description, release_year, language_id, rental_duration, rental_rate, length, replacement_cost, rating, special_features) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    movie.title,
    movie.description,
    movie.release_year,
    movie.language_id,
    movie.rental_duration,
    movie.rental_rate,
    movie.length,
    movie.replacement_cost,
    movie.rating,
    movie.special_features
  ];

  logger.debug(`DAO: createMovie sql=${sql}`);
  logger.debug(`DAO: createMovie params=${JSON.stringify(params)}`);

  db.query(sql, params, function (err, result) {
    if (err) {
      logger.error(`DAO createMovie error: ${err.message}`);
      return callback(err);
    }
    logger.debug(`DAO: createMovie result=${JSON.stringify(result)}`);
    callback(null, result);
  });
}


// film updaten
function updateMovie(id, movie, callback) {
  logger.debug(`DAO: updateMovie query with id=${id}, data=${JSON.stringify(movie)}`);

  const sql = `
    UPDATE film 
    SET title = ?, 
        description = ?, 
        release_year = ?, 
        language_id = ?, 
        rental_duration = ?, 
        rental_rate = ?, 
        length = ?, 
        replacement_cost = ?, 
        rating = ?, 
        special_features = ?
    WHERE film_id = ?
  `;

  const params = [
    movie.title,
    movie.description,
    movie.release_year,
    movie.language_id,
    movie.rental_duration,
    movie.rental_rate,
    movie.length,
    movie.replacement_cost,
    movie.rating,
    movie.special_features, // hier toevoegen ✅
    id
  ];

  db.query(sql, params, function (err, result) {
    if (err) {
      logger.error(`DAO updateMovie error: ${err.message}`);
      return callback(err);
    }
    logger.debug(`DAO: updateMovie result=${JSON.stringify(result)}`);
    callback(null, result);
  });
}


// film verwijderen
function deleteMovie(id, callback) {
  db.query('DELETE FROM film WHERE film_id = ?', [id], function (err, result) {
    if (err) {
      logger.error(`DAO deleteMovie error: ${err.message}`);
      return callback(err);
    }
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
