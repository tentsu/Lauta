(function() {
    'use strict';

angular.module("Thread")
    .factory("Threads", Threads)
    .factory('ThreadFactory', ThreadFactory)
    .controller('ThreadCtrl', ThreadCtrl);

        
function ThreadFactory($http, $q, Threads) {
    function getThreads() {
        console.log("Loading messages...");

        var d = $q.defer();
        Threads.query({id:122}, function(response) {
//            console.log(response);
            
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
        });
        
        return d.promise;
    }

    return {
        getThreads: getThreads
    };
}

    
function Threads($resource) {
    return $resource("/api/posts/:id",
        {id: "@id"},
        { 'get':    {method:'GET'},
          'save':   {method:'POST'},
          'query':  {method:'GET', isArray:true},
          'remove': {method:'DELETE'},
          'delete': {method:'DELETE'}
    });
}
    
     
function ThreadCtrl ($scope, $http, $interval, $routeParams) {
    $scope.params = $routeParams;
    $scope.thread = {};
    
    getThreads();

    $interval( getThreads, 5000 );

    function getThreads() {
        console.log("Loading messages...");
        // TODO: Fetch from DB
         $http.get("threads.json").success( function(data) {
            
            for (var i = 0; i < data.threads.length; i++) {
                if (data.threads[i].op.id == $routeParams.threadId) {
                    $scope.thread = data.threads[i];
                    break;
                }
            }
        });
    }
}

})();
    