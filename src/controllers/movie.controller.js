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

module.exports = { getAllMovies };
