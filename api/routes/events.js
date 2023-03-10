const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Event = require("../controllers/events");
const { events } = require("../models/event");

//Getting all events
router.get("/events", Event.getAll);

//Get One Event
router.get("/events/:eventId", Event.getOne);

//Get event by City
router.get("/events/location/:eventLocation", Event.getByCity);

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