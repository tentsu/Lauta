
var ThreadController = require('./threadController');

module.exports = function(app, db) {
    var ThreadCtrl = new ThreadController(db);
    
    app.get ("/api/posts", ThreadCtrl.findAllThreads);
    app.get ("/api/posts/:id", ThreadCtrl.findThread);
    
    app.post("/api/posts", ThreadCtrl.createNewThread);
    
    app.put("/api/posts/:id", ThreadCtrl.answerThread);
    
    app.get('*', function(req, res, next) {
        // Just send the index.html for other files to support HTML5Mode
        res.sendFile('web/index.html', { root: __dirname });
    });
}
