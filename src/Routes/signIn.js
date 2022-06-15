`use strict`
const express = require("express");
const basicAuth=require("../Auth/basicAuth")
const signIn= express.Router();

signIn.post("/signin",basicAuth,handleSignIn)

 function handleSignIn (req,res){
    let result=req.data
    res.status(200).json(result)
    
}

module.exports = signIn;