const express = require('express');
const router = express.Router();
const movieService = require('../services/movie.service');
const logger = require('../util/logger');


// READ - alle films
function getAllMovies(req, res, next) {
movieService.getAllMovies(function (err, movies) {
  if (err) return next(err);

  res.render('movies/index', {
    title: 'All Movies',
    movies: movies.slice(0, 12) // eerste 12
  });
});
}

// READ - één film
function getMovieById(req, res, next) {
  movieService.getMovieById(req.params.id, function (err, movie) {
    if (err) {
      logger.error(`Error in service.getMovieById: ${err.message}`);
      return next(err);
    }

    if (!movie) {
      logger.warn(`No movie found with id=${req.params.id}`);
      return res.status(404).send('Movie not found');
    }

    logger.info(`Movie found: ${movie.title} (id=${movie.film_id})`);

    res.render('movies/detail', {
      title: movie.title,
      movie: movie
    });
  });
}

// CREATE
function createMovie(req, res, next) {
  movieService.createMovie(req.body, (err, newMovie) => {
    if (err) return next(err);
    res.redirect(`/movies/${newMovie.insertId}`); // redirect naar de nieuwe film
  });
}


// UPDATE
function updateMovie(req, res, next) {
  logger.debug(`req.body: ${JSON.stringify(req.body)}`);

  const id = req.params.id;
  const movieData = req.body;

  // haal de features op (ondersteun zowel 'special_features' als 'special_features[]')
  let sf = req.body['special_features'] || req.body['special_features[]'];

  if (Array.isArray(sf)) {
    movieData.special_features = sf.map(s => s.trim()).join(',');
  } else if (typeof sf === 'string' && sf.length) {
    movieData.special_features = sf.trim();
  } else {
    movieData.special_features = '';
  }

  logger.debug(
    `Controller updateMovie id=${id}, special_features=${movieData.special_features}`
  );

  movieService.updateMovie(id, movieData, function (err, success) {
    if (err) return next(err);
    res.redirect(`/movies/${id}`);
  });
}



// DELETE
function deleteMovie(req, res, next) {
  movieService.deleteMovie(req.params.id, (err, success) => {
    if (err) return next(err);
    if (!success) return res.status(404).json({ message: "Movie not found" });
    res.redirect(`/movies`); // redirect naar de nieuwe film
  });
}

// GET create movie form
function showCreateMovie(req, res, next) {
  res.render('movies/form', { 
    movie: null,
    title: 'Create New Movie'
  });
}


function showEditMovie(req, res, next) {
  movieService.getMovieById(req.params.id, function (err, movie) {
    if (err) return next(err);
    if (!movie) return res.status(404).send('Movie not found');
    res.render('movies/form', { movie });
  });
}

module.exports = {  
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  showCreateMovie,
  showEditMovie
};
