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
    function getThreads() {
        console.log("Loading messages...");

        var d = $q.defer();
        Threads.query({}, function(response) {
            var data = response;

            for (var i = 0; i < data.length; i++) {
                var pituus = data[i].answers.length;
                var temp = [];

                for (var j = 1; j <= 3; j++) {
                    temp[3 - j] = data[i].answers[pituus - j];
                }
                data[i].answers = temp;
                data[i].answerCount = pituus;
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
        console.log("Loading messages...");

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
     * @name addThread
     * @desc Add thread to database
     * @param {post} Post's details
     * @param {post.title} Post's title
     * @param {post.message} Post's message
     * @param {post.img} Post's image
     * @return {Promise} Object with inserted thread's id
     */
    function addThread(post) {
        var d = $q.defer();
        
        $upload.upload({
            url: '/api/posts',
            method: 'POST',
            file: post.img,
            data: post,
            fileFormDataName: 'myFile'
        }).success(function(data, status, headers, config) {
            d.resolve(data);
        });
        
        return d.promise;
    }
    
    
    /*
     * @name addAnswer
     * @desc Add answer post to database
     * @param {post} Post's details
     * @param {post.message} Post's message
     * @param {post.img} Post's image
     * @return {Promise} Object with inserted thread's id
     */
    function addAnswer(id, post) {
        var d = $q.defer();
        
        console.log(post)
        
        $upload.upload({
            url: '/api/posts/',
            method: 'PUT',
            file: post.img,
            data: post,
            fileFormDataName: 'myFile'
        }).success(function(data, status, headers, config) {
            d.resolve(data);
        });
        
        return d.promise;
    }
    
    return {
        getThreads: getThreads,
        getThread: getThread,
        addThread: addThread,
        addAnswer: addAnswer
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
    
    return $resource("/api/posts/:id",
        {id: "@id"},
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
    