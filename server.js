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

    
    app.get("/api/posts/:id", function(req, res, next) {
        "use strict";
        
        var threads = db.collection("threads");
        console.log("posts")
        
        threads.find().sort('date', -1).toArray(function(err, items) {
            "use strict";

            console.log("Found " + items.length + " posts");

//            callback(err, items);
            return res.json(items)
        });

    });
    
    app.use('/partials', express.static(__dirname + '/partials'));
//    app.all('/*', function(req, res, next) {
//        // Just send the index.html for other files to support HTML5Mode
//        res.sendFile('index.html', { root: __dirname });
//    });

    
    app.post("/newpost", handleNewPost);

    app.listen(3000);

    console.log('Server started: http://localhost:3000/');
});

//getPosts = function(req, res, next) {
//    "use strict";
//    
//    console.log("posts")
//    return res.json(["asdfsa","dsads"])
//}

handleNewPost = function(req, res, next) {
    "use strict";
    
    console.log("asd")
//    var name = req.body.commentName;
//    var email = req.body.commentEmail;
//    var body = req.body.commentBody;
//    var permalink = req.body.permalink;
//
//    // Override the comment with our actual user name if found
//    if (req.username) {
//        name = req.username;
//    }
//
//    if (!name || !body) {
//        // user did not fill in enough information
//
//        posts.getPostByPermalink(permalink, function(err, post) {
//            "use strict";
//
//            if (err) return next(err);
//
//            if (!post) return res.redirect("/post_not_found");
//
//            // init comment form fields for additional comment
//            var comment = {'name': name, 'body': "", 'email': ""}
//
//            var errors = "Post must contain your name and an actual comment."
//            return res.render('entry_template', {
//                title: 'blog post',
//                username: req.username,
//                post: post,
//                comment: comment,
//                errors: errors
//            });
//        });
//
//        return;
//    }
//
//    // even if there is no logged in user, we can still post a comment
//    posts.addComment(permalink, name, email, body, function(err, updated) {
//        "use strict";
//
//        if (err) return next(err);
//
//        if (updated == 0) return res.redirect("/post_not_found");
//
//        return res.redirect("/post/" + permalink);
//    });
}