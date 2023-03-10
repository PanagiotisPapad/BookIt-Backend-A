//Testing our test branch

const express = require("express");
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    eventTitle: {
        type: String,
        required: true
    },

    eventLocation: {
        type: String,
        require: true
    },

    eventDate: {
        type: Date,
        required: true
    },
    eventPrice: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    eventDescription: {
        type: String,
        required: true
    },
    eventCategory: {
        type: String,
        required: true
    },
    totalTickets: {
        type: Number,
        required: true
    },
    ticketsSold: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Event", eventSchema, "EventsCollection");