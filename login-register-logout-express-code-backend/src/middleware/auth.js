// const jwt =require("jsonwebtoken");
const { Error } = require("mongoose");
const signupmodel=require("../model/signup");
//imported modules in express
var cookieParser = require('cookie-parser')
require('dotenv').config();
const { Console } = require('console');
const { ADDRGETNETWORKPARAMS } = require('dns');
const { urlencoded } = require('express');
const express = require('express');
const { appendFile } = require('fs');
const route = express.Router();
const path = require('path');
const { findOne } = require('../model/loginform');
require('../dbs/connectdbs')
const modelsignup = require('../model/signup');
const jwt=require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const signupmodel = require('../model/signup');


   
const auth=async(req,res,next) => {
    try {
        
        const token=req.cookies.jwtlogin;
        const  verifyuser=jwt.verify(token,process.env.SECRET_KEY)
        const user= await signupmodel.findOne({_id:verifyuser._id})
          req.token=token;
          req.user=user;
            next();

        console.log(user);


    } catch (error) {
        
        res.status(401).send(error)
    }

}
module.exports = auth;