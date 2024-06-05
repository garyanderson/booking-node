const { getAll, create, getOne, remove, update } = require('../controllers/hotel.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const hotelRoute = express.Router();

hotelRoute.route('/hotels')
    .get(getAll)
    .post(verifyJWT, create);

hotelRoute.route('/hotels/:id')
    .get(getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = hotelRoute;