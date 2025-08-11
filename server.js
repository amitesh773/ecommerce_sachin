//--------------------------------Express----------------------------------
const express = require('express');
const app = express();
require('dotenv').config();

//----------------------------------Data Parsing----------------------------
app.use(express.json());
app.use(express.urlencoded({extended: true}))
//---------------------------------DATA BASE CONNECTION----------------------
const mongoConnection = require('./config/db')
mongoConnection().then(()=>{console.log("Database Connected......!!!!")})

//---------------------------------Models---------------------------------


//--------------------------------Validators------------------------------


//--------------------------APIs----------------------------
//------Auth Route----
const authRoute = require('./router/authRoute')
app.use('/api/auth', authRoute)

app.listen(process.env.PORT,()=>{
   console.log("Server is runing......",process.env.PORT)
})