var db = require('../db');

module.exports = {
  messages: {
    get: function (res) {
      db.Messages.sync().then(function() {
        db.Messages.findAll().then(function(msg){
            res.send({results: msg});
          })
      });
    }, // a function which produces all the messages
    post: function (data, res) {
      db.Messages.sync().then(function() {
        var newMessage = db.Messages.build({
          user_name: data.user_name, //?How do we know?,
          message: data.message,
          room_name: data.room_name
        });

        newMessage.save().then(function(error){
          if(error){
            console.log(error);
          }
          res.sendStatus(201);
        });
      });
      // if(!err){
      //     res.sendStatus(201);
      //   } else {
      //     console.log(err);
      //     res.sendStatus(500);
      //   }
    }
  },

  users: {
    // Ditto as above.
    get: function (res) {
      // var queryString = "select user_name from messages;"; 
      // db.connection.query(queryString, function(err, rows){
      //   res.send({results: rows});
      // });
    },
    post: function (data, res) {
      //leaving be for now
      // res.sendStatus(201);
    }
  }
};

      // var queryString = "select m.id, u.user_name, m.message, m.createdAt, r.room_name from messages m inner join rooms r on (m.room_id = r.id) inner join user u on(u.id = m.user_id);"; 
// insert into user (user_name) values ("Adam");

// Messages.sync().then(function() {
//   var newMessage = Messages.build({
//     // user_id: 1, //?How do we know?,
//     text: "In Mercy's Name, three days are all I need!",
//     room_name: "France"
//   });

//   Messages.findAll({ where: {room_name : "France"} }).then(function(msg){
//       for (var i=0; i<msg.length; i++){
//         console.log(msg[i].text + "is what he said in " + msg[i].room_name);
//       }
//     })
// });