/*
 * Thread Factory
 * @namespace Factories
 */
(function() {
    'use strict';

angular.module('Thread')
    .factory('Threads', ThreadResource)
    .factory('ThreadFactory', ThreadFactory);
    
ThreadFactory.$inject = ['$http', '$q', 'Threads']; 
ThreadResource.$inject = ['$resource'];

/*
 * @namespace ThreadFactory 
 * @desc Actual controller for frontpage of the app.
 * @memberOf Factories
 */
function ThreadFactory($http, $q, Threads) {
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
     * @return {$q.promise}
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

    return {
        getThreads: getThreads,
        getThread: getThread
    };
}

    
/*
 * @name ThreadResource
 * @desc Simple resource class to get thread data from DB through HTTP.
 */
function ThreadResource($resource) {
    return $resource("/api/posts/:id",
        {id: "@id"},
        { 'get':    {method:'GET'},
          'save':   {method:'POST'},
          'query':  {method:'GET', isArray:true},
          'remove': {method:'DELETE'},
          'delete': {method:'DELETE'}
    });
}

})();
    