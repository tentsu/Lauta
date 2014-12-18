
/*
 * Module holds anything general for the app.
 * Also has directives for showing react correctly in front page and specific thread
 * So, so bad! But so it shall be, since it's going to be refactored anyway.
 */
(function() {
    'use strict';
    
angular.module('Board', ['Main', 'Thread', 'react', 'ngRoute', 'ngResource', 'angularFileUpload', 'AlertSystem'])
.directive('lauta', function( reactDirective ) {
    return {
        link: function(scope, element) {
            scope.$watch('threads', function() {
                React.renderComponent(window.Lauta({
                    scope: scope,
                    threads: scope.threads
                }), document.getElementById('react'));
            });
        }
    }
})
.directive('opened', function( reactDirective ) {
    return {
        link: function(scope, element, attrs) {
            scope.$watch('thread', function() {
                React.renderComponent(window.OpenedThread({
                    scope: scope,
                    thread: scope.thread
                }), document.getElementById('react'));
            }, true);
        }
    }
})
.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
            template: '<lauta id="react" />{{threads}}',
            controller: 'MainCtrl',
        })
        .when('/:threadId', {
//            templateUrl: 'web/partials/thread.html',
            template: '<opened id="react"/>',
            controller: 'ThreadCtrl',
        })
        .when('/account', {
            template: '<h1>Account</h1>'
        })
        .otherwise({
            template: "404!"
        });
    
    
    $locationProvider.html5Mode(true);
});

/*
 * Modules
 */
angular.module("Main", []);
angular.module("Thread", []);
//angular.module("AlertSystem", []);

})();