const express = require("express");
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    
    eventTitle: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    eventPrice: {
        type: Number,
        required: true
    },
    eventLocation: {
        type: String,
        require: true
    },
    
});

module.exports = mongoose.model("Event", eventSchema)