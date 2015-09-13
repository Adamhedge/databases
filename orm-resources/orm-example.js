/* You'll need to
 * npm install sequelize
 * before running this example. Documentation is at http://sequelizejs.com/
 */

var Sequelize = require("sequelize");
var sequelize = new Sequelize("chat", "root", "");
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
var Users = sequelize.define('User', {
  user_name: Sequelize.STRING
});

var Messages = sequelize.define('Message', {
  user_name: Sequelize.STRING,
  id: Sequelize.INTEGER,
  message: Sequelize.STRING,
  room_name: Sequelize.STRING
  // createdAt: Sequelize.BIGINT
});

/* .sync() makes Sequelize create the database table for us if it doesn't
 *  exist already: */
Users.sync().then(function() {
  /* This callback function is called once sync succeeds. */
  // now instantiate an object and save it:
  var newUser = Users.build({user_name: "Jean Valjean"});
  newUser.save().then(function() {
     // This callback function is called once saving succeeds. 
    // Retrieve objects from the database:
    Users.findAll({ where: {user_name: "Jean Valjean"} }).then(function(usrs) {
      // This function is called back with an array of matches.
      for (var i = 0; i < usrs.length; i++) {
        console.log(usrs[i].user_name + " exists");
      }
    });
  });
});

Messages.sync().then(function() {
  var newMessage = Messages.build({
    user_name: "data.user_name", //?How do we know?,
    message: "data.message",
    room_name: "data.room_name"
  });

  newMessage.save().then(function(){
    console.log("DONESKIES!");
  });
});

Messages.sync().then(function() {
  var newMessage = Messages.build({
    // user_id: 1, //?How do we know?,
    text: "In Mercy's Name, three days are all I need!",
    room_name: "France"
  });

  Messages.findAll({ where: {room_name : "France"} }).then(function(msg){
      for (var i=0; i<msg.length; i++){
        console.log(msg[i].text + "is what he said in " + msg[i].room_name);
      }
    })
});
