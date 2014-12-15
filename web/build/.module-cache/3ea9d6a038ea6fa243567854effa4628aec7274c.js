angular.module("Lauta", ["Main", "react", "ngRoute"])
.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
            template: '<react-component name="Lauta" id="react" props="threads" />',
            controller: 'ThreadController',
        })
        .when('/:threadId', {
            template: '<react-component name="Lauta" id="react" props="threads" />',
            controller: 'ThreadController',
        })
        .when('/account', {
            template: '<h1>Account</h1>'
        })
        .otherwise({
            template: "404!"
        });
});


angular.module("Main", []);

angular.module("Main")
    .controller("MainCtrl", MainCtrl)
    .controller("ThreadCtrl", ThreadCtrl)
    .directive('lauta', function( reactDirective ) {
        return reactDirective( Lauta );
    });

function MainCtrl ($scope, $http, ThreadCtrl) {
    $scope.threads = [];
    getThreads();

    $interval( getThreads, 5000 );

    function getThreads() {
        console.log("Loading messages...");
        $http.get("threads.json").success( function(data) {
            $scope.threads = data;
        });
    }
}
function ThreadCtrl ($scope, $http, $interval) {
    $scope.threads = [];
    getThreads();

    $interval( getThreads, 5000 );

    function getThreads() {
        console.log("Loading messages...");
        $http.get("threads.json").success( function(data) {
            $scope.threads = data;
        });
    }
}
    
