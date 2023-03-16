const Event = require("../models/event");
const mongoose = require("mongoose");

//Controller to get all events
exports.getAll = (req, res) => {
    Event.find()
        .then(docs => {
            const response = {
                count: "Total amount of events uploaded is now " + docs.length,
                events: docs.map(doc => {
                    return {
                        _id: doc._id,
                        eventTitle: doc.eventTitle,
                        eventLocation: doc.eventLocation,
                        eventDate: doc.eventDate,
                        eventPrice: doc.eventPrice,
                        imageUrl: doc.imageUrl,
                        eventDescription: doc.eventDescription,
                        eventCategory: doc.eventCategory,
                        totalTickets: doc.totalTickets,
                        ticketsSold: doc.ticketsSold,
                        request: {
                            type: "GET",
                            description: "Get the url for this specific event",
                            url: "http://localhost:3000/events/" + doc._id
                        }
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                error: err
            });
        });
};

//Getting all events with a given substring
exports.getSub = (async (req, res) => {
    const { substring } = req.params;
  
    // Definition of pipeline aggregation 
    const pipeline = [
      {
        $match: { $or:[
          { eventLocation: { $regex: substring, $options: "i" } },
          { eventTitle: { $regex: substring, $options: "i" } }],
        },
      },
    ];
    try {
      // Aggregation launch and return results
      const result = await Event.aggregate(pipeline);
      
      if (result.length === 0) {
        res.status(404).send("Δεν βρέθηκαν αποτελέσματα")
      }else {
        res.json(result);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal server error");
    }
  });

//Controller to get one event
exports.getOne = (req, res) => {
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
};

exports.getByCategory = (req, res) => {
    const category = req.params.eventCategory;
    Event.find({eventCategory: category})
        .exec()
        .then(events => {
            console.log(events);
            if (events) {
                res.status(200).json(events)
            } else {
                res.status(404).json({
                    message: "Error 404 / Event category not found " + eventLocation
                });
            };
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Invalid event category Error 500"
            });
        });
}
 
//Controller to create new event
exports.create = (req, res) => {
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
        message: "Created a new event succesfully",
        createdEvent: event
    });
};

//Controller to Update an event
exports.update = (req, res) => {
    const id = req.params.eventId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Event.findOneAndUpdate({ _id: id }, { $set: updateOps })
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
                    message: "Event updated succesfully!",
                    request: {
                        type: "GET",
                        description: "Get the updated event",
                        url: "http://localhost:3000/events/" + id
                    }
                });
            };

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                err: err
            });
        });
};

//Controller to delete an event
exports.delete = (req, res) => {
    const id = req.params.eventId;
    Event.findOneAndRemove({ _id: id })
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
};