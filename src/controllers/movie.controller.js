const express = require('express');
const router = express.Router();
const movieService = require('../services/movie.service');

function getAllMovies(req, res, next) {
  movieService.getAllMovies(function (err, movies) {
    if (err) return next(err);

    // Render een view, of stuur JSON
    res.render('movies/index', {
      title: 'All Movies',
      movies: movies
    });
  });
}

module.exports = { getAllMovies };
