(function () {
    "use strict";

    angular.module('app')
    .controller('toolCtrl', ['$scope', '$log', '$compile', 'MapService', 'LayerService',
    function ($scope, $log, $compile, MapService, LayerService) {
        var layers = {
            'hotspring': '//maps.ngdc.noaa.gov/arcgis/rest/services/hot_springs/MapServer/0'
        };
        var quantize;
        $scope.addLayer = function (type, renderType) {
            MapService.clearAllGraphicLayers();
            var url = layers[type];
            var options = { id: type, styling: renderType!==false, outFields: "[*]", className: type };
            var layer = null;
            if (url) {
                layer = LayerService.createLayer("feature", url, options);
            }
            if (renderType === 'd3') {
                quantize = d3.scale.quantize().domain([0, 100]).range(d3.range(5));
                layer.on("graphic-draw", function (evt) {
                    var attrs = evt.graphic.attributes;
                    var value = (attrs && attrs.TEMP_C) || undefined;
                    
                    var range = quantize(value);
                    evt.node.setAttribute("data-classification", range);                    
                });                
            } else if (renderType = 'renderer'){
                //ToDo : do nothing
            }
            MapService.addLayer(layer);
        }
        $scope.testFunction = function (evt) {
            console.log(evt);
        },
        $scope.drawSelection = function (shape) {
            $log.debug("draw selection tools");
            
        }
    }])
    .directive('toolMenu', [function () {
        return {
            restrict: 'EA',
            templateUrl: 'js/templates/toolbarTemplate.html',
            controller: 'toolCtrl'
        };
    }]);
}).call(this);