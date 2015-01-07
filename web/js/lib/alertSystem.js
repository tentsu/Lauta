/*jslint browser: true, devel: true, plusplus: true, vars: true*/

(function () {
    "use strict";

    angular.module('AlertSystem', [])
        .controller('AlertCtrl', AlertCtrl)
        .directive('alert', alert)
        .directive('alertBox', alertBox)
        .factory('alerts', alertFactory);

    function AlertCtrl($scope, alerts) {
        $scope.alerts = alerts.alerts;

        $scope.confirm = function (index) {
            var i = $scope.alerts[index];
            
            if (i.method != null || i.method != undefined) {
                i.method();
            }
            
            alerts.closeAlert(index);
        };
        
        $scope.closeAlert = function (i) {
            alerts.closeAlert(i);
        };
    }
    
    
    /**
     * @desc AlertBox directive to hold all alerts inside
     * @example <alert-box></alert-box>
     */
    function alertBox() {

        var directive = {
            template: 
                '<div id="AlertBox" ng-controller="AlertCtrl">'+
                    '<alert ng-repeat="a in alerts" ' +
                        'on-close="closeAlert($index)" confirm="confirm($index)" a="a" type="a.type" ' +
                        'class="alertBox" ng-class="a.type"></alert>'+
                '</div>'
        };

        return directive;
    }
    
    /**
     * @desc Alert directive to display and handle alert controls
     * @example <alert a="alert"></alert>
     */
    function alert($timeout, $compile) {
        var template =
            '<div> ' +
                '<i class="glyphicon glyphicon-remove" ' +
                    'ng-show="a.type != \'loading\' && a.type != \'confirm\'" ' +
                    'ng-click="closeAlert()">close</i> ' +

                '<h4 ng-bind="a.title"></h4> ' +
                '<p ng-bind="a.message"</p> ' +

                '<p ng-show="a.type == \'confirm\'"> ' +
                    '<button class="confirm" ' +
                        'ng-click="confirm()">Confirm</button>' +
                    '<button class="" ng-click="closeAlert()">Close</button> ' +
                '</p> ' +
            '</div>';

        var directive = {
            restrict: 'E',
            template: template,
            scope: {
                a: '=',
                closeAlert: '&onClose',
                confirm: '&confirm'
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