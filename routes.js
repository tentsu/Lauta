
var ThreadController = require('./threadController');

module.exports = function(app, db) {
    console.log("exports");
    
    var ThreadCtrl = new ThreadController(db);
    
    app.get("/api/posts", ThreadCtrl.findAllThreads);
    app.get("/api/posts/:id", ThreadCtrl.findThread); 
    app.post("/api/posts/:id", ThreadCtrl.addPost);
    
    app.get('*', function(req, res, next) {
        // Just send the index.html for other files to support HTML5Mode
        res.sendFile('index.html', { root: __dirname });
    });
}
