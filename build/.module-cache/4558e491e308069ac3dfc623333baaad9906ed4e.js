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
                var pituus = data.threads.length;
                var temp = [];
                
                console.log(pituus)
                
                
                for (var j = 1; j <= 3; j++) {
                    temp[3 - j] = data.threads[i].answers[pituus - j];
                }
                data.threads[i].answers = temp;
            }
            
            console.log(temp)
            
        });
    }
}


function ThreadCtrl () {
}
    
