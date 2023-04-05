const express = require("express");
const mongoose = require("mongoose");
const codesRouter = express.Router();
const Code = require("../controllers/codes");

const {codes} = require("../models/code"); 

//Controller to create a new coupon code
codesRouter.post("/codes",Code.createCode);

//Receive a specific code in parameter and return the discount percentage number
codesRouter.get("/codes/:code", Code.getDiscountByCode);




module.exports = codesRouter;
