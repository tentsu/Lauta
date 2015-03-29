var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;

var routes = require('./routes');


MongoClient.connect('mongodb://localhost:27017/lauta', function(err, db) {
    app.use('/', express.static(path.join(__dirname, '')));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    
//    app.use('/web/partials', express.static(__dirname + '/web/partials'));
    
    routes(app, db);
        
    app.listen(1337);

    console.log('Server started: http://localhost:1337/');
});