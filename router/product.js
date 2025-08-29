const express = require('express')
const router = express.Router();
const authenticate = require('../middleware/Authentication')
//-----------------------------------cloudinary----------------------------
const multer = require('multer');
const {storage} = require('../config/cloudinary')
const upload = multer({storage})
//-----------------------------------------requiremets-------------------------
const{AllProduct, cereateProduct, SingleProduct, deleteProduct, updateProduct} =  require('../controller/productController')

router.post('/',authenticate,upload.single('pimg'),cereateProduct)

router.get('/',AllProduct)

router.get('/:id',SingleProduct)

router.delete('/:id',authenticate,deleteProduct)

router.put('/:id',authenticate,upload.single('pimg'),updateProduct)


module.exports = router;