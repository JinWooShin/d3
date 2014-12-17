(function () {
    'use strict';

    angular.module('app')
       
    .controller('MapCtrl', ['$rootScope', '$scope', '$attrs', 'EsriService', function ($rootScope, $scope, $attrs, EsriService) {
        var self = this;
        var mapDiv;

        this.init = function (element) {
            if (!$attrs.id) {
                throw new Error('\'id\' is required for a map.');
            }
            self.$element = element;
            self.createDiv();
            self.createMap();
        };
        this.createDiv = function () {
            mapDiv = document.createElement('div');
            mapDiv.setAttribute('id', $attrs.id);
            self.$element.removeAttr('id');
            self.$element.append(mapDiv);
        };
        this.createMap = function () {
            var options = {
                center: $attrs.center ? JSON.parse($attrs.center) : [-56.049, 38.485],
                zoom: $attrs.zoom ? parseInt($attrs.zoom) : 2,
                basemap: $attrs.basemap ? $attrs.basemap : 'streets'
            };
            $scope.map = EsriService.createMap($attrs.id, options);            
        };
    }])

    .directive('esriMap', function () {
        return {
            restrict: 'EA',
            controller: 'MapCtrl',
            link: function (scope, element, attrs, ctrl) {
                ctrl.init(element);
            }
        }
    });                
}).call(this);