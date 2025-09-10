const express = require('express');
const router = express.Router();
const movieController = require("../controllers/movie.controller")

/* GET home page. */
router.get("/", movieController.getAllMovies);

module.exports = router;
