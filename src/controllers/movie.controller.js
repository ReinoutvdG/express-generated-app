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
  logger.debug(`Controller: getMovieById called with id=${req.params.id}`);

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
    res.status(201).json(newMovie);
  });
}


// UPDATE
function updateMovie(req, res, next) {
  movieService.updateMovie(req.params.id, req.body, (err, updatedMovie) => {
    if (err) return next(err);
    if (!updatedMovie) return res.status(404).json({ message: "Movie not found" });
    res.json(updatedMovie);
  });
}


// DELETE
function deleteMovie(req, res, next) {
  movieService.deleteMovie(req.params.id, (err, success) => {
    if (err) return next(err);
    if (!success) return res.status(404).json({ message: "Movie not found" });
    res.json({ message: "Movie deleted" });
  });
}


module.exports = {  
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
};
