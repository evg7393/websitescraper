//1.dependencies
//2.bodyparser
//3.expresshandlebars and add the html in the handlebar files
//4.mongo and mongoose-ORM package (run mongod and noder server.js in cli for connection to db)

var express = require('express');
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");

//1.port to host designated port or 3000
var PORT = process.env.PORT || 3001;

//1.initiate the express app
var app = express()

//1.express router
//5.required routes
var router = express.Router();
require("./config/routes")(router);

//1.public folder as a static directory
app.use(express.static(__dirname + "/public"));


//3.static folder
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");


//2.body parser
app.use(bodyParser.urlencoded({
    extended: false
}));


//1.request go through the router middleware
app.use(router);

//4.if deployed, use the deployed database otherwise use local mongo headlines
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";


//4.connect mongoose to db
mongoose.connect(db, function(error){
    if (error){
        console.log(error);
    }
    else {
        console.log ("mongoose connection is successful");
    }
});

//1.listen on port

app.listen(PORT, function(){
    console.log("listening on port:" + PORT);
});


