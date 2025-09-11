const express = require('express');
const router = express.Router();
const movieDAO = require('../dao/movie.dao');

function getAllMovies(callback) {
  movieDAO.getAllMovies(function (err, movies) {
    if (err) return callback(err);
    callback(null, movies);
  });
}

  function getMovieById(id, callback) {
  movieDAO.getMovieById(id, callback);
}

function showEditMovie(req, res, next) {
  // render edit form
  res.render('movies/edit', {
    title: 'Edit Movie',
    movieId: req.params.id
  });
}

function updateMovie(req, res, next) {
  // hier logica om de film te updaten
  res.redirect('/movies/' + req.params.id);
}


module.exports = {
  getAllMovies,
  getMovieById,
  showEditMovie,
  updateMovie,
};