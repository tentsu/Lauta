(function() {
  'use strict';
    
angular.module("Lauta", ["Main", "Thread", "react", "ngRoute", "ngResource"])
.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
            template: '<react-component name="Lauta" id="react" props="threads" />{{threads}}',
            controller: 'MainCtrl',
        })
        .when('/:threadId', {
            templateUrl: 'web/partials/thread.html',
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

})();