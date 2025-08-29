const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type: String
    },
    desc: {
        type: String
    },
    category:{
        type: String
    },
    pimg:{
        type: String
    },
    price:{
        type: Number,
    },
    stock: {
        type: Number
    }
},{timestamps: true})

module.exports = mongoose.model('Product',productSchema)