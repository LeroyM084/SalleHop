const joi = require('joi');

// This file defines two schemas using JOI for validating user sign-up and login data.

const signUpSchema = joi.object({
    first_name: joi.string().min(2).max(50).required(),
    last_name: joi.string().min(2).max(50).required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).max(100).required(),
})

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).max(100).required(),
})

module.exports = {
    signUpSchema,
    loginSchema
};