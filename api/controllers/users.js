const User = require("../models/user");
const Event = require("../models/event");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); //library for encrypting the user password information


//Registration requires that no user already exists with same email

//Controller to create a new User
exports.createUser = (req, res) => {
  //check if email already exists in the database
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "There is already a user with this email"
        });
      } else {
        //Encrypt password with bcrypt
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              err: err
            })
          } else {
            //Create a new user
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              username: req.body.username,
              email: req.body.email,
              password: hash
            })
            user
              .save()
              .then(result => {
                console.log(result)
                res.status(201).json({
                  message: 'User registered successfully.'
                })
              })
              .catch(err => {
                console.log(err)
                res.status(500).json({
                  err: err
                })
              });
          }
        });
      }
    });
};

//Delete a user from the database
exports.deleteUser = (req, res) => {
  User.findOneAndDelete({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err.message
      })
    })
}

//Controller for the login function
exports.login = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {

          return res.status(200).json({
            message: "Auth successful"
          })
        }
        //password is wrong -> result == false
        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Invalid user Id format - Error 500"
      });
    })
}

//Controller to get one user - find by id
exports.getOneUser = (req, res) => {
  const id = req.params.userId;

  User.findById(id)
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc)
      } else {
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

    res.send("User " + user.username + "'s orderHistory list updated with event: " + event.eventTitle);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};