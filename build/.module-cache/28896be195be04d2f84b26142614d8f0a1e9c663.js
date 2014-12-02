(function() {
    'use strict';

angular.module("Thread")
.factory("asd", asd)
.factory('ThreadFactory', ThreadFactory)
.controller('ThreadCtrl', ThreadCtrl);

        
function ThreadFactory($http, $q, asd) {
    function getThreads() {
        console.log("Loading messages...");
        
//        return $http.get("/api/posts/122").when( function(response) {
//            console.log(response)
//            return response;
//        });
//        
        var d = $q.defer();
        asd.query({id:122}, function(data) {
            console.log(data);
            d.resolve(data);
        });
//           
        return d.promise;
        

//        // TODO: Fetch from DB
//        return $http.get("threads.json").then( function(response) {
//             var data = response.data;
//             
//             for (var i = 0; i < data.threads.length; i++) {
//                var pituus = data.threads[i].answers.length;
//                var temp = [];
//
//                for (var j = 1; j <= 3; j++) {
//                    temp[3 - j] = data.threads[i].answers[pituus - j];
//                }
//                data.threads[i].answers = temp;
//                data.threads[i].answerCount = pituus;
//            }
//            console.log(data)
//            return $q.when(!!());
//        });
    }

    return {
        getThreads: getThreads
    };
}

    
function asd($resource, $http) {
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
    