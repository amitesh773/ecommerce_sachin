//--------------------------------Express----------------------------------
const express = require('express');
const app = express();
//-----------------------------------ENV------------------------------------
require('dotenv').config();
//----------------------------------Data Parsing----------------------------
app.use(express.json());
app.use(express.urlencoded({extended: true}))
//---------------------------------DATA BASE CONNECTION----------------------
const mongoConnection = require('./config/db')
mongoConnection().then(()=>{console.log("Database Connected......!!!!")})

//---------------------------------Models---------------------------------
const Product = require('./models/Product')

//--------------------------------Validators------------------------------
const productValidation = require('./validation/productValidation')
//--------------------------------Middleware------------------------------
const authenticate = require('./middleware/Authentication')

//-------------------------------Cloudinary File Handler-------------------
const multer = require('multer');
const {storage} = require('./config/cloudinary')
const upload = multer({storage})

//--------------------------APIs------------------------------------------
//------Auth Route----
const authRoute = require('./router/authRoute');
const productRoute =require('./router/product')
app.use('/api/auth', authRoute)
app.use('/api/product', productRoute)




app.listen(process.env.PORT,()=>{
   console.log("Server is runing......",process.env.PORT)
})