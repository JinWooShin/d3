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
            // Update is not implemented.
            var formatCount = d3.format(",.0f");
            var values = features.map(function (feature) {                
                return feature.attributes.TEMP_C;                
            });
            var margin = { top: 10, right: 30, bottom: 30, left: 30 },
                width = 1200 - margin.left - margin.right,
                height = 250 - margin.top - margin.bottom;
            var x = d3.scale.linear()
                .domain([0, 100])
                .range([0, width]);
            var data = d3.layout.histogram()
                .bins(20)
                (values);
            var y = d3.scale.linear()
                .domain([0, d3.max(data, function (d) { return d.y; })])
                .range([height, 0]);
            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");
            var svg = d3.select("#chart")
                .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            var bar = svg.selectAll(".bar")
                    .data(data)
                .enter().append("g")
                    .attr("class", "bar")
                    .attr("transform", function (d) { return "translate(" + x(d.x) + "," + y(d.y) + ")" });
            bar.append("rect")
                .attr("x", 1)
                .attr("width", x(data[0].dx) - 1)
                .attr("height", function (d) { return height - y(d.y); });
            bar.append("text")
                .attr("dy", ".75em")
                .attr("y", 6)
                .attr("x", x(data[0].dx) / 2)
                .attr("text-anchor", "middle")
                .text(function (d) { return formatCount(d.y); });
            svg.append("g")
                .attr("class", "x asix")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);
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
                drawToolbar.deactivate();
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