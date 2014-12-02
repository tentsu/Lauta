angular.module("Lauta", ["Main", "react"]);
angular.module("Main", []);

angular.module("Main")
    .controller("MainCtrl", MainCtrl)
    .directive('lauta', function( reactDirective ) {
      return reactDirective( ThreadList );
    });

function MainCtrl ($scope, $http) {
    console.log("fsafa");
    $scope.threads = [];

    $http.get("threads.json").success( function(data) {
        $scope.threads = data;
        console.log(data);
    });
}
    
