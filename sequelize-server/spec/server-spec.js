/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require("request"); // You might need to npm install the request module!
var expect = require('../../node_modules/chai/chai').expect;

describe("Persistent Node Chat Server", function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      user: "root",
      password: "",
      database: "chat"
    });
    dbConnection.connect();

       var tablename =  "truncate messages;";

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    dbConnection.query(tablename, done);
  });

  afterEach(function() {
    dbConnection.end();
  });

  it("Should insert posted messages to the DB", function(done) {
    // Post the user to the chat server.
    console.log("Posting user.");
    request({ method: "POST",
              uri: "http://127.0.0.1:3000/classes/users",
              json: { user_name: "Valjean" }
    }, function () {
      // Post a message to the node chat server:
      console.log("Posting message");
      request({ method: "POST",
              uri: "http://127.0.0.1:3000/classes/messages",
              json: {
                user_name: "Valjean",
                message: "In mercy's name, three days are all I need.",
                room_name: "Hello"
              }
      }, function () {
        // Now if we look in the database, we should find the
        // posted message there.

        // TODO: You might have to change this test to get all the data from
        // your message table, since this is schema-dependent.
        var queryString = "SELECT * FROM messages";
        var queryArgs = [];

        dbConnection.query(queryString, queryArgs, function(err, results) {
          // Should have one result:
          expect(results.length).to.equal(1);

          // TODO: If you don't have a column named text, change this test.
          expect(results[0].message).to.equal("In mercy's name, three days are all I need.");

          done();
        });
      });
    });
  });

  it("Should output all messages from the DB", function(done) {
    // Let's insert a message into the db


    //"select m.message, r.room_name from messages m inner join rooms r on (m.room_id = r.id);";
       var queryString = "insert into messages (room_name, message) values (\"main\", \"Men like you can never change!\");"
       // var queryString = "select message, room_name from messages;";
       var queryArgs = [];
    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */

    //select m.message r.name from messages m inner join room r on (m.room_id = r.id)

    dbConnection.query(queryString, queryArgs, function(err) {
      if (err) { throw err; }

      // Now query the Node chat server and see if it returns
      // the message we just inserted:
      request("http://127.0.0.1:3000/classes/messages", function(error, response, body) {
        var messageLog = JSON.parse(body);
        expect(messageLog.results[0].message).to.equal("Men like you can never change!");
        expect(messageLog.results[0].room_name).to.equal("main");
        done();
      });
    });
  });
});
