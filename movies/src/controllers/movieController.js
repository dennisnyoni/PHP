//const { body, validationResult } = require('express-validator');
//const { response } = require("express");
//const mongoose = require("mongoose");
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
        count = parseInt(req.query.count, 20);
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
        .then(movies=>{
        console.log("Found movies ", movies.length);
        res.status(process.env.OK_STATUS_CODE).json(movies);
    }).catch(err=>{
        console.log("Error finding games");
        res.status(process.env.INTERNAL_ERROR_STATUS_CODE).json(err);
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
    //const response = { status: process.env.CREATED_STATUS_CODE, message: "data" };
    Movie.create(newMovie).then(data=>{
        res.status(parseInt(process.env.OK_STATUS_CODE)).json(data);
    }).catch(err=>{
        res.status(parseInt(process.env.BAD_REQUEST_STATUS_CODE)).json(err);
    });
};

const getOne = function(req, res) {
    console.log("GET One Movie Controller");
    const movieId = req.params.movieId;

    Movie.findById(movieId).then(data=>{
        if(!data){
            res.status(process.env.RESOURCE_NOT_FOUND_STATUS_CODE).json(data);
        }else{
            res.status(process.env.OK_STATUS_CODE).json(data);
        }
    }).catch(err=>{
        res.status(process.env.BAD_REQUEST_STATUS_CODE).json(err);
    });
};

const deleteMovie = function(req, res) {
    const movieId = req.params.movieId;
    Movie.findByIdAndDelete(movieId).then(deleteMovie=>{
        if(!deleteMovie){
            res.status(process.env.RESOURCE_NOT_FOUND_STATUS_CODE).json({message:"Movie not found"});
        }else{
            res.status(process.env.OK_STATUS_CODE).json(deleteMovie);
        }
    }).catch(err=>{
        res.status(process.env.BAD_REQUEST_STATUS_CODE).json(err);
    });
};
//updating movie code
const _save = function ( req,res,response, updatedMovie){
    updatedMovie.save().then(updatedMovie=>{
        if (!updatedMovie){
            res.status(process.env.RESOURCE_NOT_FOUND_STATUS_CODE).json(updatedMovie);
        }else{
            res.status(process.env.OK_STATUS_CODE).json(updatedMovie);
        }
    }).catch(err=>{
        res.status(process.env.BAD_REQUEST_STATUS_CODE).json(err);
    });
}

const _partialUpdate = function(req, res, response, updatedMovie) {
    if (req.body.title)
        updatedMovie.title = req.body.title;
    if (req.body.year)
        updatedMovie.year = req.body.year;
    if (req.body.marshalArt)
        updatedMovie.marshalArt = req.body.marshalArt;
    //updatedMovie.artists = req.body.artists;
    _save(req,res,response, updatedMovie);
}

const _fullUpdate = function(req, res, response, updatedMovie) {
    updatedMovie.title = req.body.title;
    updatedMovie.year = req.body.year;
    updatedMovie.marshalArt = req.body.marshalArt;
    _save(req,res,response, updatedMovie);
}
//seperate duplicate code. to be called locally
const _update = function(req, res, updateCallback) {
    let response = {
        status: 204,
        message: ""
    }
    console.log("Full update one");
    let movieId = req.params.movieId;
    Movie.findById(movieId).then(updatedMovie=>{
        if(!updatedMovie){
            res.status(process.env.RESOURCE_NOT_FOUND_STATUS_CODE).json(updatedMovie);
        }else{
            res.status(process.env.OK_STATUS_CODE).json(updatedMovie);
        }
    }).catch(err=>{
        res.status(process.env.BAD_REQUEST_STATUS_CODE).json(err);
    });
}

const partialUpdateOne = function(req, res) {
    _update(req, res, _partialUpdate);
};

const fullUpdateOne = function(req, res) {
    _update(req, res, _fullUpdate);
};

module.exports = { getAll, getOne, addOne, deleteMovie, fullUpdateOne, partialUpdateOne};//,addArtist };