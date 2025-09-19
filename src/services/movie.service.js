const express = require('express');
const router = express.Router();
const movieDAO = require('../dao/movie.dao');
const logger = require('../util/logger');


// READ - alle films
function getAllMovies(callback) {
  movieDAO.getAllMovies(function (err, movies) {
    if (err) return callback(err);
    callback(null, movies);
  });
}

// READ - één film
function getMovieById(id, callback) {
  movieDAO.getMovieById(id, callback);
}

// CREATE - nieuwe film
function createMovie(movieData, callback) {
  movieDAO.createMovie(movieData, function (err, newMovie) {
    if (err) return callback(err);
    callback(null, newMovie);
  });
}

// UPDATE - bestaande film
function updateMovie(id, movieData, callback) {
  movieDAO.updateMovie(id, movieData, function (err, updatedMovie) {
    if (err) return callback(err);
    callback(null, updatedMovie);
  });
}

// DELETE - film verwijderen
function deleteMovie(id, callback) {
  movieDAO.deleteMovie(id, function (err, success) {
    if (err) return callback(err);
    callback(null, success);
  });
}

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
};
