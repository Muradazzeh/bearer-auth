`use strict`
require("dotenv").config();
let port = process.env.PORT || 3010
const server =require("./src/server")

const { db } = require("./src/models/index")

db.sync()
    .then(() => {
       
        server.start(port);
    })
    .catch(console.error);