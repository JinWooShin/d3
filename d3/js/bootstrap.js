//bootstrapping all the angular controllers and providers
(function () {
    "use strict";
    define([
        'angular',
        'controller/indexCtrl'
    ], function (angular, IndexCtrl) {
        function init() {
            var App = angular.module('app', ['ui.bootstrap']);
            IndexCtrl.start(App);

            angular.bootstrap(document.body, ['app']);
            return app;
        }
        return { start: init };
    });
}).call(this);