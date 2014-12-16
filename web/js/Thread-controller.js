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

    ThreadFactory.getThread($routeParams.threadId)
        .then( function(data) {
            $scope.thread = data;
        })
    
//    $interval( getThreads, 5000 );
    
    $scope.addAnswer = function(id, post) {
        ThreadFactory.addAnswer(id, post).then(function(data) {
            window.location.replace("/"+data.id);
        });
    };
}

})();
    