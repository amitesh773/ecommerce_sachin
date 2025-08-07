//--------------------------------Express----------------------------------
const express = require('express');
const app = express();
require('dotenv').config();

//---------------------------------DATA BASE CONNECTION----------------------
const mongoConnection = require('./config/db')
mongoConnection().then(()=>{console.log("Database Connected......!!!!")})









app.listen(process.env.PORT,()=>{
   console.log("Server is runing......",process.env.PORT)
})