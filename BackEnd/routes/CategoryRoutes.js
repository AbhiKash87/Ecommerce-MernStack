const express = require('express');
const { createCategory, fetchAllCategory } = require('../Controller/CategoryController');

const categoryRouter = express.Router();

categoryRouter.post('/',createCategory);
categoryRouter.get('/',fetchAllCategory);

exports.router = categoryRouter;