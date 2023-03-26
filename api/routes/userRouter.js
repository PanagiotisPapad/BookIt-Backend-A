const express = require("express");
const mongoose = require("mongoose");
const userRouter = express.Router();

const User = require("../controllers/users");

const { users } = require("../models/user");


//Create new event
userRouter.post("/user", User.createUser);

userRouter.get("/user/:userId", User.getOneUser)




module.exports = userRouter; 