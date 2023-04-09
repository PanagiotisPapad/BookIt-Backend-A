const express = require("express");
const mongoose = require("mongoose");
const userRouter = express.Router();

const User = require("../controllers/users");

const { users } = require("../models/user");


//Registration of a new user
userRouter.post("/user", User.createUser);

//Login
userRouter.post("/login", User.login);

//Find a user by id and update his password, only if given old password matches with the encrypted one in database
userRouter.post("user/updatepassword/:userId", User.updatePassword);

//Find a user by id and Update the entire user by replacing it with another user in request body
userRouter.put("/user/update/:userId", User.userUpdate);

userRouter.patch("/user/updatenamemail/:userId",User.userUpdateUsernameMail);

//Find and return a user that already exists based on his id
userRouter.get("/user/:userId", User.getOneUser)

//Find and return a user that already exists based on his email
userRouter.get("/user/email/:email", User.getOneUserByEmail)

//Find a user with a specific username and return his orderHistory list
userRouter.get("/user/orderhistoryById/:userId", User.getOneUserByIdAndReturnOrderHistory)

//Add an event to a user's order history 
userRouter.patch("/user/addordertohistory/:userId/:eventId", User.addOrderToHistory)

//Delete a user's profile
userRouter.delete("/user/delete/:userId", User.deleteUser)



module.exports = userRouter; 