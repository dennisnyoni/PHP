const express = require("express");
const movieController = require("../../src/controllers/movieController");
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
    .delete(movieController.deleteMovie);

/*router
    .route("/movies/:movieId/artists/:artistId")
    .get(movieController.getOneArtists)
    .put(movieController.fullUpdateOneArtists)
    .patch(movieController.partialUpdateOneArtists)
    .delete(movieController.deleteArtist);*/

module.exports = router;