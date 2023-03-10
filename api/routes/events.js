const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Event = require("../controllers/events")

//Getting all events
router.get("/", Event.getAll);

//Get One Event
router.get("/:eventId", Event.getOne);

//Get By Attribute
router.get("/", Event.getByAttribute);

//Create new event
router.post("/", Event.create);

//Update an event
router.patch("/:eventId", Event.update);
/*
Format to update an event: 
[
    {
     "propName": "eventTitle", "value": "Το καλό εβεντ" ,
    }
]
*/

//Delete an event
router.delete("/:eventId", Event.delete);

module.exports = router; 