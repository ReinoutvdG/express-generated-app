const express = require('express');
const router = express.Router();
const movieService = require('../services/movie.service');

function getAllMovies(req, res, next) {
movieService.getAllMovies(function (err, movies) {
  if (err) return next(err);

  res.render('movies/index', {
    title: 'All Movies',
    movies: movies.slice(0, 12) // eerste 12
  });
});
}

function getMovieById(req, res, next) {
  movieService.getMovieById(req.params.id, function (err, movie) {
    if (err) return next(err);
    if (!movie) return res.status(404).send('Movie not found');
    res.render('movies/detail', {
      title: movie.title,
      movie: movie
    });
  });
}



module.exports = { 
  getAllMovies,
  getMovieById,
};
