function ThreadController(db) {
    
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
        
        threads.find().sort('date', -1).toArray(function(err, items) {
            "use strict";

            console.log("Found " + items.length + " posts");

            return res.json(items)
        });
    }
    
    
    /*
     * Add post to thread
     */
    this.addPost = function(req, res, next) {
        "use strict";

        console.log("new post to thread")
//        console.log(req)

        threads.update({id:id}, {'$push': {'answers': answer}}, function(err, asd) {
            "use strict";

            if (err) return callback(err, null);

    //        callback(err, numModified);
        });
    }
    
    
    /*
     * Add post to thread
     */
    this.addNewThread = function(req, res, next) {
        "use strict";

        console.log("new thread")
        console.log(req.body)
        
        req.body.id = createThreadId();
        req.body.time = new Date();
        req.body.answers = [];
        req.body.author = "addsa";
        req.body.img = "http://placehold.it/300x100";

        threads.insert(req.body, function(err, inserted) {
            "use strict";
            
            console.log(inserted)
            res.setHeader("Access-Control-Allow-Origin", "*");
            
            res.send((req.body.id).toString());

    //        callback(err, numModified);
        });
    }
    
    function createThreadId() {
        var arr = "";
        
        for (var i = 0; i < 8; i++ ) {
            arr += getRandomInt(0, 9).toString();
        }
        
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        
        return arr;
    }
}

module.exports = ThreadController;