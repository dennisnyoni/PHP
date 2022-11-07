const mongoose = require("mongoose");
//const { stringify } = require("querystring");

const movieSchema = mongoose.Schema({
    title: { type: String, required: true },
    year: { type: Number, required: true },
    marshalArt: { type: String, required: true },
    artists: [{
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        yearStartedActing: { type: Number, required: true },
    }, ],
});

//mongoose.model(process.env.MOVIE_MODEL, movieSchema, "movies");
const Movie = mongoose.model("Movie", movieSchema)


module.exports = Movie;