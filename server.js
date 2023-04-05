const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());

// Parse items inside the app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const eventsRoutes = require("./api/routes/eventRouter");
const usersRoutes = require("./api/routes/userRouter");
const codesRouter = require("./api/routes/codeRouter");

//Setting up Mongoose
mongoose
    .connect("mongodb+srv://BookIt-Panos:" + process.env.MONGO_ATLAS_PW + "@bookit.ytqmdxc.mongodb.net/BookItApp?retryWrites=true&w=majority", {
        useNewUrlParser: true
    });

const db = mongoose.connection;
db.on("err", (err) => { console.log(err) });
db.once("open", () => { console.log("Connected to Database") });

//Go to the events file
app.use("/", eventsRoutes);
app.use("/", usersRoutes);
app.use("/", codesRouter);

//200 status 
app.use((req, res, next) => {
    res.status(200).json({
        message: "Welcome to the coolest API. Check out our ReadMe to see how it works"
    })
});

//500 Error handling
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        err: {
            message: err.message
        }
    })
});

//Spinning up the server
app.listen(3000, () => {
    console.log("Server started on port 3000");
});

//TTL's: (TTL: Time To Live) - a mongoDB feature for collections to automatically delele their items after a specific date is passed
 // Create a TTL index on the "Events" collection that deletes events after eventDate is passed
 db.collection("EventsCollection").createIndex({ "eventDate": 1 }, { expireAfterSeconds: 0 }, function(err, result) {
    if (err) throw err;
    console.log("TTL index created on 'expiryDate' attribute in 'EventsCollection' collection");
    
  });

  // Create a TTL index on the "Codes" collection that deletes events after eventDate is passed
 db.collection("CodesCollection").createIndex({ "codeExpireDate": 1 }, { expireAfterSeconds: 0 }, function(err, result) {
    if (err) throw err;
    console.log("TTL index created on 'codeExpireDate' attribute in 'CodesCollection' collection");
    
  });
