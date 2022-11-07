const mongoose = require('mongoose');
require('../model/movieModel');

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", function() {
    console.log("Mongoose connected to " + process.env.DB_URL);
});

mongoose.connection.on("error", function(err) {
    console.log("Mongoose connection error: " + err.message);
});

process.on("SIGINT", function() {
    mongoose.connection.close(function() {
        console.log(process.env.SIGINT_MESSAGE);
        process.exit(process.ev.EXIT);
    });
});

process.on("SIGTERM", function() {
    mongoose.connection.close(function() {
        console.log(process.env.SIGTERM);
        process.exit(process.ev.EXIT);
    });
});

process.once("SIGUSR2", function() {
    mongoose.connection.close(function() {
        console.log(process.env.SIGUSR2_MESSAGE);
        process.kill(process.pid, "SIGUSR2");
    });
});