(function () {
    "use strict";
    define([
        'esri/map',
        'esri/layers/ArcGISDynamicMapServiceLayer',
        'esri/layers/FeatureLayer',
        'esri/layers/GraphicsLayer'

    ], function (Map, ArcGISDynamicMapServiceLayer, FeatureLayer, GraphicsLayer) {
        angular.module('app')
        .provider('EsriService', [function () {
            var map = null;
            var layers = [];
            this.$get = function ($log, $rootScope) {
                return {
                    createMap: function (id, options) {
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
                        return map;
                    },
                    getMap: function () {
                        if (map) {
                            return map;
                        } else {
                            console.log("Map is not initiated. Create map first");
                        }
                    },
                    addLayer: function(layer) {
                        map.addLayer(layer);
                    },
                    createLayer: function (url, options, type) {
                        var layer = null;
                        switch (type) {
                            case "feature":
                                layer = new FeatureLayer(url, options);
                                break;
                            case "map":
                                layer = new ArcGISDynamicMapServiceLayer(url, options);
                                break;
                            case "graphic":
                                layer = new GraphicsLayer(options);
                                break;
                            default:
                                break;
                        }
                        if (layer) {
                            return layer;
                        } else {
                            throw new Error("invalid layer parameter");
                        }
                    },
                    clearAllGraphicLayers: function () {
                        var layerIds = map.graphicsLayerIds;
                        angular.forEach(layerIds, function (id) {
                            //if (map.basemapLayerIds.indexOf(id) === -1) {
                                map.removeLayer(map.getLayer(id));
                            //}
                        });
                    }
                }
            }
        }]);
        
    });
}).call(this);