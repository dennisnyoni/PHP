require('dotenv').config();

const express = require('express');

require('./src/db/dbConnect.js');
const path = require('path');
const movieRouter = require('./src/routes/movie-router');
const app = express();

app.use(express.json())
app.use(express.static(path.join(__dirname, 'src/public')));
app.use(express.urlencoded({ extended: false }));

app.use("/api", movieRouter);

app.listen(process.env.PORT, () => {
    console.log(process.env.START_MESSAGE, process.env.PORT);
});