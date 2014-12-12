(function () {
    "use strict";
    define([
        'angular',
        'esri/layers/FeatureLayer'
    ], function (angular, FeatureLayer) {
        function init(App) {
            App.provider('LayerService', [function () {

            }]);
        }
        return { start: init };
    });
}).call(this);