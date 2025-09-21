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

  const specialFeatures = Array.isArray(movie.special_features)
    ? movie.special_features.join(',')
    : movie.special_features || '';

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
    specialFeatures  
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
    movie.special_features,
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
  const selectInventorySql = 'SELECT inventory_id FROM inventory WHERE film_id = ?';

  db.query(selectInventorySql, [id], function (err, results) {
    if (err) {
      logger.error(`DAO error selecting inventory: ${err.message}`);
      return callback(err);
    }

    const inventoryIds = results.map(row => row.inventory_id);

    // Stap 1: Verwijder alle rentals die verwijzen naar deze inventory_id's
    function deleteRentals(next) {
      if (inventoryIds.length === 0) return next();

      const deleteRentalsSql = 'DELETE FROM rental WHERE inventory_id IN (?)';
      db.query(deleteRentalsSql, [inventoryIds], function (err) {
        if (err) {
          logger.error(`DAO error deleting rentals: ${err.message}`);
          return callback(err);
        }
        next();
      });
    }

    // Stap 2: Verwijder uit inventory
    function deleteInventory(next) {
      const sql = 'DELETE FROM inventory WHERE film_id = ?';
      db.query(sql, [id], function (err) {
        if (err) {
          logger.error(`DAO error deleting inventory: ${err.message}`);
          return callback(err);
        }
        next();
      });
    }

    // Stap 3: Verwijder uit film_actor
    function deleteFilmActor(next) {
      const sql = 'DELETE FROM film_actor WHERE film_id = ?';
      db.query(sql, [id], function (err) {
        if (err) {
          logger.error(`DAO error deleting film_actor: ${err.message}`);
          return callback(err);
        }
        next();
      });
    }

    // Stap 4: Verwijder uit film_category
    function deleteFilmCategory(next) {
      const sql = 'DELETE FROM film_category WHERE film_id = ?';
      db.query(sql, [id], function (err) {
        if (err) {
          logger.error(`DAO error deleting film_category: ${err.message}`);
          return callback(err);
        }
        next();
      });
    }

    // Stap 5: Verwijder de film zelf
    function deleteFilm() {
      const sql = 'DELETE FROM film WHERE film_id = ?';
      db.query(sql, [id], function (err, result) {
        if (err) {
          logger.error(`DAO error deleting film: ${err.message}`);
          return callback(err);
        }
        callback(null, result.affectedRows > 0);
      });
    }

    // Start het verwijderproces
    deleteRentals(() => {
      deleteInventory(() => {
        deleteFilmActor(() => {
          deleteFilmCategory(() => {
            deleteFilm();
          });
        });
      });
    });
  });
}




module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
};
