const Code = require("../models/code"); 

const mongoose = require("mongoose");

//Controller to create a new coupon code
exports.createCode = (req, res) => {
    const code = new Code({
        _id: new mongoose.Types.ObjectId(),
        codeName: req.body.codeName, 
        discountPercentage: req.body.discountPercentage, 
        codeStartingDate: req.body.codeStartingDate, 
        codeExpireDate: req.body.codeExpireDate
    })
    code
    .save()
    .then(result=> {
        console.log(result);
    })
    .catch(err => console.log(err));
    res.status(201).json({
        message: "New coupon code created successfully", 
        createdCode: code
    });
};

//Receive a specific code in parameter and return the discount percentage number
exports.getDiscountByCode = async (req, res) => {
    try {
      const codeName = req.params.code;
      const code = await Code.findOne({codeName: codeName});
  
      if (code) {
        res.send(code.discountPercentage.toString());
      } else {
        res.status(404).json({
          message: "The coupon you entered is not valid"
        })
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error status 500"
      })
    }
  };