(function () {
    "use strict";
    define([
        'angular'
    ], function (angular) {
        function init(App) {
            App.controller('IndexCtrl', ['$scope', function ($scope) {
                $scope.test = "Hello World";
            }]);
        }
        return { start: init };
    })
}).call(this);