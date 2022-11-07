const mongoose = require("mongoose");
const Movie = require("../model/movieModel");



//const movie = new Movie();
const getAll = function(req, res) {
    let offset = parseInt(process.env.DEFAULT_FIND_OFFSET, 10);
    let count = parseInt(process.env.DEFAULT_FIND_COUNT, 10); //10;
    const maxCount = parseInt(process.env.DEFAULT_FIND_MAX_FIND_LIMIT, 10); //10;

    if (isNaN(offset) || isNaN(count)) {
        res
            .status(process.env.BAD_REQUEST_STATUS_CODE)
            .json({ message: "QueryString offset and count must be numbers" });
        return;
    }

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 20);
    }
    if (req.query && req.query.count) {
        offset = parseInt(req.query.count, 20);
    }

    if (count > maxCount) {
        res.status(process.env.BAD_REQUEST_STATUS_CODE).json({ message: "Cannot exceed count of " + maxCount });
        return;
    }

    Movie.find()
        .skip(offset)
        .limit(count)
        .exec(function(err, movies) {
            if (err) {
                console.log("Error finding games");
                res.status(process.env.INTERNAL_ERROR_STATUS_CODE).json(err);
            } else {
                console.log("Found movies ", movies.length);
                res.json(movies);
            }
        });
};

const addOne = function(req, res) {
    console.log("Movie AddOne request");
    const newMovie = {
        title: req.body.title,
        year: req.body.year,
        marshalArt: req.body.marshalArt,
        artists: req.body.artists,
    };
    Movie.create(newMovie, function(err, data) {
        const response = { status: process.env, message: data };
        if (err) {
            console.log("Error creating movie");
            response.status = process.env.INTERNAL_ERROR_STATUS_CODE;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    });
};

const getOne = function(req, res) {
    console.log("GET One Movie Controller");
    const movieId = req.params.movieId;
    Movie.findById(movieId).exec(function(err, data) {
        const response = {
            status: 200,
            message: data,
        };
        if (err) {
            console.log("Error finding movie");
            res.status(process.env.INTERNAL_ERROR_STATUS_CODE).json(err);
        } else if (!data) {
            console.log("Movie id not found");
            res.status(process.env.RESOURCE_NOT_FOUND_STATUS_CODE).json({ message: "Movie ID not found" });
        } else {
            console.log("Found movie ", data);
            res.status(response.status).json(response.message);
        }
    });
};

const deleteMovie = function(req, res) {
    const movieId = req.params.movieId;
    Movie.findByIdAndDelete(movieId).exec(function(err, deletedMovie) {
        const response = { status: 204, message: deletedMovie };
        if (err) {
            console.log("Error finding movie to delete ");
            response.status = process.env.INTERNAL_ERROR_STATUS_CODE;
            response.message = err;
        } else if (!deleteMovie) {
            console.log("Movie not found");
            response.status = process.env.RESOURCE_NOT_FOUND_STATUS_CODE;
            response.message = {
                message: "Movie with ID not found",
            };
        }
        res.status(response.status).json(response.message);
    });
};

const fullUpdateOne = function(req, res) {

    const movieId = req.params.movieId;

    Movie.findByIdAndUpdate(movieId, req.body).exec(function(err, updatedMovie) {
        const response = { status: 204, message: updatedMovie };
        if (err) {
            console.log("Error finding movie to update ");
            response.status = process.env.RESOURCE_NOT_FOUND_STATUS_CODE;
            response.message = err.message;
        } else if (!updatedMovie) {
            console.log("Movie not found");
            response.status = process.env.RESOURCE_NOT_FOUND_STATUS_CODE;
            response.message = {
                message: "Movie with ID not found",
            };
        } else { res.status(response.status).json(response.message); }

    });
};

module.exports = { getAll, getOne, addOne, deleteMovie, fullUpdateOne };