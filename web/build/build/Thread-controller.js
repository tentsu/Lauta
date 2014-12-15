/*
 * @name ThreadCtrl
 * @desc Controller to show opened thread.
 */
(function() {
    'use strict';

angular.module('Thread')
    .controller('ThreadCtrl', ThreadCtrl);
    
ThreadCtrl.$inject = ['$scope', '$interval', '$routeParams', 'ThreadFactory'];

function ThreadCtrl($scope, $interval, $routeParams, ThreadFactory) {
    $scope.thread = {};

    $scope.thread = ThreadFactory.getThread($routeParams.threadId);
    $scope.thread.then( function(data) {
//        console.log(data)
        $scope.thread = data;
    })
    
//    getThreads();

//    $interval( getThreads, 5000 );
}

})();
    