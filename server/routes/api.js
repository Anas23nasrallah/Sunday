const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
//********* Here you should change the password "35533553" => YOUR_OWN_DB_PASSWORD */
const sequelize = new Sequelize('mysql://root:1234@localhost/sunday_finalProject')

const crypto = require('crypto');
// const { tasks } = require('../../src/stores/mainStore');


/*  creating a random  salt
    #return = random salt | 12 characters of 1 / 0 
*/
const createRandomSalt = function () {
    let salt = ""
    for (let i = 0; i < 12; i++) {
        salt += ((Math.floor(Math.random() * 2)) ? "1" : "0")
    }
    return salt
}



/*  encoding the password using Des-ECB Algorithm with salt
    @param1 - the user's password , 8 characters nor numbers 
    @param2 - salt | 12 characters of 1 / 0 
    @param3 - key | the same key always to use it with Des 
    #return = the cipher to save in the username-password table 
*/
const encodeDesECB = function (password, salt, keyString) {
    const passwordSalt = password + salt //merging salt and password
    let key = new Buffer.from(keyString.substring(0, 8), 'utf8');
    let cipher = crypto.createCipheriv('des-ecb', key, '');
    let c = cipher.update(passwordSalt, 'utf8', 'base64');
    c += cipher.final('base64');
    return c;
}


/*   New user singed up, add it to the user-password table
     just after getting the cipher using DES encry.. algorithm 
        # return - userId 
*/
router.post('/signup', function (req, res) {
    const password = req.body.password
    const name = req.body.name
    const salt = createRandomSalt()
    const cipher = encodeDesECB(password, salt, "10110101")
    sequelize.query(`INSERT INTO username_password VALUES(null,"${name}","${salt}","${cipher}")`)
        .then(function (results) {
            res.send({status: 'OK', "id" : results[0].id})
        })
})


/*   trying to log in 
     # return - res 'OK' or 'Nope' and user's id
*/
router.post('/login', function (req, res) {
    const password = req.body.password
    const name = req.body.name
    sequelize.query(`SELECT *
                    FROM username_password 
                    WHERE username= "${name}"
                   `, { type: Sequelize.QueryTypes.SELECT })
        .then(function (results) {
            if (results.length >= 1) { //check if user exist in table 
                const salt = results[0].salt
                const cipher = results[0].cipher
                const usersCipher = encodeDesECB(password, salt, "10110101")
                if (cipher == usersCipher) { res.send({ "status": "OK", "userId": results[0].id }) }
                else {
                    res.send({ "status": "NOPE", "id": results[0].id })
                }
            } else {
                res.end()
            }

        })
})



/*   getting all tasks of user with id of "userId"
     @param - userId - the user's id passed as req param
     # return - array of all relevant tasks with fields for each : id,taskName,description,priority,deadLine,status,budget
*/
router.get('/tasks/:userId', function (req, res) {
    const userId = req.params.userId
    sequelize.query(`SELECT tasks.taskId,tasks.taskName,tasks.description,tasks.priority,tasks.deadLine,tasks.status,tasks.budget
    FROM tasks JOIN user_tasks ON tasks.taskId=user_tasks.task_id
    WHERE user_tasks.user_id = ${userId}
   `, { type: Sequelize.QueryTypes.SELECT })
        .then( results => res.send(results) )
})




/*   Adding new task to the tasks table
    @params - req : object of task similiar to Task.js
     Example: =>
{
    "taskName" : "stam",
    "description" : "say something",
    "priority" : "low",
    "deadLine" :  "2020-12-30" , // YYYY-MM-DD
    "status" : "start",
    "budget" : 120
}

 #result - return res : id of the new task
     
*/
router.post('/tasks/:userId', function (req, res) { 
    const taskInfo = req.body 
    const userId = req.params.userId

    sequelize.query(`INSERT INTO tasks VALUES(null,"${taskInfo.taskName}","${taskInfo.description}", "${taskInfo.priority}",
                    "${taskInfo.deadLine}", "${taskInfo.status}", ${taskInfo.budget}, '${taskInfo.category}')
                    `, { type: Sequelize.QueryTypes.SELECT })
        .then( (result) => {
            const taskId = result[0]
            sequelize.query(`INSERT INTO user_tasks VALUES(${taskId},${userId})
            `, { type: Sequelize.QueryTypes.SELECT })
            .then( () => res.send({"taskId" : taskId}))
        })
})




/*   updating task
    @params - req : object of task similiar to Task.js
    Example: =>
{
    "taskId" : 3
    "taskName" : "stam",
    "description" : "say something",
    "priority" : "low",
    "deadLine" :  "2020-12-30" , // YYYY-MM-DD
    "status" : "start",
    "budget" : 120
}

 #result - /// res.end()
     
*/
router.put('/updateTask', function (req, res) {
    const taskInfo = req.body
    sequelize.query(` UPDATE tasks
                      SET tasks.budget=${taskInfo.budget}, tasks.deadline="${taskInfo.deadLine}",
                          tasks.description="${taskInfo.description}", tasks.priority="${taskInfo.priority}",
                          tasks.status = "${taskInfo.status}", tasks.taskName="${taskInfo.taskName}"
                      WHERE tasks.taskId = ${taskInfo.taskId}
                    `)
        .then(function (result) {
            res.end()
        })
})




module.exports = router