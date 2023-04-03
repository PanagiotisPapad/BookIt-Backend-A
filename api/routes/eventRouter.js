const express = require("express");
const mongoose = require("mongoose");
const eventsRouter = express.Router();
const Event = require("../controllers/events");

const { events } = require("../models/event");

//Getting all events
eventsRouter.get("/events", Event.getAll);

//Getting all events with a given substring
eventsRouter.get("/events/search/:substring", Event.getSub);

//Get One Event
eventsRouter.get("/events/:eventId", Event.getOne);

//Get event by City
eventsRouter.get("/events/category/:eventCategory", Event.getByCategory);

//AUTOCOMPLETE SEARCHBAR - CITIES
//Get all distinct cities in database
eventsRouter.get("/cities", Event.getCities);

//CALENDAR
//Receive int:year and int:month and return all the events in that year,month
eventsRouter.get("/events/calendarmonth/:year/:month", Event.getCalendarMonth)

//Receive int:year, int:month and int:day return all the events in that year,month,day
eventsRouter.get("/events/calendarday/:year/:month/:day", Event.getCalendarDay)

//Create new event
eventsRouter.post("/events", Event.create);

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