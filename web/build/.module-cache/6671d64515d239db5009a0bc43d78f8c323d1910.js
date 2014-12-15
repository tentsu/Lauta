angular.module("Lauta", ["Main", "react"]);

angular.module("Main", []);

angular.module("Main")
    .controller("MainCtrl", MainCtrl);

MainCtrl.$inject = ["$scope", "$http"]

function MainCtrl ($scope, $http) {
    "use strict";
    console.log("fsafa");
    $scope.threads = [];

    $http.get("threads.json").success( function(data) {
        $scope.threads = data;
        console.log(data);
    });
}