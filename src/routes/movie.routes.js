const express = require('express');
const router = express.Router();
const movieController = require("../controllers/movie.controller")

/* GET home page. */
router.get("/", movieController.getAllMovies);
//router.get("/create", movieController.showCreateMovie);
router.post("/create", movieController.createMovie);
router.get("/:id", movieController.getMovieById);
//router.get("/:id/edit", movieController.showEditMovie);
router.post("/:id/edit", movieController.updateMovie);
router.post("/:id/delete", movieController.deleteMovie);


module.exports = router;
