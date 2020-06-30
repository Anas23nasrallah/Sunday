-- Run each part and then comment it out, 
-- (our db is localhosted right now so this is how to sync it)

-- ///////////  /////////   ///////////    //////////  ///////// //////////////  ////////

-- First run this, refresh your mysql extension and check that it was added, then comment it out:

-- CREATE DATABASE sunday_finalProject;

-- ///////////  /////////   ///////////    //////////  ///////// //////////////  ////////

-- Then uncomment this line and a singe create table every time:
-- USE sunday_finalProject;

-- ///////////  /////////   ///////////    //////////  ///////// //////////////  ////////

-- CREATE TABLE username_password (
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     username VARCHAR(30),
--     salt VARCHAR(12),
--     cipher VARCHAR(50)
-- );

-- ///////////  /////////   ///////////    //////////  ///////// //////////////  ////////

-- CREATE TABLE tasks (
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
--     category VARCHAR(30),
--     priority VARCHAR(20),
--     deadline DATE,
--     progress_status VARCHAR(20)
-- );

-- ///////////  /////////   ///////////    //////////  ///////// //////////////  ////////

-- CREATE TABLE user_tasks (
--     task_id INT,
--     user_id INT,

--     FOREIGN KEY(user_id) REFERENCES username_password(id),
--     FOREIGN KEY(task_id) REFERENCES tasks(id)

-- );

