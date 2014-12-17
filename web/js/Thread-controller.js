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

    var intervalli = $interval( getNewAnswers, 10000 );
          
    $scope.$on('$destroy', function () { $interval.cancel(intervalli); });
    
    $scope.addAnswer = function(id, post) {
        ThreadFactory.addAnswer(id, post).then(function(data) {
            window.location.replace("/"+data.id);
        });
    };
    
    function getNewAnswers() {
        var specs = {
            id: $scope.thread.id,
            time: ""
        }
        
        specs.time = ( $scope.thread.answers.length > 0 )
            ? new Date($scope.thread.answers[ $scope.thread.answers.length - 1].time)
            : new Date($scope.thread.time);

        ThreadFactory.getNewAnswers(specs)
            .then( function(data) {
                $scope.thread.answers = ($scope.thread.answers).concat(data);
                $scope.thread.answerCount = $scope.thread.answers.length;
            })
    }
}

})();
    