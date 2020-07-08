const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
//********* Here you should change the password "35533553" => YOUR_OWN_DB_PASSWORD */
const sequelize = new Sequelize('mysql://root:1234@localhost/sunday_finalProject')
const dateTime = require('node-datetime');

//setting email config
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sundayprojectmail@gmail.com',
    pass: 'sunday2020'
  }
});
//


const crypto = require('crypto');
const { bind } = require('file-loader');
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
    ///////extracting info/////////////
    const password = req.body.password
    const name = req.body.userName
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const birthDate = req.body.birthDate
    ////////////////////////////////
    const salt = createRandomSalt()
    const cipher = encodeDesECB(password, salt, "10110101")
    sequelize.query(`INSERT INTO username_password VALUES(null,"${name}","${salt}","${cipher}")`)
        .then(function (results) {
            const userId = results[0]
            sequelize.query(`INSERT INTO users VALUES(${userId},"${name}","${firstName}","${lastName}","${email}","${birthDate}")`)
            .then(function (secondResults) {
                res.send({status : "OK"})
            })
        })
})




/*
     get usernames 
 */
router.get('/users', function (req, res) {
    sequelize.query(`SELECT username_password.username
    FROM username_password
   `, { type: Sequelize.QueryTypes.SELECT })
        .then( results => res.send(results.map(u=>u.username)) )
})


/*
      get user's info 
*/
router.get('/user/:userId', function (req, res) {
    const userId = req.params.userId
    sequelize.query(`SELECT *
                    FROM users
                    WHERE users.userId = ${userId}
   `, { type: Sequelize.QueryTypes.SELECT })
        .then( results => res.send(results[0]) )
})


/*
      get user's id by username 
*/
router.get('/userid/:userName', function (req, res) {
    const userName = req.params.userName
    sequelize.query(`SELECT users.userId
                    FROM users
                    WHERE users.userName = "${userName}"
   `, { type: Sequelize.QueryTypes.SELECT })
        .then( results => res.send(results[0]) )
})


/*
      get user's full name by username 
*/
router.get('/userfullname/:userName', function (req, res) {
    const userName = req.params.userName
    sequelize.query(`SELECT users.firstName,users.lastName
                    FROM users
                    WHERE users.userName = "${userName}"
   `, { type: Sequelize.QueryTypes.SELECT })
        .then( results => res.send(results[0]) )
})




let WRONG_LOG_IN_USERNAME = ""
let attempt = 0
let isLogInAllowed = true

/*   trying to log in 
     # return - res 'OK' or 'Nope' and user's id
*/
router.post('/login', function (req, res) {
    if(isLogInAllowed==false) {res.send({"status": "Still blocked"})} 
    else {
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
                if (cipher == usersCipher) { res.send({ "status": "OK", "userId": results[0].id }) 
                  attempt = 0
                  WRONG_LOG_IN_USERNAME = ""
                 }
                else {
                    let returnMessage = 'Incorect password or username'
                    if(attempt>=1 && WRONG_LOG_IN_USERNAME==name) {
                    isLogInAllowed = false
                     returnMessage = `Too many wrong passwords, you are blocked for ${attempt*15} seconds! `
                        setTimeout(function(){ isLogInAllowed=true }, 15*attempt*1000);
                    }
                    WRONG_LOG_IN_USERNAME = name
                    attempt++
                    console.log(attempt)
                    res.send({ "status": returnMessage, "id": results[0].id })
                }
            } else {
                res.send({"status": "Incorect password or username"})
            }

        })
    }
})



/*   getting all tasks of user with id of "userId"
     @param - userId - the user's id passed as req param
     # return - array of all relevant tasks with fields for each : id,taskName,description,priority,deadLine,status,budget
*/
router.get('/tasks/:userId', function (req, res) {
    const userId = req.params.userId
    sequelize.query(`SELECT tasks.taskId,tasks.taskName,tasks.description,tasks.priority,tasks.deadLine,tasks.status,tasks.budget,tasks.category
    FROM tasks JOIN user_tasks ON tasks.taskId=user_tasks.task_id
    WHERE user_tasks.user_id = ${userId}
   `, { type: Sequelize.QueryTypes.SELECT })
        .then( results => res.send(results) )
})


/*   getting all tasks */

router.get('/alltasks', function (req, res) {
    sequelize.query(`SELECT tasks.taskId,tasks.taskName,tasks.description,tasks.priority,tasks.deadLine,tasks.status,tasks.budget,tasks.category
    FROM tasks
   `, { type: Sequelize.QueryTypes.SELECT })
        .then( results => res.send(results) )
})



/*  get the name of the user doing the task
*/
router.get('/taskuser/:taskId', function (req, res) {
    const taskId = req.params.taskId
    sequelize.query(`SELECT users.firstName,users.lastName,users.userName
    FROM users JOIN user_tasks ON users.userId=user_tasks.user_id
    WHERE user_tasks.task_id = ${taskId}
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
    sequelize.query(`INSERT INTO tasks VALUES(null, "${taskInfo.taskName}", "${taskInfo.description}", "${taskInfo.priority}",
                    "${taskInfo.deadLine}", "${taskInfo.status}", ${taskInfo.budget}, '${taskInfo.category}')
                    `)
        .then( function (result) {
            const taskId = result[0]
            sequelize.query(`INSERT INTO user_tasks VALUES(${taskId}, ${userId})
            `).then(function () {
                res.send({ "taskId": taskId })
            })
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





/*
    Delete task 
*/
router.delete('/deleteTask/:taskId', function (req, res) {
    const id = req.params.taskId
    sequelize.query(`DELETE FROM user_tasks
                     WHERE user_tasks.task_id = ${id}
                    `)
        .then(function (result) {
            sequelize.query(`DELETE FROM tasks
                             WHERE tasks.taskId = ${id}
            `).then(function () {
                res.end()
            })
        })
})


/*
    sending  message for a user
*/
router.post('/send', (req, res) => {
    const email = req.body.email
    const mailContent = req.body.mailContent
    const  mailOptions = {
        from: 'sundayprojectmail@gmail.com',
        to: email,
        subject: 'Mail from Sunday.com ✔',
        html: `<div style="background-color:powderblue;">
        <h1 style="color:red;">${mailContent}</h1>
        <p>You have been signed up successfully for Sunday.com</p>
        <p>Have a nice day</p>
        <p> Best regards</p>
        <p>Sunday.com team</p>
        <img src="https://cdn.pixabay.com/photo/2017/05/18/12/50/time-management-2323612_960_720.png"></img>
        </div>`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  })




  /*
    sending  message for the admin that task completed
*/
router.post('/sendCompleted', (req, res) => {
    const taskName = req.body.taskName
    const description = req.body.description
    const deadLine = req.body.deadLine
    const teamName = req.body.teamName
    const email = req.body.email
    const username = req.body.username
    const  mailOptions = {
        from: 'sundayprojectmail@gmail.com',
        to: email,
        subject: 'Notification - Sunday.com ✔',
        html: `<div style="background-color:powderblue;">
        <h1 style="color:red;">Dear admin of ${teamName} team</h1>
        <p>The task : ${taskName}</p>
        <p>With the description: ${description}</p>
        <p>Which is supposed to be done till : ${deadLine}</p>
        <p style="color:green;"> Completed  </p>
        <p> By the user: ${username}  </p>
        <img src="https://cdn.pixabay.com/photo/2017/01/13/01/22/ok-1976099_960_720.png"></img>
        </div>`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  })



    /*
    sending tracked  message 
*/
router.post('/sendNot', (req, res) => {
    const taskName = req.body.taskName
    const email = req.body.email
    const status = req.body.status
    const  mailOptions = {
        from: 'sundayprojectmail@gmail.com',
        to: email,
        subject: 'Notification - Sunday.com ✔',
        html: `<div style="background-color:powderblue;">
        <h1 style="color:red;">Dear user</h1>
        <p>The task : ${taskName}</p>
        <p>status updated to: ${status}</p>
        <img src="https://cdn.pixabay.com/photo/2017/01/13/01/22/ok-1976099_960_720.png"></img>
        </div>`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  })






//////////////////////////////////////// Teams API ///////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

/*  Adding new team
    @params: take a req like : 
    {
        "teamName" : "Winners",
        "userId" : 5  // Admin that created the team
    }
    #return - team's id
*/
router.post('/teams', function (req, res) {
    const teamInfo = req.body
    sequelize.query(`INSERT INTO teams VALUES(null, "${teamInfo.teamName}")
                    `)
        .then( function (result) {
            const teamId = result[0]
            sequelize.query(`INSERT INTO teams_users VALUES(${teamId}, ${teamInfo.userId},1)
            `).then(function () {
                res.send({ "teamId": teamId })
            })
        })
})



/*  Adding new (member) user to a team 
    @params -teamId 
    @params - username 
     - the user added by deafult as NOT admin
*/
router.post('/teamsusers/:teamId/:username', function (req, res) {
    const username = req.params.username
    const teamId = req.params.teamId
    sequelize.query(`SELECT users.userId FROM users WHERE userName = "${username}"
                    `, { type: Sequelize.QueryTypes.SELECT })
        .then( function (result) {
            const userId = result[0].userId
            sequelize.query(`INSERT INTO teams_users VALUES(${teamId}, ${userId},0)
            `).then(function () {
                res.end()
            })
        })
})



/*  getting teamname from teamid
*/
router.get('/teamname/:teamId', function (req, res) {
    const teamId = req.params.teamId
    sequelize.query(`SELECT teams.teamName
                     FROM teams 
                     WHERE teams.teamId = ${teamId}
                    `, { type: Sequelize.QueryTypes.SELECT })
        .then( function (results) {
            res.send(results)
        })
})



/*  Adding new task to a team 
    @params -teamId 
    @params - taskId
     - the user added by deafult as NOT admin
*/
router.post('/teamstasks/:teamId/:taskId', function (req, res) {
    const taskId = req.params.taskId
    const teamId = req.params.teamId
    sequelize.query(`INSERT INTO teams_tasks VALUES(${teamId}, ${taskId})
            `).then(function () {
                res.end()
            })

})


/*  getting teams of the user 
    @params: userId
    #return - teams 
*/
router.get('/teams/:userId', function (req, res) {
    const userId = req.params.userId
    sequelize.query(`SELECT teams.teamId,teams.teamName,teams_users.is_admin
                     FROM teams JOIN teams_users 
                     ON teams.teamId = teams_users.teamId
                     WHERE teams_users.userId = ${userId}
                    `, { type: Sequelize.QueryTypes.SELECT })
        .then( function (results) {
            res.send(results)
        })
})



/*  getting tasks of a team
    @params: teamId
    #return - tasks
*/
router.get('/teamstasks/:teamId', function (req, res) {
    const teamId = req.params.teamId
    sequelize.query(`SELECT tasks.taskId,tasks.taskName,tasks.description,tasks.priority,tasks.deadLine,tasks.status,tasks.budget,tasks.category
    FROM tasks JOIN teams_tasks ON tasks.taskId=teams_tasks.taskId
    WHERE teams_tasks.teamId = ${teamId}
   `, { type: Sequelize.QueryTypes.SELECT })
        .then( results => res.send(results) )
})



/* get members of a team 
*/
router.get('/members/:teamId', function (req, res) {
    const teamId = req.params.teamId
    sequelize.query(`SELECT users.firstName,users.lastName,users.userName
    FROM users JOIN teams_users ON users.userId=teams_users.userId
    WHERE teams_users.teamId = ${teamId}
   `, { type: Sequelize.QueryTypes.SELECT })
        .then( results => res.send(results) )
})


/* remove user from a team
*/
router.post('/members/:teamName/:userId', function (req, res) {
    const userId = req.params.userId
    const teamName = req.params.teamName
    sequelize.query(`SELECT teams.teamId FROM  teams WHERE teams.teamName= "${teamName}"
            `, { type: Sequelize.QueryTypes.SELECT} ).then(function (results) {
                sequelize.query(`DELETE FROM  teams_users WHERE teams_users.userId= ${userId} AND teams_users.teamId=${results[0].teamId}
            `).then(function () {
                res.end()
            })
            })
})



//////////////////////////////////////// Chat API ///////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

/*  Adding new team message
    @params: take a req like : 
    {
        // author: "Eitan Gueron"
        // authorid: "1"
        // message: "bla bla"
        // teamId: 1
    }
    #return - message id + timstamp
*/
router.post('/teamschat', function (req, res) {
    const messageInfo = req.body
    const dt = dateTime.create();
    const  formatted = dt.format('Y-m-d H:M:S');
    console.log(formatted);
    sequelize.query(`INSERT INTO teams_chat VALUES(null,${messageInfo.teamId},"${messageInfo.author}",${messageInfo.authorid},"${messageInfo.message}","${formatted}")
                    `)
        .then( function (result) {
            const messageId = result[0]
            res.send({ "id": messageId ,"timestamp": formatted})
        })
})


/*
    get all messages of the team with teamId
*/
router.get('/teamschat/:teamId', function (req, res) {
    const teamId = req.params.teamId
    sequelize.query(`SELECT *
                      FROM teams_chat 
    WHERE teams_chat.teamId = ${teamId}
    ORDER BY teams_chat.timestamp
   `, { type: Sequelize.QueryTypes.SELECT })
        .then( results => res.send(results) )
})

router.get('/teamname/:teamId', function (req, res) {
    const teamId = req.params.teamId
    sequelize.query(`SELECT teams.teamName
                     FROM teams 
                     WHERE teams.teamId = ${teamId}
                    `, { type: Sequelize.QueryTypes.SELECT })
        .then( function (results) {
            res.send(results)
        })
})



/*
    get team id 
*/
router.get('/teamid/:teamName', function (req, res) {
    const teamName = req.params.teamName
    sequelize.query(`SELECT teams.teamId
                     FROM teams 
                     WHERE teams.teamName = "${teamName}"
                    `, { type: Sequelize.QueryTypes.SELECT })
        .then( function (results) {
            res.send(results)
        })
})




/*
    add track
 */
router.post('/tracking', function (req, res) {
    const trackInfo = req.body
    sequelize.query(`INSERT INTO tracking VALUES(${trackInfo.taskId},"${trackInfo.email}","${trackInfo.status}")
                    `)
        .then( function (result) {
            res.end()
        })
})



/*
    get track
 */
router.get('/tracking', function (req, res) {
    sequelize.query(`SELECT *
                     FROM tracking 
                    `, { type: Sequelize.QueryTypes.SELECT })
        .then( function (results) {
            res.send(results)
        })
})

/* get admin of a team
*/
router.get('/admin/:teamId', function (req, res) {
    const teamId = req.params.teamId
    sequelize.query(`SELECT *
    FROM users JOIN teams_users ON users.userId=teams_users.userId
    WHERE teams_users.teamId = ${teamId} AND teams_users.is_admin = TRUE
   `, { type: Sequelize.QueryTypes.SELECT })
        .then( results => res.send(results) )
})



/*
    get team id 
*/
router.get('/teamid/:teamName', function (req, res) {
    const teamName = req.params.teamName
    sequelize.query(`SELECT teams.teamId
                     FROM teams 
                     WHERE teams.teamName = "${teamName}"
                    `, { type: Sequelize.QueryTypes.SELECT })
        .then( function (results) {
            res.send(results)
        })
})

module.exports = router