function ThreadController(db) {
    
    var threads = db.collection("threads");
    
    /*
     * Find all threads
     */
    this.findThread = function(req, res, next) {
        "use strict";
        
        console.log("thread with id "+req.params.id)
        console.log(typeof(req.params.id))
        
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
        console.log(req)

        threads.update({id:id}, {'$push': {'answers': answer}}, function(err, asd) {
            "use strict";

            if (err) return callback(err, null);

    //        callback(err, numModified);
        });
    }
}

module.exports = ThreadController;