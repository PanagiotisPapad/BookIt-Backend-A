
const User = require("../models/user");
const Event = require ("../models/event");
const mongoose = require("mongoose");

//Controller to create a new User
//Registration requires that no user already exists with same username and/or email

exports.createUser = async (req,res) => {

  
    try {
        console.log('Checking if item already exists');
        const existingItem = await User.findOne({
            
            $or: [
                {username: req.body.username}, 
                {email: req.body.email}
            ]
        });

        if(existingItem){
            console.log('Item already exists');
            if(existingItem.username === req.body.username && existingItem.email === req.body.email){
                return res.status(409).json({
                    message: "A user with this username and password already exists. Please select another username and password."
                });
            }else if (existingItem.username === req.body.username){
                return res.status(409).json({
                    message: "A user with this username already exists. Please select another username."
                });
            } else {
                return res.status(409).json({
                    message: "A user with this email already exists. Please select another email."
                });
            }
        }

        console.log('Creating new item');
        const user = new User ({
            _id: new mongoose.Types.ObjectId(),
            username: req.body.username,
            password: req.body.password,
            email: req.body.email, 
            orderHistory: []
        });
        console.log('Saving new item');
        const userRegistered = await user.save(); 

        console.log('Returning response');
        res.status(201).json({
            message: "User registered successfully!", 
            createdUser: userRegistered
        });
    }catch (err){
        console.error('Error:', err);
        res.status(500).json({
            error : err
        });
    }
};

//Controller to get one user - find by id
exports.getOneUser = (req, res) => {
    const id = req.params.userId;

    User.findById(id)
        .exec()
        .then(doc => {
            console.log("From database" , doc);
            if(doc){
                res.status(200).json(doc)
            }else {
                res.status(404).json({
                    message: "Error 404 / User not found with id " + id
                });
            };
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Invalid user Id format - Error 500"
            });
        });
};

//Controller to get one user - find by username
exports.getOneUserByUsername = async (req, res) => {
        const username = req.params.username;
      
        try {
          const user = await User.findOne({ username: { $regex: username } });
      
          if (!user) {
            return res.status(404).send("No user exists with the given username");
          }
          res.send(user);
        } catch (err) {
          console.log(err);
          res.status(500).send("Server error");
        };
};


//Controller to get one user by username and return his orderHistory array
exports.getOneUserByUsernameAndReturnOrderHistory = async (req, res) => {
    const username = req.params.username;
  
    try {
      const user = await User.findOne({ username: { $regex: username } });
  
      if (!user) {
        return res.status(404).send("No user exists with the given username");
      }

      const aSpecificOrderHistory = user.orderHistory;
      
      //returning the orderHistory Array of the found user
      res.send(aSpecificOrderHistory);

    } catch (err) {
      console.log(err);
      res.status(500).send("Server error");
    };
};

//Controller to get one user by id and return his orderHistory array
exports.getOneUserByIdAndReturnOrderHistory = async (req, res) => {
    
    const userId = req.params.userId;

    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).send("No user exists with the given id");
      }
      const aSpecificOrderHistory = user.orderHistory;

     //returning the orderHistory Array of the found user
     res.send(aSpecificOrderHistory);


    } catch (err) {
      console.log(err);
      res.status(500).send("Server error");
    }
  };

  exports.addOrderToHistory = async (req, res) => {
    const { userId, eventId } = req.params;
  
    try {
      // Find the user by id
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      // Find the event by id
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).send("Event not found");
      }
  
      // Add the event to the user's events array
      user.orderHistory.push(eventId);
      await user.save();
  
      res.send("User " + user.username + "'s orderHistory list updated with event: "  + event.eventTitle);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server error");
    }
  };