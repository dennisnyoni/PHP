const { response } = require("express");
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
        res
            .status(process.env.BAD_REQUEST_STATUS_CODE)
            .json({ message: "Cannot exceed count of " + maxCount });
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
        const response = { status: process.env.CREATED_STATUS_CODE, message: data };
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
            status: process.env.OK_STATUS_CODE,
            message: data,
        };
        if (err) {
            console.log("Error finding movie");
            res.status(process.env.INTERNAL_ERROR_STATUS_CODE).json(err);
        } else if (!data) {
            console.log("Movie id not found");
            res
                .status(process.env.RESOURCE_NOT_FOUND_STATUS_CODE)
                .json({ message: "Movie ID not found" });
        } else {
            console.log("Found movie ", data);
            res.status(response.status).json(response.message);
        }
    });
};

const deleteMovie = function(req, res) {
    const movieId = req.params.movieId;
    Movie.findByIdAndDelete(movieId).exec(function(err, deletedMovie) {
        const response = {
            status: process.env.NO_CONTENT_STATUS_CODE,
            message: deletedMovie,
        };
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

const _partialUpdate = function(req, res, response, updatedMovie) {
    if (req.body.title)
        updatedMovie.title = req.body.title;
    if (req.body.year)
        updatedMovie.year = req.body.year;
    if (req.body.marshalArt)
        updatedMovie.marshalArt = req.body.marshalArt;
    //updatedMovie.artists = req.body.artists;

    updatedMovie.save(function(err, updatedMovie) {
        if (err) {
            response.status = 500;
            response.message = err;
            console.log(err);
        } else {
            response.status = 201;
            response.message = updatedMovie;
        }
        res.status(response.status).json(response.message);
    });
}

const _fullUpdate = function(req, res, response, updatedMovie) {
    updatedMovie.title = req.body.title;
    updatedMovie.year = req.body.year;
    updatedMovie.marshalArt = req.body.marshalArt;
    //updatedMovie.artists = req.body.artists;

    updatedMovie.save(function(err, updatedMovie) {
        if (err) {
            response.status = 500;
            response.message = err;
            console.log(err);
        } else {
            response.status = 201;
            response.message = updatedMovie;
        }
        res.status(response.status).json(response.message);
    });
}

const _update = function(req, res, updateCallback) {
    let response = {
        status: 0,
        message: 0
    }

    console.log("Full update one");
    let movieId = req.params.movieId;
    Movie.findById(movieId).exec(function(err, updatedMovie) {
        if (err) {
            response.status = 500;
            response.message = err;
            console.log(err);
        } else {
            updateCallback(req, res, response, updatedMovie);
        }

    });
}

const partialUpdateOne = function(req, res) {
    _update(req, res, _partialUpdate);
};

const fullUpdateOne = function(req, res) {
    _update(req, res, _fullUpdate);
};

module.exports = { getAll, getOne, addOne, deleteMovie, fullUpdateOne, partialUpdateOne };