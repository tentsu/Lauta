angular.module("Lauta", ["Main", "react", "ngRoute"])
.controller("ThreadCtrl", ThreadCtrl)
.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            template: '<react-component name="Lauta" id="react" props="threads" />',
            controller: 'MainCtrl',
        })
        .when('/:threadId', {
            template: 'adads',
            controller: 'ThreadCtrl',
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
    .directive('lauta', function( reactDirective ) {
        return reactDirective( Lauta );
    });

function MainCtrl ($scope, $http, $interval) {
    $scope.threads = [];
    getThreads();

    $interval( getThreads, 5000 );

    function getThreads() {
        console.log("Loading messages...");
        $http.get("threads.json").success( function(data) {
            $scope.threads = data;
            
            for (var i = 0; i < data.threads.length; i++) {
                console.log(data.threads[i].answers)
                for (var j = 0; i < data.threads[i].answers.length; i++) {
                    if (data.threads[i].answers.length > 3)
                        delete data.threads[i].answers[j];
                }
            }
        });
    }
}


function ThreadCtrl () {
}
    
