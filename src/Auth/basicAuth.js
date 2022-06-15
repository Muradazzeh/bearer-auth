`use strict`
require("dotenv").config();
const { Users }  = require("../models/index");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.API_SECRET || "This is secrit";
const base64 = require('base-64');
async function basicAuth(req, res, next) {
 
    if (req.headers.authorization) {
        console.log(req.headers.authorization)
        
        let basicHeaderParts = req.headers.authorization.split(" ");

        let encoded = basicHeaderParts[1];
       

        let decoded = base64.decode(encoded);
        
        let username = decoded.split(":")[0];
        let password = decoded.split(":")[1];
        const user = await Users.findOne({ where: { username: username } })
        
        req.data=user
        const valid = await bcrypt.compare(password, user.password)
        if (valid) {
            let newToken = jwt.sign({ username: user.username }, SECRET,{expiresIn: "15m"});
            console.log('************************', newToken);
            user.token = newToken;

            return user, next()
           
        } 
        else {
            throw new Error("Invalid user");
        }
        
    }
}

module.exports = basicAuth;