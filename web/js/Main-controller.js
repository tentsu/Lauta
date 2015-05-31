/*
 * Main Controller
 * @desc Actual controller for frontpage of the app.
 * @namespace Controllers
 */

(function () {
      'use strict';
    
angular.module('Main')
    .directive("asd", function(){
        return {
            template: "<div>MOI</h1>",
            link: function (scope, el) {
                console.log("asd directive");
            }
        };

    })
    .controller('MainCtrl', MainCtrl);
    
MainCtrl.$inject = ['$scope', '$http', '$location', '$interval', 'ThreadFactory'];
    
/*
 * @name Main Controller
 * @desc Actual controller for frontpage of the app.
 * @memberOf Controllers
 */
function MainCtrl ($scope, $http, $location, $interval, ThreadFactory) {
    $scope.threads = [];
    
    $scope.threads = ThreadFactory.getThreads();
    $scope.threads.then( function (data) {
        $scope.threads = data;
    });
    
    /*
     * @name addThread
     * @desc Calls factory to add thread to database
     * @param {post} Post's details
     * @param {post.title} Post's title
     * @param {post.message} Post's message
     * @param {post.img} Post's image
     */
    $scope.addThread = function(post) {
        ThreadFactory.addPost(post).then( function(data) {
            $location.url('/' + data.id);
        });
    };
    
    
    /*
     * @name deletePost
     * @desc Calls factory to delete given post from database
     */
    $scope.deletePost = function(post) {
        ThreadFactory.deletePost(post).then( function(data) {
            console.log('jee');
        }, function (){
            console.log('ERROR');
        });
    };
}
    
})();