
const express = require('express');
const booksController = require('../controllers/usersController');

const router = express.Router();



router.route('/users')
    //   .get(booksController.getOne)
    //   .patch(booksController.partialUpdate)
    //   .delete(booksController.deleteOne);



module.exports = router;