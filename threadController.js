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

//            console.log(thread);
            return res.json(thread)
        });
    }
    
    
    /*
     * Find specific thread by id
     */
    this.findAllThreads = function(req, res, next) {
        "use strict";
        
        console.log("all threads")
        
        threads.find().sort('updateTime', -1).toArray(function(err, items) {
            "use strict";

            console.log("Found " + items.length + " posts");

            return res.json(items)
        });
    }
    
    
    /*
     * Find new answers to a thread
     */
    this.findNewAnswers = function(req, res, next) {
        "use strict";
        
        threads.aggregate([
            {$unwind: "$answers"},
            {$match: {
                "id": parseInt(req.params.id),
                "answers.time": {
                    "$gt": new Date((new Date(req.params.time).toISOString()))
                }
            }},
            {$project: {
                _id: 0,
                "id": "$answers.id",
                "time": "$answers.time",
                "author": "$answers.author",
                "message": "$answers.message",
                "img": "$answers.img"
            }},
            {$sort: {
                "time" : 1
            }}
        ], function(err, items) {
            "use strict";

            console.log("Found " + items.length + " new answers");
            
            console.log(items)

            return res.json(items)
        });
    }
    
    
    /*
     * Create new thread
     */
    this.createNewThread = function(req, res, next) {
        'use strict';
        
        var post = {
            id: createID(8),
            time: new Date(),
            updateTime: new Date(),
            author: createID(10),
            title: req.body.title,
            message: req.body.message,
            answers: []
        }
        
        if (!post.title) {
            post.title = (post.message).substring(0, 50);
            
            if (post.message.length > 50) {
                post.title += "...";
            }
        }
        
        if (req.files.myFile) {
            post.img = "images/" + req.files.myFile.originalFilename;
        }
        
        threads.insert(post, function(err, inserted) {
            'use strict';
            
            res.setHeader("Access-Control-Allow-Origin", "*");
            
            if (req.files.myFile) {
                fs.readFile(req.files.myFile.path, function (err, data) {
                    var newPath = post.img;
                    fs.writeFile(newPath, data, function (err) {
                        console.log("File uploaded");
                    });
                });
            }
            
            res.send({ id: post.id});
        });
    }
    
        
    /*
     * Answer thread
     */
    this.answerThread = function(req, res, next) {
        'use strict';

        console.log("answer thread")
        
        var post = {
            id: createID(8),
            time: new Date(new Date().setMilliseconds(0)),
            author: createID(10),
            message: req.body.message
        }

        if (req.files.myFile) {
            var format = req.files.myFile.originalFilename.split(".");
            post.img = 'images/' + createID(6) + '.' + format[format.length - 1];
        }
        
        var doc = { id: parseInt(req.body.threadId) };
        
        var operations = {
            '$set': {
                'updateTime': new Date() 
            },
            '$push': {'answers': post}
        };

        threads.update(doc, operations, function(err, added) {
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

            res.send({id: post.id});
        });
    }
    
    /*
     * Delete post (thread and answer)
     */
    this.deletePost = function(req, res, next) {
        console.log("delete post")
        
        var threadId = parseInt(req.params.threadId);
        var postId = parseInt(req.params.postId);
        
        console.log(threadId)
        console.log(postId)
        
        
        var doc = { id : threadId };
        
        // Deleting whole thread
        if (threadId == postId) {
            threads.distinct('answers.img', {'id': doc.id}, function(err, imgs) {
                for (var i = 0; i < imgs.length; i++) {
                    fs.unlink(imgs[i]);
                }

                threads.remove(doc, function(err, removed) {
                    console.log("removed item");
                });
            });
            
            res.send(false);
        // Deleting single post
        } else {
            var operations = {
                '$pull': {
                    'answers': {
                        'id': postId
                    }
                }
            };

            threads.findOne({id: threadId, 'answers.id': postId}, function(err, item) {
                for (var i = 0; i < item.answers.length; i++) {
                    if (item.answers[i].id == postId && item.answers[i].img != null) {
                        fs.unlink(item.answers[i].img);
                    }
                }
                
                threads.update(doc, operations, function(err, removed) {
                    console.log("Removed answer post from thread");
                });
            });
            res.send(req.params);
        }
        
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