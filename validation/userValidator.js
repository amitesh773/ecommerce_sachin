const Joi = require('joi');

const userValidator = Joi.object({
    username: Joi.string()
        .min(5)
        .max(30)
        .trim()
        .required()
        .messages({
            'string.empty': 'Username is required',
            'string.min': 'Username must be at least 5 characters',
            'string.max': 'Username must be at most 30 characters'
        }),

    email: Joi.string()
        .email()
        .trim()
        .required()
        .messages({
            'string.email': 'Please enter a valid email address',
            'string.empty': 'Email is required'
        }),

    password: Joi.string()
        .min(8)
        .pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$'))
        .required()
        .messages({
            'string.pattern.base': 'Password must include at least one letter, one number, and one special character',
            'string.min': 'Password must be at least 8 characters long',
            'string.empty': 'Password is required'
        }),

    role: Joi.string()
        .valid('user', 'admin')
        .default('user')
        .messages({
            'any.only': 'Role must be one of user, admin.'
        })
});

module.exports = userValidator;
