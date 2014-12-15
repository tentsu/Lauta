(function() {
  'use strict';
    
angular.module("Lauta", ["Main", "Thread", "react", "ngRoute", "ngResource"])
.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
            template: '<react-component name="Lauta" id="react" props="threads" />{{threads}}',
            controller: 'MainCtrl',
        })
        .when('/:threadId', {
            templateUrl: 'web/partials/thread.html',
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
        return {
            link: function (scope, el, attrs) {
                reactDirective( Lauta({scope: scope}) )
            }
        }
    })
    .directive('opened', function( reactDirective ) {
        return reactDirective( Opened );
    });
    

function MainCtrl ($scope, $http, $interval, ThreadFactory) {
    $scope.threads = [];
    $scope.threads = ThreadFactory.getThreads();
    $scope.threads.then( function(data) {
//        console.log(data.e)
        $scope.threads.threads = data;
    })
    
    $scope.asd = function() {
        console.log("csafsa")
    };
}

})();
    
