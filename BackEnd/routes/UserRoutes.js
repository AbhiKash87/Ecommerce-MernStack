const express = require('express');
const { fetchUserByID, updateUserByID } = require('../Controller/UserController');

const userRouter = express.Router();

userRouter.get('/own',fetchUserByID);
userRouter.patch('/update',updateUserByID);




exports.router = userRouter;