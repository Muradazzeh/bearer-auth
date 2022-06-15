"use strict"
const express = require("express");
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const { Users }  = require("../models/index");


const userRouter = express.Router();
userRouter.get("/", Home);
userRouter.post("/signup",SignUp)
userRouter.get("/signup",allSignUp)

function Home (req,res){
    res.status(200).send("Home sweet Home , here We go again")
}
async function SignUp(req,res){
    try {
        let username = req.body.username;
        let password = await bcrypt.hash(req.body.password, 10);
        
        const record = await Users.create({
            username: username,
            password: password,
        });
        res.status(201).json(record);
        // res.json(record);
      } catch (e) { res.status(403).send('Error Creating User'); }
    
}

async function allSignUp(req,res){
    try {
       
        const record = await Users.findAll(req.body);
        res.status(201).json(record);
      } catch (e) { res.status(403).send('Error Creating User'); }
    
}
module.exports = userRouter;