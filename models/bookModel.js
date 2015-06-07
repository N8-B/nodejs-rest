var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

// Set up the schema of our model and store it in the "bookModel" variable
var bookSchema = new Schema({
  title: {
    type: String
  },
  author: {
    type: String
  },
  genre: {
    type: String
  },
  read: {
    type: Boolean,
    default: false
  },
});

// Tell Mongoose we have a new schema called "Book".
// Return an instance of the bookModel via "module.exports".
// This will be aviable in our app.js code
module.exports = mongoose.model("Book", bookSchema);
