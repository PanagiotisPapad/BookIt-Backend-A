const express = require("express");
const { default: mongoose } = require("mongoose");
const event = require("../models/event");
const router = express.Router();
const Event = require("../models/event");


//Getting all events
router.get("/", (req, res) => {
    Event.find()
         .then(docs => {
            console.log(docs)
            res.status(200).json(docs)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
});

//Creating new events
router.post("/", (req, res) => {
    const event = new Event({
        _id: new mongoose.Types.ObjectId(),
        eventTitle: req.body.eventTitle,
        eventDate: req.body.eventDate,
        eventPrice: req.body.eventPrice,
        eventLocation: req.body.eventLocation
    })
    event
        .save()
        .then(result => {
        console.log(result);
    })
        .catch(err => console.log(err));
    res.status(201).json({ 
        message: "Handling POST request to /events",
        createdEvent: event
    });       
});

//Getting one event
router.get("/:eventId", (req, res) => {
    const eventId = req.params.eventId;
    Event.findById(eventId)
         .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err => console.log(err));
        res.status(500).json({err: err});
});

//Update events in database
router.patch("/:eventId", (req, res) => {
    res.status(200).json ({
        message: "Updated event"
    });
});

//Delete events in database
router.delete("/:eventId", (req, res) => {
    res.status(200).json ({
        message: "Deleted event"
    });
});

module.exports = router; 