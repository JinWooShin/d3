//bootstrapping all the angular controllers and providers
(function () {
    "use strict";
    define([
        'angular',

        'service/mapService',

        'controller/indexCtrl'
    ], function (angular, MapService, IndexCtrl) {
        function init() {
            var App = angular.module('app', ['ui.bootstrap']);

            MapService.start(App);

            IndexCtrl.start(App);

            angular.bootstrap(document.body, ['app']);
            return app;
        }
        return { start: init };
    });
}).call(this);