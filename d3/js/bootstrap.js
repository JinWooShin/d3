//bootstrapping all the angular controllers and providers
(function () {
    "use strict";
    define([
        'controller/indexCtrl',
        'controller/mapCtrl',
        'controller/toolCtrl'
    ], function (IndexCtrl, MapCtrl, toolCtrl) {
        
        function init(App) {    
            angular.bootstrap(document.body, ['app']);
            return App;
        }
        return { start: init };
    });
}).call(this);