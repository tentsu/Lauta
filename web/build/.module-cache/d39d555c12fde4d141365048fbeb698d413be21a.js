angular.module("Lauta", ["Main"]);

angular.module("Main", []);

angular.module("Main")
    .controller("MainCtrl", MainCtrl);

MainCtrl.$inject = ["$scope", "$http"]

function MainCtrl ($scope, $http) {
    
    $http.get("threads.json").success( function(data) {
        $scope.threads = data;
        console.log(data);
    });
    
    
}