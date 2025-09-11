const express = require('express');
const router = express.Router();
const movieController = require("../controllers/movie.controller")

/* GET home page. */
router.get("/", movieController.getAllMovies);
router.get("/:id", movieController.getMovieById);

// show edit page
// router.get("/:id/edit", movieController.showEditMovie);
// // update action
// router.post("/:id/edit", movieController.updateMovie);

module.exports = router;
