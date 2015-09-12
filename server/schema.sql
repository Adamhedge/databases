CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  /* Describe your table here.*/
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id int,
  message varchar(140),
  room_id int
);

CREATE TABLE user (
  /* Describe your table here.*/
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_name varchar(140)
);

CREATE TABLE rooms (
  /* Describe your table here.*/
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  room_name varchar(140)
);

CREATE TABLE friends (
  /* Describe your table here.*/
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  friend_id int
);
/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

-- create table employee
-- (first varchar(15),
--  last varchar(20),
--  age number(3),
--  address varchar(30),
--  city varchar(20),
--  state varchar(20));

-- /Users/student/Desktop/2015-08-databases/server/schema.sql 

-- insert into messages
--   (user_id, message, room_id)
--   values (1, "Hello world", 1);

-- insert into user
--   (user_name)
--   values ("John Smith");

-- insert into rooms
--   (room_name)
--   values ("general");

-- SELECT concat('TRUNCATE TABLE `', TABLE_NAME, '`;')
-- FROM chat.TABLES