const express = require('express');
const router = express.Router();
const movieController = require("../controllers/movie.controller")
const ensureAuthenticated = require("../middleware/auth.middleware");

/* GET home page. */
router.get("/", ensureAuthenticated, movieController.getAllMovies);
router.get("/create", ensureAuthenticated, movieController.showCreateMovie);
router.post("/create", ensureAuthenticated, movieController.createMovie);
router.get("/:id", ensureAuthenticated, movieController.getMovieById);
router.get("/:id/edit", ensureAuthenticated, movieController.showEditMovie);
router.post("/:id/edit", ensureAuthenticated, movieController.updateMovie);
router.post("/:id/delete", ensureAuthenticated, movieController.deleteMovie);


module.exports = router;
