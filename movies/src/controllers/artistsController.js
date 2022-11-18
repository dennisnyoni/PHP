
const Movie =require("../model/movieModel");

module.exports.getArtists = function (req,res){
    let offset = parseInt(process.env.DEFAULT_FIND_OFFSET,10);
    let count = parseInt(process.env.DEFAULT_FIND_COUNT,10);
    const maxCount = parseInt(process.env.DEFAULT_FIND_MAX_FIND_LIMIT,10)

    if(isNaN(offset)||isNaN(count)||isNaN(maxCount)){
        res.
            status(process.env.BAD_REQUEST_STATUS_CODE)
            .json({message:"Query string offset and count must be numbers"});
        return;
    }

    if(req.query&&req.query.offset){
        offset= req.query.offset;
    }
    if (req.query&&req.query.count){
        count = req.query.count;
    }
    if (count>maxCount){
        res.status(process.env.BAD_REQUEST_STATUS_CODE)
            .json({message:"count cannot exceed count of "+process.env.DEFAULT_FIND_MAX_FIND_LIMIT});
    }

    const movieId = req.params.movieId;

    Movie.findById(movieId).then(movie=>{
        if (!movie) {
            console.log("Movie not found");
            res.status(process.env.RESOURCE_NOT_FOUND_STATUS_CODE).json({message: "movie not found"});
        }else{
            res.status(response.status).json(response.message.artists)
        }
    }).catch(err=>{
        res.status(parseInt(process.env.BAD_REQUEST_STATUS_CODE)).json(err);
    });
}

module.exports.addArtist = function (req,res){
    const movieId = req.params.movieId;
    const artist={
        name:req.body.name,
        yearStartedActing:req.body.yearStartedActing
    }
console.log("movie Id: ",movieId);
    Movie.findById(movieId).then(movie=>{
        if(!movie){
            res.status(process.env.RESOURCE_NOT_FOUND_STATUS_CODE).json({message:"Movie not found"});
        }else{
            movie.artists.push(artist);
            movie.save();
            res.status(process.env.OK_STATUS_CODE).json(artist);
        }
    }).catch(err=>{
        res.status(process.env.BAD_REQUEST_STATUS_CODE).json(err);
    });
}

module.exports.getOneArtist = function (req,res){
    const movieId = req.params.movieId;
    const artistId = req.params.artistId;
    console.log("artist id: ",artistId);
    console.log("movie id: ",movieId);
    Movie.findById(movieId).then(movie=>{
        if(!movie){
            res.status(process.env.RESOURCE_NOT_FOUND_STATUS_CODE).json({message:"movie not found"});
        }else if (!movie.artists){
            res.status(process.env.RESOURCE_NOT_FOUND_STATUS_CODE).json({message:"Movie hs no artists"})
        }else{
           let artist = movie.artists.filter(artist=>artist._id==artistId)[0];
            res.status(process.env.OK_STATUS_CODE).json(artist);
        }
    }).catch(err=>{
        res.status(process.env.BAD_REQUEST_STATUS_CODE).json(err);
    });
}

module.exports.deleteOneArtist = function (req,res){

    const movieId = req.params.movieId;
    const artistId = req.params.artistId;
    console.log("artist id: ",artistId);
    console.log("movie id: ",movieId);
    Movie.findById(movieId).exec((error, movie)=>{
        const response = {
            status:200,
            message:movie
        }
        if(error){
            res.status(process.env.BAD_REQUEST_STATUS_CODE).json(error);
        }else if(!movie){
            res.status(process.env.RESOURCE_NOT_FOUND_STATUS_CODE).json(movie);
        }
        else if (!movie.artists){
            res.status(process.env.RESOURCE_NOT_FOUND_STATUS_CODE).json({message:"no artists found"});
        }
        else if (movie.artists){
           let  artist = movie.artists.filter(artist=>artist._id==artistId)[0];
            if (!artist){
               res.status(process.env.RESOURCE_NOT_FOUND_STATUS_CODE).json({message:"artist not found"});
            }

            console.log("index of ",artist," is: ",myArtists.indexOf(artist));
            movie.artists.splice(movie.artists.indexOf(artist),1);
            movie.save();
            res.status(response.status).json(movie);
        }

    })
}