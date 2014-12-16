//bootstrapping all the angular controllers and providers
(function () {
    "use strict";
    define([
        'service/mapService',
        'controller/mapCtrl',
        'controller/indexCtrl'
    ], function (MapService, MapCtrl, IndexCtrl) {
        function init() {
            var App = angular.module('app', ['ui.bootstrap']);

            MapService.start(App);
            MapCtrl.start(App);
            IndexCtrl.start(App);

            angular.bootstrap(document.body, ['app']);
            return app;
        }
        return { start: init };
    });
}).call(this);