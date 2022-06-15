`use strict`
const express = require("express");
const bearerAuth=require("../Auth/bearerAuth")
const Sercret= express.Router();

Sercret.get("/SecretPage",bearerAuth,handleSecretpage)

 function handleSecretpage (req,res){
    let result=req.data
    res.json({
        'message': 'You are authorized to view theis page ',
        'user': result
    });
    
}

module.exports = Sercret;