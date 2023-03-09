//We are testing out test-branch

const express = require("express");
const { default: mongoose } = require("mongoose");
const event = require("../models/event");
const router = express.Router();
const Event = require("../models/event");


//Getting all events
router.get("/", (req, res) => {
    Event.find()
         .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                error: err
            });
        });
});


//Get One Event
router.get("/:eventId", (req, res, next) => {
    const id = req.params.eventId;
    Event.findById(id)
         .exec()
         .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json(doc)
            } else {
                res.status(404).json({
                    message: "Error 404 / Event not found with id " + id
                });
            };  
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Invalid event Id format Error 500"
            });
        });
});

//Create new event
router.post("/", (req, res) => {
    const event = new Event({
        _id: new mongoose.Types.ObjectId(),
        eventTitle: req.body.eventTitle,
        eventLocation: req.body.eventLocation,
        eventDate: req.body.eventDate,
        eventPrice: req.body.eventPrice,
        imageUrl: req.body.imageUrl,
        eventDescription: req.body.eventDescription,
        eventCategory: req.body.eventCategory,
        totalTickets: req.body.totalTickets,
        ticketsSold: req.body.ticketsSold
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



//Update events in database

//format 
/*
[
    {
     "propName": "eventTitle", "value": "Το καλό εβεντ" ,
    }
]
*/

router.patch("/:eventId", (req, res, next) => {
    const id = req.params.eventId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Event.findOneAndUpdate({_id: id}, {$set: updateOps})
    .exec()
    .then(result => {
        if (!result) {
            console.log(result);
            res.status(404).json({
                message: "Event not found with id" + id
            })
        } else {
            console.log(result);
            res.status(200).json({
                message: "Event updated succesfully!"
            }); 
        };

    })
    .catch(err => { 
        console.log(err);
        res.status(500).json({
            err: err
        });
    });
    

});

//Delete one event
router.delete("/:eventId", (req, res) => {
    const id = req.params.eventId;
    Event.findOneAndRemove({_id: id})
        .exec()
        .then(result => {
            if (!result) {
                res.status(404).json({
                    message: "Event not found with id" + id
                })
            } else {
                res.status(200).json({
                    message: "Event deleted succesfully!"
                }); 
            };
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                err: err
            });
        });
});

module.exports = router; 