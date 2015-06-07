// Require Node packages
var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser");

//Use Mongoose to connect to MongoDB database
var db;

if(process.env.ENV === "Test") {
  db = mongoose.connect("mongodb://localhost/bookAPI_test", function(err) {
    if (err) { console.log(err); }
  });
} else {
  db = mongoose.connect("mongodb://localhost/bookAPI", function(err) {
    if (err) { console.log(err); }
  });
}

// Create Mongoose model for the docs it reads from MongoDB
var Book = require("./models/bookModel");

// Create an instance of Express and store it in our 'app' variable
var app = express();

// Default server port to the process environemtn variable or 3000
var port = process.env.PORT || 3000;

// Tell our app to use the body-parser package
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Require bookRoutes module which handles routes and pass in book model
var bookRouter = require("./routes/bookRoutes")(Book);

// Use our bookRouter to handle routes prefixed with "/api/books"
app.use("/api/books", bookRouter);
//app.use("/api/authors", authorRouter);

app.get("/", function(req, res) {
  res.send("Welcome to my API!");
});

// Pass in 'port' variable so our app server knows what port to listen on for requests
// Gulp is running the nodemon task. CHeck 'gulpfile' for more info.
app.listen(port, function() {
  console.log("Gulp is running my app on port: " + port);
});

module.exports = app;
