(function() {
  'use strict';
    
angular.module("Lauta", ["Main", "react", "ngRoute"])
.controller("ThreadCtrl", ThreadCtrl)
.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
            template: '<react-component name="Lauta" id="react" props="threads" />',
            controller: 'MainCtrl',
        })
        .when('/:threadId', {
            templateUrl: 'partials/thread.html',
            controller: 'ThreadCtrl',
        })
        .when('/account', {
            template: '<h1>Account</h1>'
        })
        .otherwise({
            template: "404!"
        });
    
    
    $locationProvider.html5Mode(true);
});


angular.module("Main", []);

angular.module("Main")
    .controller("MainCtrl", MainCtrl)
    .directive('lauta', function( reactDirective ) {
        return reactDirective( Lauta );
    })
    .directive('openedThread', function( reactDirective ) {
        return reactDirective( OpenedThread );
    });

function MainCtrl ($scope, $http, $interval) {
    $scope.threads = [];
    getThreads();

//    $interval( getThreads, 5000 );

    function getThreads() {
        console.log("Loading messages...");
        
        // TODO: Fetch from DB
        $http.get("threads.json").success( function(data) {
            $scope.threads = data;
            
            for (var i = 0; i < data.threads.length; i++) {
                var pituus = data.threads[i].answers.length;
                var temp = [];
                
                for (var j = 1; j <= 3; j++) {
                    temp[3 - j] = data.threads[i].answers[pituus - j];
                }
                data.threads[i].answers = temp;
                data.threads[i].answerCount = pituus;
            }
//            console.log(data)
        });
    }
}


function ThreadCtrl ($scope, $http, $interval, $routeParams) {
    $scope.params = $routeParams;
    $scope.thread = {}
    
    getThreads();

    $interval( getThreads, 5000 );

    function getThreads() {
        console.log("Loading messages...");
        // TODO: Fetch from DB
        $http.get("threads.json").success( function(data) {
            
            for (var i = 0; i < data.threads.length; i++) {
                if (data.threads[i].op.id == $routeParams.threadId) {
                    $scope.thread = data.threads[i];
                }
            }
            console.log( $scope.thread)
        });
        
        
    }
}
})();
    
