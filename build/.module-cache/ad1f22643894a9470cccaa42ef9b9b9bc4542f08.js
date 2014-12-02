(function() {
    'use strict';

angular.module("Thread")
.factory('ThreadFactory', ThreadFactory)
.controller('ThreadCtrl', ThreadCtrl);
         
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
         
function ThreadFactory($http, $q) {
    function getThreads() {
        console.log("Loading messages...");

        // TODO: Fetch from DB
         return $http.get("threads.json").then( function(response) {
             var data = response.data;
             
             for (var i = 0; i < data.threads.length; i++) {
                var pituus = data.threads[i].answers.length;
                var temp = [];

                for (var j = 1; j <= 3; j++) {
                    temp[3 - j] = data.threads[i].answers[pituus - j];
                }
                data.threads[i].answers = temp;
                data.threads[i].answerCount = pituus;
            }
            console.log(data)
            return data.data;
        });
    }

    return {
        getThreads: getThreads
    }
}


})();
    