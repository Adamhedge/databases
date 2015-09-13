var Sequelize = require("sequelize");
var sequelize = new Sequelize("chat", "root", "");

var Messages = sequelize.define('Message', {
  user_name: Sequelize.STRING,
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  message: Sequelize.STRING,
  room_name: Sequelize.STRING
  // createdAt: Sequelize.BIGINT
});

module.exports.Messages = Messages;
// var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

// var connection = mysql.createConnection({
//       user: "root",
//       password: "",
//       database: "chat"
//     });

// connection.connect();

// module.exports.connection = connection;
