const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        console.log(token);
        const decoded = jwt.verify(token, process.env.JWT.KEY)
        if(jwt.verify(token, process.env.JWT.KEY)){
            console.log("Verify value is valid")
        }else {
            console.log("Verify value is false")
        }
        req.userData = decoded
        console.log(userData)
        console.log(req.userData)
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed in verification'
        })
    } 
};