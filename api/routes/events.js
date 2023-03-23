const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Event = require("../controllers/events");
const { events } = require("../models/event");

//Getting all events
router.get("/events", Event.getAll);

//Getting all events with a given substring
router.get("/events/search/:substring", Event.getSub);

//Get One Event
router.get("/events/:eventId", Event.getOne);

//Get event by City
router.get("/events/category/:eventCategory", Event.getByCategory);

//NEW FEATURE
//Get all distinct cities in database
router.get("/cities", Event.getCities);

//Create new event
router.post("/events", Event.create);

//Update an event
router.patch("/events/:eventId", Event.update);

/*
Format to update an event: 
[
    {
     "propName": "eventTitle", "value": "Το καλό εβεντ" ,
    }
]
*/

//Delete an event
router.delete("/events/:eventId", Event.delete);

module.exports = router; 