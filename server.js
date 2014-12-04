var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient // Driver for connecting to MongoDB

var routes = require('./routes'); // Routes for our application


MongoClient.connect('mongodb://localhost:27017/lauta', function(err, db) {
    app.use('/', express.static(path.join(__dirname, '')));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use('/partials', express.static(__dirname + '/partials'));
    
    routes(app, db);
        
    app.listen(3000);

    console.log('Server started: http://localhost:3000/');
});