angular.module("Lauta", ["Main"]);

angular.module("Main", []);

angular.module("Main")
    .controller("MainCtrl", MainCtrl);

MainCtrl.$inject = ["$scope"]

function MainCtrl ($scope) {
    
    $scope.clickMe = function() {
        alert("Clicked!");
        React.renderComponent(testMy, elem[0]);
    };
}