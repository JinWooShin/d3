//bootstrapping all the angular controllers and providers
(function () {
    "use strict";
    define([
        'service/esriService',
        'service/mapService',
        'service/layerService',

        'controller/indexCtrl',
        'controller/mapCtrl',
        'controller/toolCtrl'
    ], function (EsriService, MapService, LayerService, IndexCtrl, MapCtrl, toolCtrl) {
        
        function init(App) {    
            angular.bootstrap(document.body, ['app']);
            return App;
        }
        return { start: init };
    });
}).call(this);