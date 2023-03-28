const express = require("express");
const mongoose = require("mongoose");
const userRouter = express.Router();
const checkAuth = require("../middleware/check-auth");

const User = require("../controllers/users");

const { users } = require("../models/user");


//Registration of a new user
userRouter.post("/user", User.createUser);

//Login
userRouter.post("/login", User.login);

//Find and return a user that already exists based on his id
userRouter.get("/user/:userId", User.getOneUser)

//Find and return a user that already exists based on his username
userRouter.get("/user/username/:username", User.getOneUserByUsername)

//Find a user with a specific username and return his orderHistory list
userRouter.get("/user/orderhistory/:username", User.getOneUserByUsernameAndReturnOrderHistory)

//Find a user with a specific username and return his orderHistory list
userRouter.get("/user/orderhistoryById/:userId", User.getOneUserByIdAndReturnOrderHistory)

//TODO : Add a post endpoint to add an event to a user's order history 
userRouter.patch("/user/addordertohistory/:userId/eventId", User.addOrderToHistory)

//Delete user account
userRouter.delete("/user/delete/:userId", User.deleteUser)


module.exports = userRouter; 