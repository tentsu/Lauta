var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient // Driver for connecting to MongoDB

MongoClient.connect('mongodb://localhost:27017/lauta', function(err, db) {
    app.use('/', express.static(path.join(__dirname, '')));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use('/partials', express.static(__dirname + '/partials'));
    
    
    
    var threads = db.collection("threads");

    
    app.get("/api/posts", function(req, res, next) {
        "use strict";
        
        console.log("all threads")
        
        threads.find().sort('date', -1).toArray(function(err, items) {
            "use strict";

            console.log("Found " + items.length + " posts");

//            callback(err, items);
            return res.json(items)
        });

    });

    app.get("/api/posts/:id", function(req, res, next) {
        "use strict";
        
        console.log("thread with id "+req.params.id)
        console.log(typeof(req.params.id))
        
        threads.findOne({'id': parseInt(req.params.id)}, function(err, thread) {
            "use strict";

            console.log(thread);

//            callback(err, items);
            return res.json(thread)
        });

    });
    
    app.post("/api/posts/:id", function(req, res, next) {
        "use strict";

        console.log("new post to thread")
        console.log(req)

        threads.update({id:id}, {'$push': {'answers': answer}}, function(err, asd) {
            "use strict";

            if (err) return callback(err, null);

    //        callback(err, numModified);
        });
    });
    
    app.get('*', function(req, res, next) {
        // Just send the index.html for other files to support HTML5Mode
        res.sendFile('index.html', { root: __dirname });
    });
    

    
    app.listen(3000);

    console.log('Server started: http://localhost:3000/');
});