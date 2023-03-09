//This is the test branch

//add additional comments to test branch


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());

// Parse items inside the app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const eventsRoutes = require("./api/routes/events");

//Setting up Mongoose
mongoose
    .connect("mongodb+srv://BookIt-Panos:" + process.env.MONGO_ATLAS_PW + "@bookit.ytqmdxc.mongodb.net/BookItApp?retryWrites=true&w=majority", {
        useNewUrlParser: true
});

const db = mongoose.connection;
db.on("err", (err) => { console.log(err) });
db.once("open", () => { console.log("Connected to Database" )});


//Go to the events file
app.use("/events", eventsRoutes); 

app.use((req, res, next) => {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
    })

    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
            err: {
                message: err.message
            }
        })
    })

app.get("/", (req, res) => {
    res.json({ message: "Server is running" });
});


app.listen(3000, () => {
    console.log("Server started on port 3000");
});

