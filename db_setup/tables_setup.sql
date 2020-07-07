-- Run each part and then comment it out, 
-- (our db is localhosted right now so this is how to sync it)

-- ///////////  /////////   ///////////    //////////  ///////// //////////////  ////////

-- First run this, refresh your mysql extension and check that it was added, then comment it out:

-- CREATE DATABASE sunday_finalProject;

-- ///////////  /////////   ///////////    //////////  ///////// //////////////  ////////

-- Then uncomment this line and a singe create table every time:
USE sunday_finalproject;

-- ///////////  /////////   ///////////    //////////  ///////// //////////////  ////////

-- CREATE TABLE username_password (
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     username VARCHAR(30),
--     salt VARCHAR(12),
--     cipher VARCHAR(50)
-- );

-- -- -- ///////////  /////////   ///////////    //////////  ///////// //////////////  ////////

-- CREATE TABLE tasks (
--     taskId INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
--     taskName VARCHAR(40),
--     description VARCHAR(150),
--     priority VARCHAR(20),
--     deadline DATE,
--     status VARCHAR(30),
--     budget INT,
--     category VARCHAR(50)
-- );



-- -- -- ///////////  /////////   ///////////    //////////  ///////// //////////////  ////////

-- CREATE TABLE user_tasks (
--     task_id INT,
--     user_id INT,
--     FOREIGN KEY(user_id) REFERENCES username_password(id) ON DELETE CASCADE,
--     FOREIGN KEY(task_id) REFERENCES tasks(taskId) ON DELETE CASCADE
-- );



-- -- -- ///////////  /////////   ///////////  Teams Tables  //////////  ///////// //////////////  ////////

-- CREATE TABLE teams (
--     teamId INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
--     teamName VARCHAR(40)
-- );

-- CREATE TABLE teams_users (
--     teamId INT , 
--     userId INT,
--     is_admin BIT,
--     FOREIGN KEY(teamId) REFERENCES teams(teamId) ON DELETE CASCADE
-- );


-- CREATE TABLE teams_tasks (
--     teamId INT , 
--     taskId INT,
--     FOREIGN KEY(teamId) REFERENCES teams(teamId)  ON DELETE CASCADE,
--     FOREIGN KEY(taskId) REFERENCES tasks(taskId)  ON DELETE CASCADE
-- );

-- CREATE TABLE users (
--     userId INT NOT NULL PRIMARY KEY, 
--     userName VARCHAR(40),
--     firstName VARCHAR(40),
--     lastName VARCHAR(40), 
--     email VARCHAR(70),
--     birthDate  DATE
-- );



-- -- -- ///////////  /////////   ///////////  Chat Tables  //////////  ///////// //////////////  ////////

-- CREATE TABLE teams_chat (
--     messageId INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
--     teamId INT , 
--     authorname VARCHAR(40),
--     author INT,
--     message VARCHAR(1000),
--     timestamp DATETIME,
--     FOREIGN KEY(teamId) REFERENCES teams(teamId) ON DELETE CASCADE,
--     FOREIGN KEY(author) REFERENCES users(userId) ON DELETE CASCADE
-- );





-- DROP TABLE teams_chat 
-- DROP TABLE teams_tasks 
-- DROP TABLE teams_users
-- DROP TABLE user_tasks






















 
 


