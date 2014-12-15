(function () {
    "use strict";
    define([
        'angular',
        'esri/map',
        'esri/layers/ArcGISDynamicMapServiceLayer',
        'esri/layers/FeatureLayer'

    ], function (angular, Map, ArcGISDynamicMapServiceLayer, FeatureLayer) {
        function init(App) {
            App.provider('MapService', [function () {
                
                this.$get = function () {
                    return {

                    }
                }
            }]);
        }
        return { start: init };
    });
}).call(this);