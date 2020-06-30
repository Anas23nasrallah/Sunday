const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
//********* Here you should change the password "35533553" => YOUR_OWN_DB_PASSWORD */
const sequelize = new Sequelize('mysql://root:35533553@localhost/sunday_finalProject')

const crypto = require('crypto');


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
*/
router.post('/signup', function (req, res) {
    const password = req.body.password
    const name = req.body.name
    const salt = createRandomSalt()
    const cipher = encodeDesECB(password, salt, "10110101")
    sequelize.query(`INSERT INTO username_password VALUES(null,"${name}","${salt}","${cipher}")`)
        .then(function (result) {
            res.end()
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
                if (cipher == usersCipher) { res.send({ "result": "OK" }) }
                else {
                    res.send({ "result": "NOPE", "userId": results[0].id })
                }
            } else {
                res.end()
            }

        })
})



module.exports = router