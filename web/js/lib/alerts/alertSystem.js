/*jslint browser: true, devel: true, plusplus: true, vars: true*/

(function () {
    "use strict";

    angular.module("AlertSystem", [])
        .controller("AlertCtrl", AlertCtrl)
        .directive("alert", alert)
        .factory('alerts', alertFactory);

    function AlertCtrl($scope, alerts) {
        $scope.alerts = alerts.alerts;

        $scope.closeAlert = function (i) {
            alerts.closeAlert(i);
        };
    }
    
    /**
     * @desc Alert directive to display and handle alert controls
     * @file alert.directive.js
     * @example <alert a="alert"></alert>
     */
    function alert($timeout, $compile) {

        var directive = {
            restrict: 'E',
            scope: {
                a: '=',
                closeAlert: '&onClose'
            },
            link: link
        };

        return directive;

        function link(scope, element, attrs) {
            scope.$watch(attrs.type, function (type) {

                if (type !== 'loading' && type !== "confirm") {
                    $timeout(function () {
                        scope.closeAlert();
                        element.remove();
                    }, 2000);
                }
            });
        }
    }
    
    /**
     * @name alerts
     * @desc Application wide alert system
     */
    function alertFactory() {

        var alerts = [];
        
        var factory = {
            alerts: alerts,
            addAlert: addAlert,
            closeAlert: closeAlert
        };
        
        return factory;

        /*
         * alert 
         * type:
         *      success
         *      error
         *      warning
         *      loading
         *      confirm
         * message: Message to display
         * title: header title, optional
         * method: needed in confirm and loading, optional
         *
         */

        function addAlert(type, msg, title, func) {
            alerts.push({
                type: type,
                message: msg,
                title: title,
                method: func
            });
        }

        function closeAlert(i) {
            alerts.splice(i, 1);
        };
    }
})();