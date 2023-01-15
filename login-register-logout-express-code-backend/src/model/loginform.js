const mongoose = require('mongoose');
// const validator = require('validator');
const jwt = require('jsonwebtoken');

const loginschema = new mongoose.Schema({
    userid: {
        type: String,
        required: true
        // minLength:6,
        
    },
    password: {
        type: String,
        required: true,
        unique: true
        // minLength:8,


    },
});


const modellogin = mongoose.model("modellogin", loginschema);

module.exports = modellogin;
