/*
 * Main Controller
 * @desc Actual controller for frontpage of the app.
 * @namespace Controllers
 */

/*
 * Module holds anything general for the app.
 * Also has directives for showing react correctly in front page and specific thread
 * So, so bad! But so it shall be, since it's going to be refactored anyway.
 */
(function() {
  'use strict';
    
angular.module('Main')
    .controller('MainCtrl', MainCtrl)
    .directive('lauta', function( reactDirective ) {
        return {
            link: function (scope, el, attrs) {
                reactDirective( Lauta({scope: scope}) )
            }
        }
    })
    .directive('opened', function( reactDirective ) {
        return reactDirective( Opened );
    });
    
    
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
        $scope.threads.threads = data;
    })
    
    $scope.test = function() {
        console.log("This is a test function")
    };
}
    
})();