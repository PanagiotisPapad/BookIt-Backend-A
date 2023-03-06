const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Parse items inside the app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const eventsRoutes = require("./api/routes/events");

//Setting up Mongoose
mongoose
    .connect("mongodb://127.0.0.1:27017/bookitData", {
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

