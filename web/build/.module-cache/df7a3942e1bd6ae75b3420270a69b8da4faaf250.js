(function() {
  'use strict';
    
angular.module("Lauta", ["Main", "Thread", "react", "ngRoute"])
.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
            template: '<react-component name="Lauta" id="react" props="threads" />{{threads}}',
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
angular.module("Thread", []);
    

angular.module("Main")
    .controller("MainCtrl", MainCtrl)
    .directive('lauta', function( reactDirective ) {
        return reactDirective( Lauta );
    })
    .directive('opened', function( reactDirective ) {
        return reactDirective( Opened );
    });

function MainCtrl ($scope, $http, $interval, ThreadFactory) {
    $scope.threads = [];
    $scope.threads = ThreadFactory.getThreads();
    
    $interval( function() {
        console.log($scope.threads)
    }, 1000);

}

})();
    
