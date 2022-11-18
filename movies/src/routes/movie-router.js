const express = require("express");
const movieController = require("../../src/controllers/movieController");
const artistsController = require("../controllers/artistsController");
const router = express.Router();

router
    .route("/movies/")
    .get(movieController.getAll)
    .post(movieController.addOne);

router
    .route("/movies/:movieId")
    .get(movieController.getOne)
    .put(movieController.fullUpdateOne)
    .patch(movieController.partialUpdateOne)
    .post(movieController.addOne)
    .delete(movieController.deleteMovie);

router
    .route("/movies/:movieId/artists")
    .get(artistsController.getArtists)
    .post(artistsController.addArtist);

router
    .route("/movies/:movieId/artists/:artistId")
    .get(artistsController.getOneArtist)
    .delete(artistsController.deleteOneArtist);
/*.p(movieController.fullUpdateOneArtists)
.patch(movieController.partialUpdateOneArtists)
.delete(movieController.deleteArtist);*/

module.exports = router;