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



module.exports = {
  getAllMovies,
  getMovieById,
};