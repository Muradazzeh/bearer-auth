`use strict`
require("dotenv").config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.API_SECRET || "This is secrit";

const Users =(sequelize,DataTypes)=>
 sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      UNIQUE:true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.VIRTUAL,
  }
  });



  module.exports=Users