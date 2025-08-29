const Product = require('../models/Product')
const productValidation = require('../validation/productValidation')
const mongoose = require('mongoose')

const AllProduct = async(req,res)=>{
   try {
      let productData = await Product.find()
      if(!productData){
         return res.status(400).json({message : 'Product not added yet..!!!'})
      }

      res.status(200).json(productData)
   } catch (err) {
      console.error(err);
      res.status(500).json({message: "Internal server erropr...!!!"})
   }
}

const SingleProduct =async(req, res)=>{
   try {
      let productId = req.params.id;
      if(!mongoose.Types.ObjectId.isValid(productId)){
         return res.status(404).json({message:"Invalid mongoose ID>....!!!"})
      }
   
      let productData =await Product.findById(productId);
      if(!productData){
         return res.status(400).json({message: "Product does not exist...!!!"})
      }

      res.status(200).json(productData);
   } catch (err) {
      console.error(err)
      res.status(500).json({message: "Internal server error...!!!"})
      
   }
}

const cereateProduct = async(req,res)=>{
   try {
      if(req.user.role != 'admin'){
         return res.status(400).json({message: 'Unauthorize Access...!!!!'})
      }

      let {error} = productValidation.validate(req.body);
      if(error){
         return res.status(400).json({message: error.details[0].message})
      }

      if(!req.file){
         return res.status(400).json({message: 'Product Image is required..!!!'})
      }
      
      let {name, desc, category, price, stock} = req.body;

      let data = new Product({
         name,
         desc,
         category,
         price,
         stock,
         pimg: req.file.path
      })

      await data.save();

      res.status(200).json({message: 'Product Added successfully  '})
      
   } catch (err) {
      console.error(err);
      res.status(500).json({message: 'Internal Server Error'})
   }
}

const deleteProduct =async(req,res)=>{
    try {
        if(req.user.role != 'admin'){
            return res.status(400).json({message : "Unotherize Access...!!!"})
        }

       let productId = req.params.id;
       if(!mongoose.Types.ObjectId.isValid(productId)){
         return res.status(400).json({message: 'Invalid id..!!!'})
       }
       
       let productData = await Product.findById(productId)
       if(!productData){
        res.status(400).json({message: "Product Does Not exist...!!!"})
       }

        await Product.findByIdAndDelete(productId)
       res.status(200).json({message: "Product deleted successfully..!!!"})
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Internal server error...!!!"})
    }
}

const updateProduct = async(req,res)=>{
   try {
      let id = req.params.id;

      if(req.user.role != 'admin'){
         return res.status(402).json({message: 'Unauthorize Access...!!!!'})
      }

      if(!mongoose.Types.ObjectId.isValid(id)){
         return res.status(400).json({message: 'Invalid id..!!!'})
      }

      let productData = await Product.findById(id)

      if(!productData){
         return res.status(404).json({message: 'Product does not exist..!!!!'})
      }

      let {error} = productValidation.validate(req.body);
      if(error){
         return res.status(400).json({message: error.details[0].message})
      }

      if(!req.file){
         return res.status(400).json({message: 'Product Image is required'})
      }

      let {name, desc, category, price, stock} = req.body;
      
      let updatedProduct = await Product.findByIdAndUpdate(id,{name, desc, category, price, stock, pimg: req.file.path}, {new : true})

      res.status(200).json({message: 'Product Updated...', updatedProduct})
      
   } catch (err) {
      console.error(err)
      res.status(500).json({message: 'Internal Server Error'})
   }
}

module.exports = {AllProduct, cereateProduct,SingleProduct, deleteProduct, updateProduct}