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
    
    $scope.fullImage = function($event) {
        console.log("asd");
        console.log(angular.element($event.target));
    };
    
    function getThreads() {
        console.log("haetaan...");
        $http.get("threads.json").success( function(data) {
            $scope.threads = data;
        });
    }
}
    
