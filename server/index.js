const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

dotenv.config({path: './config.env'});

// connecting with cloud db
require('./db/conn');

app.use(express.json());  // to recognise the incoming req obj as JSON obj

app.use(require('./router/auth'));  // app.use() is a global middleware 
                                    // which runs after every req    
const port = process.env.PORT || 3001;

if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"));
}

app.listen(port, () =>{
    console.log(`listening to port ${port}`)
});