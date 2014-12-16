(function () {
    "use strict";

    angular.module('app')
    .controller('toolCtrl', [function () {

    }])
    .directive('toolMenu', [function () {
        return {
            restrict: 'EA',
            templateUrl: 'js/templates/toolbarTemplate.html',
            controller: 'toolCtrl'
        };
    }]);
}).call(this);