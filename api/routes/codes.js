const express = require("express");
const mongoose = require("mongoose");

const codeSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 

    codeName: {
        type: String, 
        required: true
    }, 

    codeStartingDate: {
        type: Date, 
        required: true
    }, 
    codeExpireDate: {
        type: Date, 
        required: true
    }
})