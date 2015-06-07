var should = require("should"),
    request = require("supertest"),
    app = require("../app.js"),
    mongoose = require("mongoose"),
    Book = mongoose.model("Book"),
    agent = request.agent(app);

describe("Book Crud Test", function() {
  it("should aloow a book to be posted and return a read and _id", function(done) {
    var bookPost = {
      title: "Test Book",
      author: "Test Author",
      genre: "Test Genre"
    };

    agent.post("/api/books")
      .send(bookPost)
      .expect(200)
      .end(function(err, results) {
        results.body.read.should.equal(false);
        results.body.should.have.property("_id");
        done();
      })
  })

  afterEach(function(done) {
    Book.remove().exec();
    done();
  });
});
