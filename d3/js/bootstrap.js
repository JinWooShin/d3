//bootstrapping all the angular controllers and providers
(function () {
    "use strict";
    define([
        'service/esriService',

        'controller/indexCtrl',
        'controller/mapCtrl',
        'controller/toolCtrl'
    ], function (MapService, IndexCtrl, MapCtrl, toolCtrl) {
        
        function init(App) {    
            angular.bootstrap(document.body, ['app']);
            return App;
        }
        return { start: init };
    });
}).call(this);