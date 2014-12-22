(function () {
    "use strict";

    angular.module('app')
    .controller('toolCtrl', ['$scope', '$log', '$compile', 'MapService', 'LayerService', 'QueryService',
    function ($scope, $log, $compile, MapService, LayerService, QueryService) {
        var layers = {
            'hotspring': '//maps.ngdc.noaa.gov/arcgis/rest/services/hot_springs/MapServer/0'
        };
        var quantize;
        var drawHistogram = function (features) {
            var value = features.map(function (feature) {                
                return feature.attributes.TEMP_C;                
            });
            console.log(values);
        };

        $scope.addLayer = function (type, renderType) {
            MapService.clearAllGraphicLayers();
            var url = layers[type];
            var options = { id: type, styling: (renderType==='none'), outFields: "[*]", className: type };
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
                    evt.node.classList.add("d3Features");
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
            var drawToolbar = MapService.getToolbar();
            var drawEnd = drawToolbar.on("draw-end", function (evt) {
                console.log(evt.geometry);
                drawEnd.remove();
                var query = QueryService.getQuery();
                query.geometry = evt.geometry;
                query.outFields = ["*"];
                QueryService.queryTaskExcute(layers['hotspring'], null, query).then(function (r) {
                    console.log(r);
                    //ToDo:: graw distogram graph
                    drawHistogram(r.features);
                }, function (err) {
                    console.log(err);
                });

            });
            drawToolbar.activate(shape);            
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