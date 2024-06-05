const { getAll, create, getOne, remove, update } = require('../controllers/booking.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const bookingRoute = express.Router();

bookingRoute.route('/booking')
    .get(verifyJWT, getAll)
    .post(verifyJWT, create);

bookingRoute.route('/booking/:id')
    .get(verifyJWT, getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = bookingRoute;