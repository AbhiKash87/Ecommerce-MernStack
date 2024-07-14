const express = require('express');
const { loginUser, checkUser, Signup } = require('../Controller/AuthController');
const EnsureAuthenticated = require('../Middlewares/Ensureauthenticated')

const authRouter = express.Router();

authRouter.post('/signup',Signup);
authRouter.post('/login',loginUser);
authRouter.get('/checkuser',EnsureAuthenticated(),checkUser);


exports.router = authRouter;