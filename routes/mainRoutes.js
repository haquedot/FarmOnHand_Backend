const Router=require('express').Router();
const {Login}=require('../controller/userController');
Router.post('/login',Login);

module.exports=Router;