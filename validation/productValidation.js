const Joi = require('joi');

const productValidationSchema = Joi.object({
    name: Joi.string().trim().required(),
    pimg: Joi.string(),
    category: Joi.string().trim().required(),
    desc: Joi.string().trim().required(),
    price: Joi.number().required().min(1),
    stock: Joi.number().required().min(1),
});

module.exports = productValidationSchema;