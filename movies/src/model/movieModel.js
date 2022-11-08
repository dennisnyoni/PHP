const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    title: { type: String, required: true },
    year: { type: Number, required: true },
    marshalArt: { type: String, required: true },
    artists: [{
        name: { type: String, required: true },
        yearStartedActing: { type: Number, required: true },
    }, ],
});

//const Movie = mongoose.model(process.env.MOVIE_MODEL, movieSchema, "marshal_art");
const Movie = mongoose.model("Movie", movieSchema)


module.exports = Movie;