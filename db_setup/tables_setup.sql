-- Run each part and then comment it out, 
-- (our db is localhosted right now so this is how to sync it)

-- ///////////  /////////   ///////////    //////////  ///////// //////////////  ////////

-- First run this, refresh your mysql extension and check that it was added, then comment it out:

-- CREATE DATABASE sunday_finalProject;

-- ///////////  /////////   ///////////    //////////  ///////// //////////////  ////////

-- Then uncomment this line and a singe create table every time:
USE sunday_finalproject;

-- DROP TABLE user_tasks;
-- DROP TABLE tasks ;
-- DROP TABLE username_password;

-- ///////////  /////////   ///////////    //////////  ///////// //////////////  ////////

-- CREATE TABLE username_password (
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     username VARCHAR(30),
--     salt VARCHAR(12),
--     cipher VARCHAR(50)
-- );

-- -- ///////////  /////////   ///////////    //////////  ///////// //////////////  ////////

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



-- -- ///////////  /////////   ///////////    //////////  ///////// //////////////  ////////

-- CREATE TABLE user_tasks (
--     task_id INT,
--     user_id INT,
--     FOREIGN KEY(user_id) REFERENCES username_password(id),
--     FOREIGN KEY(task_id) REFERENCES tasks(taskId)
-- );

-- ALTER TABLE tasks ADD category VARCHAR(30);
-- DELETE FROM user_tasks;
-- DELETE FROM tasks;



-- -- ///////////  /////////   ///////////  Teams Tables  //////////  ///////// //////////////  ////////

-- CREATE TABLE teams (
--     teamId INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
--     teamName VARCHAR(40)
-- );

-- CREATE TABLE teams_users (
--     teamId INT , 
--     userId INT,
--     is_admin BIT,
--     FOREIGN KEY(teamId) REFERENCES teams(teamId)
-- );
 
-- CREATE TABLE teams_tasks (
--     teamId INT , 
--     taskId INT,
--     FOREIGN KEY(teamId) REFERENCES teams(teamId),
--     FOREIGN KEY(taskId) REFERENCES tasks(taskId)
-- );

-- CREATE TABLE users (
--     userId INT NOT NULL PRIMARY KEY, 
--     userName VARCHAR(40),
--     firstName VARCHAR(40),
--     lastName VARCHAR(40), 
--     email VARCHAR(70),
--     birthDate  DATE
-- );



-- -- ///////////  /////////   ///////////  Chat Tables  //////////  ///////// //////////////  ////////
-- DROP TABLE teams_chat;


-- CREATE TABLE teams_chat (
--     messageId INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
--     teamId INT , 
--     authorname VARCHAR(40),
--     author INT,
--     message VARCHAR(1000),
--     timestamp DATETIME,
--     FOREIGN KEY(teamId) REFERENCES teams(teamId)
-- );

-- INSERT INTO users VALUES (1, 'eitan', 'Eitan', 'Gueron', 'eitangueron@gmail.com', "2020-07-06 17:00:01");








 
 


