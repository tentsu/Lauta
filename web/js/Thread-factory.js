/*
 * Thread Factory
 * @namespace Factories
 */
(function() {
    'use strict';

angular.module('Thread')
    .factory('Threads', ThreadResource)
    .factory('ThreadFactory', ThreadFactory);
    
ThreadFactory.$inject = ['$http', '$q', 'Threads', '$upload']; 
ThreadResource.$inject = ['$resource'];

/*
 * @namespace ThreadFactory 
 * @desc Actual controller for frontpage of the app.
 * @memberOf Factories
 */
function ThreadFactory($http, $q, Threads, $upload) {
    
    var latest = new Date();
    latest.setHours(latest.getHours() - 1);
    
    function getThreads() {
        var d = $q.defer();
        Threads.query({}, function(data) {
            for (var i = 0; i < data.length; i++) {
                var answerCount = data[i].answers.length;
                var temp = [];
                
                for (var j = 1; j <= 3; j++) {
                    if (data[i].answers[answerCount - j] != undefined) {
                        temp.unshift(data[i].answers[answerCount - j]);
                    }
                }
                
                data[i].answers = temp;
                data[i].answerCount = answerCount;
            }
            
            d.resolve(data);
        }, function (response) {
            console.log(response)
        });

        return d.promise;
    }
    
    
    /*
     * @name getThread
     * @desc Simple resource class to get thread data from DB through HTTP.
     * @param {Number} id ID of the thread to get
     * @return {Promise}
     * @memberOf Factories.ThreadFactory
     */
    function getThread(id) {
        var d = $q.defer();
        Threads.get({id: id}, function(response) {
            response.answerCount = response.answers.length;
            d.resolve(response);
        }, function (response) {
            console.log(response)
        });
        
        return d.promise;
    }
    
    
    /*
     * @name getNewAnswers
     * @desc Gets new answers that have come to a thread after some time
     * @param {specs} Specification to which answers to get
     * @param {specs.id} Thread id
     * @param {specs.time} Posts posted after this timestamp are fetched
     * @return {Promise} Array of answers
     */
    function getNewAnswers(specs) {
        var d = $q.defer();
        Threads.query(specs, function(response) {
            d.resolve(response);
        }, function (response) {
            console.log(response)
        });
        
        return d.promise;
    }
    
    
    /*
     * @name addPost
     * @desc Add post to database as new thread or answer to thread
     * @param {post} Post's details
     * @param {post.title} Post's title (answers don't have)
     * @param {post.message} Post's message
     * @param {post.img} Post's image
     * @return {Promise} Object with inserted thread's id
     */
    function addPost(post) {
        var d = $q.defer();
        var method = (!post.threadId) ? 'POST' : 'PUT';
        
        if (post.img && post.img.size > 1048578) { // images can be 1MB max
            console.log("img too big");
            d.reject(false);
        } else if (!postValidation(post)) {
            console.log("Fields empty");
            d.reject(false);
        } else {
            $upload.upload({
                url: '/api/posts',
                method: method,
                file: post.img,
                data: post,
                fileFormDataName: 'myFile'
            }).success(function(data, status, headers, config) {
                d.resolve(data);
            });
        }
        
        return d.promise;
    }
    
    
    /*
     * @name deletePost
     * @desc Add post to database as new thread or answer to thread
     * @param {post} Post's details
     * @param {post.title} Post's title (answers don't have)
     * @param {post.message} Post's message
     * @param {post.img} Post's image
     * @return {Promise} Object with inserted thread's id
     */
    function deletePost(threadId, postId) {
        var d = $q.defer();
        
        Threads.delete({threadId: threadId, postId: postId}, function(response) {
            d.resolve(response);
        }, function (response) {
            console.log(response)
        });
        
        return d.promise;
    }
    
    
    function postValidation(post) {
        if (!post.title && !post.message && !post.img) {
            return false;
        }
        
        return true;
    }
    
    return {
        getThreads: getThreads,
        getThread: getThread,
        addPost: addPost,
        deletePost: deletePost,
        getNewAnswers: getNewAnswers
    };
}

    
/*
 * @name ThreadResource
 * @desc Simple resource class to get thread data from DB through HTTP.
 */
function ThreadResource($resource) {
    var transformRequest = function(data) {
        if (data === undefined)
          return data;

        var fd = new FormData();
        angular.forEach(data, function(value, key) {
            if (value instanceof FileList) {
                if (value.length == 1) {
                    fd.append(key, value[0]);
                } else {
                    angular.forEach(value, function(file, index) {
                        fd.append(key + '_' + index, file);
                    });
                }
            } else {
                fd.append(key, value);
            }
        });

        return fd;
    }
    
    return $resource("/api/posts/:id/:time/:threadId/:postId",
        {id: "@id", time: '@time', threadId: '@threadId', postId: '@postId'},
        { 'get':    {method:'GET'},
          'save':   {
                method:'POST',
                transformRequest: transformRequest, 
                header: {'Content-type': undefined}},
          'query':  {method:'GET', isArray:true},
          'remove': {method:'DELETE'},
          'delete': {method:'DELETE'}
    });
}

})();
    