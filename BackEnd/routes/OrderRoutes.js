const express = require('express');
const { fetchOrdersByUser, updateOrderByid, createOrder, deleteOrderById, fetchAllOrders } = require('../Controller/OrderController');



const OrderRouter = express.Router();


OrderRouter.get('/user',fetchOrdersByUser);
OrderRouter.get('/admin',fetchAllOrders);
OrderRouter.post('/',createOrder);

OrderRouter.patch('/:id',updateOrderByid);
OrderRouter.delete('/:id',deleteOrderById);

exports.router = OrderRouter;