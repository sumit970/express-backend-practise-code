require('dotenv').config();
var cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
const port = 5400;
const path= require('path');
var modell=require("./src/model/loginform")
const route= require("./src/routers/route")
require("./src/dbs/connectdbs")
app.use(route);





app.listen(port, () => {
  console.log(` sumit your  app is listening on port ${port} `)
})

// const secretkey=process.env.SECRET_KEY;
// console.log(secretkey);




