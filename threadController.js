function ThreadController(db) {
    
    var http = require('http');
    var fs = require('fs');
    
    var threads = db.collection("threads");
    
    /*
     * Find all threads
     */
    this.findThread = function(req, res, next) {
        "use strict";
        
        console.log("thread with id "+req.params.id)
        
        threads.findOne({'id': parseInt(req.params.id)}, function(err, thread) {
            "use strict";

            console.log(thread);
            return res.json(thread)
        });

    }
    
    
    /*
     * Find specific thread by id
     */
    this.findAllThreads = function(req, res, next) {
        "use strict";
        
        console.log("all threads")
        
        threads.find().sort('date', -1).toArray(function(err, items) {
            "use strict";

            console.log("Found " + items.length + " posts");

            return res.json(items)
        });
    }
    
    
    /*
     * Create new thread
     */
    this.createNewThread = function(req, res, next) {
        'use strict';

        console.log("new thread")
        
        req.body.id = createID(8);
        req.body.time = new Date();
        req.body.answers = [];
        req.body.author = "addsa"; // TODO: ip ??
        req.body.img = "images/" + req.files.myFile.originalFilename;
        
        threads.insert(req.body, function(err, inserted) {
            "use strict";
            
            console.log("inserted:")
            console.log(inserted)
            res.setHeader("Access-Control-Allow-Origin", "*");
            
            fs.readFile(req.files.myFile.path, function (err, data) {
                var newPath = req.body.img;
                fs.writeFile(newPath, data, function (err) {
                    console.log("File uploaded");
                });
            });
            
            res.send({ id: req.body.id});
        });
    }
    
        
    /*
     * Add post to thread
     */
    this.answerThread = function(req, res, next) {
        "use strict";

        console.log("answer thread")
        
        var id = parseInt(req.body.threadId);
        
        var post = {
            id: createID(8),
            time: new Date(),
            author: createID(10),
            message: req.body.message
        }
        
        if (req.files.myFile) {
            post.img = "images/" + req.files.myFile.originalFilename;
        }

        threads.update({id: id}, {'$push': {'answers': post}}, function(err, added) {
            "use strict";
            res.setHeader("Access-Control-Allow-Origin", "*");
            
            if (req.files.myFile) {
                fs.readFile(req.files.myFile.path, function (err, data) {
                    var newPath = post.img;
                    fs.writeFile(newPath, data, function (err) {
                        console.log("File uploaded");
                    });
                });
            }

            res.send({ id: id});
        });
    }
    
    /*
     * Create random number
     */
    function createID(length) {
        var arr = "";
        
        for (var i = 0; i < length; i++ ) {
            arr += getRandomInt(0, 9).toString();
        }
        
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        
        return parseInt(arr);
    }
}

module.exports = ThreadController;