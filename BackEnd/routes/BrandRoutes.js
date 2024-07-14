const express = require('express');
const { createBrand, fetchAllBrand } = require('../Controller/BrandController');

const brandRouter = express.Router();

brandRouter.post('/',createBrand);
brandRouter.get('/',fetchAllBrand);

exports.router = brandRouter;