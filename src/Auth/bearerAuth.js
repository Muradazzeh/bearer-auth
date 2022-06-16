`use strict`
require("dotenv").config();
const { Users }  = require("../models/index");
const jwt = require('jsonwebtoken');
const SECRET = process.env.API_SECRET || "This is secrit";
async function bearer(req, res, next) {
    if (!req.headers.authorization) {res.send("You Are not Authorized to check this page ,Please sign in ")}
    else{
        const bearerToken = req.headers.authorization.split(" ")[1];
        const parsedToken = jwt.verify(bearerToken, SECRET);
        //   console.Log(bearerToken)
        //   console.Log(user.token)


          const user = await Users.findOne({ where: { username: parsedToken.username } });
          req.data=user
          if (user.username) {
              return user,next()
          } else {
              throw new Error("Invalid Token");
          }
    }
}
module.exports=bearer