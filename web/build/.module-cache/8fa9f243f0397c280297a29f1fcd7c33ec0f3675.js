angular.module("Lauta", ["Main", "react"]);
angular.module("Main", []);

angular.module("Main")
    .controller("MainCtrl", MainCtrl)
    .directive('lauta', function( reactDirective ) {
        return reactDirective( Lauta );
    });

function MainCtrl ($scope, $http, $timeout) {
    $scope.threads = [];
    getThreads();

    $timeout( getThreads, 5000 );
    
    
    function getThreads() {
        console.log("haetaan...");
        $http.get("threads.json").success( function(data) {
            $scope.threads = data;
        });
    }
}
    
