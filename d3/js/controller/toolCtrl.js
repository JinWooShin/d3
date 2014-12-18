(function () {
    "use strict";

    angular.module('app')
    .controller('toolCtrl', ['$scope', '$log', '$compile', 'EsriService', function ($scope, $log, $compile, EsriService) {
        var layers = {
            'hotspring': '//maps.ngdc.noaa.gov/arcgis/rest/services/hot_springs/MapServer/0'
        };
        var quantize;
        $scope.addLayer = function (type, useD3, addEvent, addLegend) {
            EsriService.clearAllLayers();
            var url = layers[type];
            var option = { id: type, styling: !useD3, outFields:"[*]", className:type};
            var layer = null;
            if (url) {
                layer = EsriService.createLayer(url, option, "feature");
            }
            if (useD3) {
                quantize = d3.scale.quantize().domain([0, 100]).range(d3.range(5));
                layer.on("graphic-draw", function (evt) {
                    var attrs = evt.graphic.attributes;
                    var value = (attrs && attrs.TEMP_C) || undefined;
                    
                    var range = quantize(value);
                    evt.node.setAttribute("data-classification", range);
                    if (addEvent) {
                        //ToDo:: add event to d3 graphic
                    }
                });
                
                if (addLegend) {
                    //ToDo:: draw legend with d3
                }
            } else {
                //ToDo : do nothing
            }
            EsriService.addLayer(layer);
        }
        $scope.testFunction = function (evt) {
            console.log(evt);
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