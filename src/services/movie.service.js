const express = require('express');
const router = express.Router();
const movieDAO = require('../dao/movie.dao');

function getAllMovies(callback) {
  movieDAO.getAllMovies(function (err, movies) {
    if (err) return callback(err);
    callback(null, movies);
  });
}

module.exports = { getAllMovies };
