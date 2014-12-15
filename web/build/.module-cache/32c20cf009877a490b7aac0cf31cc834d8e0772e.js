angular.module("Lauta", ["Main", "react"]);
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
        console.log("haetaan...");
        $http.get("threads.json").success( function(data) {
            $scope.threads = data;
        });
    }
}
    
