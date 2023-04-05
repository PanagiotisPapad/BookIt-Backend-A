const express = require("express");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        require: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },

    orderHistory: {
        type: Array,
        default:[],
        required: true
    }, 
    
    userState: {
        type: String, 
        default: "user",
        //For administrators set "userState": "admin" 
        required: true
    }
});
 
module.exports = mongoose.model("User", userSchema, "UsersCollection");