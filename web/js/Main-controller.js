/*
 * Main Controller
 * @desc Actual controller for frontpage of the app.
 * @namespace Controllers
 */

(function() {
  'use strict';
    
angular.module('Main')
    .controller('MainCtrl', MainCtrl);
    
MainCtrl.$inject = ['$scope', '$http', '$interval', 'ThreadFactory'];
    
/*
 * @name Main Controller
 * @desc Actual controller for frontpage of the app.
 * @memberOf Controllers
 */
function MainCtrl ($scope, $http, $interval, ThreadFactory) {
    $scope.threads = [];
    
    $scope.threads = ThreadFactory.getThreads();
    $scope.threads.then( function(data) {
        $scope.threads = data;
    })
    
    $scope.addThread = function(post) {
        console.log("This is a test function")
        
        ThreadFactory.addThread(post)
            .then( function(data) {
                window.location.replace("/"+data.id);
            });
    };
}
    
})();