
var multipart = require('connect-multiparty');
var ThreadController = require('./threads');

module.exports = function(app, db) {
    var multipartMiddleware = multipart();
    var ThreadCtrl = new ThreadController(db);
    
    app.get ("/api/posts", ThreadCtrl.findAllThreads);
    app.get ("/api/posts/:id/:time", ThreadCtrl.findNewAnswers);
    app.get ("/api/posts/:id", ThreadCtrl.findThread);
    
    app.post("/api/posts", multipartMiddleware, ThreadCtrl.createNewThread);
    
    app.put("/api/posts", multipartMiddleware, ThreadCtrl.answerThread);
    
    app.delete("/api/posts/:threadId/:postId", ThreadCtrl.deletePost);
    
    app.get('*', function(req, res, next) {
        // Just send the index.html for other files to support HTML5Mode
        res.sendFile('web/index.html', { root: __dirname });
    });
}
