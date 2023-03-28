const express = require("express");
const mongoose = require("mongoose");
const eventsRouter = express.Router();
const Event = require("../controllers/events");
const checkAuth = require("../middleware/check-auth");

const { events } = require("../models/event");

//Getting all events
eventsRouter.get("/events",  Event.getAll);

//Getting all events with a given substring
eventsRouter.get("/events/search/:substring", Event.getSub);

//Get One Event
eventsRouter.get("/events/:eventId", Event.getOne);

//Get event by City
eventsRouter.get("/events/category/:eventCategory", Event.getByCategory);

//NEW FEATURE
//Get all distinct cities in database
eventsRouter.get("/cities", Event.getCities);

//Create new event
eventsRouter.post("/events", checkAuth, Event.create);

//Update an event
eventsRouter.patch("/events/:eventId", Event.update);

/*
Format to update an event: 
[
    {
     "propName": "eventTitle", "value": "Το καλό εβεντ" ,
    }
]
*/

//Delete an event
eventsRouter.delete("/events/:eventId", Event.delete);


module.exports = eventsRouter; 