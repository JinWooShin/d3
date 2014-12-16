(function () {
    "use strict";
    define([
        'esri/map',
        'esri/layers/ArcGISDynamicMapServiceLayer',
        'esri/layers/FeatureLayer'

    ], function (Map, ArcGISDynamicMapServiceLayer, FeatureLayer) {
        function init(App) {
            App.provider('MapService', [function () {
                var map = null;
                var layers = [];
                this.$get = function ($log, $rootScope) {
                    return {
                        createMap: function (id, options) {
                            if (map !== null) {
                                return map;
                            } else {
                                map = new Map(id, options);
                                if (layers.length > 0) {
                                    map.addLayers(layers);
                                    layer = [];
                                }
                                map.on('load', function () {
                                    $rootScope.$broadcast('map-load');
                                });
                                map.on('click', function (e) {
                                    $rootScope.$broadcast('map-click', e);
                                });
                            }
                        },
                        getMap: function () {
                            if (map) {
                                return map;
                            } else {
                                console.log("Map is not initiated. Create map first");
                            }
                        },
                        addLayer: function (layer) {
                            if (map) {
                                map.addLayer(layer);
                            } else {
                                layers.push(layer);
                            }
                        }
                    }
                }
            }]);
        }
        return { start: init };
    });
}).call(this);