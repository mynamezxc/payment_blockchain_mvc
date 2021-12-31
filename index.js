const secret_session = "c19dd99f6f72f6923b732e3705cacfa6";
var express = require("express");
var session = require('express-session');
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use("/scripts", express.static(__dirname+"/node_modules/web3.js-browser/build/"));
app.use(session({
    resave: true, 
    saveUninitialized: true, 
    secret: secret_session, 
    cookie: { maxAge: 6000000000 }
}));

var server = require("http").Server(app);
var io = require("socket.io")(server);
require('dotenv').config();

server.listen(process.env.port | 3000);

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));

const mongoose = require('mongoose');

mongoose.connect(process.env.mongodb, function(err) {
    if (err) {
        console.log("Mongoose connected error" + err);
    } else {
        console.log("Mongoose connected");
    }
});

var web3 = require('web3');
var web3 = new web3('http://127.0.0.1:7545');


require("./controllers/home")(app, web3);
require("./controllers/register")(app, web3);
require("./controllers/login")(app, web3);

// User role
require("./controllers/user/token")(app, web3);
