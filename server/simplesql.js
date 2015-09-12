var mysql = require('mysql');
var request = require("request");

dbConnection = mysql.createConnection({
      user: "root",
      password: "",
      database: "chat"
    });
dbConnection.connect();

var queryString = "SELECT * FROM messages";
var queryArgs = [];

dbConnection.query(queryString, queryArgs, function(err, results) {
  // Should have one result:
  console.log(Array.isArray(results));
  console.log(results);
  console.log(queryArgs);
});