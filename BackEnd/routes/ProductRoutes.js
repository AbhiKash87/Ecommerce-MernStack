const express = require('express');
const { createProduct, fetchAllProducts, fetchProductById, updateProductByID } = require('../Controller/ProductController');

const ProductRouter = express.Router();

ProductRouter.post('/',createProduct);
ProductRouter.get('/',fetchAllProducts);
ProductRouter.get('/:id',fetchProductById);
ProductRouter.patch('/:id',updateProductByID);

exports.router = ProductRouter;