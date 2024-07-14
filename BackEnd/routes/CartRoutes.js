const express = require('express');
const { addToCart, fetchCartByUser, deleteCartById, updateCartById } = require('../Controller/CartController');


const CartRouter = express.Router();

CartRouter.post('/',addToCart);
CartRouter.get('/',fetchCartByUser);
CartRouter.delete('/:id',deleteCartById);
CartRouter.patch('/:id',updateCartById);

exports.router = CartRouter;