var db = require('../db');

module.exports = {
  messages: {
    get: function (res) {
      // var queryString = "SELECT * FROM messages";
      var queryString = "select * from messages;"; 
      db.connection.query(queryString, function(err, rows){
        res.send({results: rows});
      });
    }, // a function which produces all the messages
    post: function (data, res) {
      var createdAt = Date.now();
      var queryString = "insert into messages (user_name, room_name, message, createdAt) values (\'" + data.user_name + "\', \'" + data.room_name + "\', \'" + data.message + "\', " + createdAt + ");";
      db.connection.query(queryString, function(err, rows){
        if(!err){
          res.sendStatus(201);
        }
      });
      //check if username and room exist
        //get userID and roomID
      //if not, add them
        //get userID and roomID
      //insert into messages the user ID, timestamp, message, and room ID.
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (res) {
      var queryString = "select user_name from messages;"; 
      db.connection.query(queryString, function(err, rows){
        res.send({results: rows});
      });
    },
    post: function (data, res) {
      //leaving be for now
      res.sendStatus(201);
    }
  }
};

      // var queryString = "select m.id, u.user_name, m.message, m.createdAt, r.room_name from messages m inner join rooms r on (m.room_id = r.id) inner join user u on(u.id = m.user_id);"; 
// insert into user (user_name) values ("Adam");