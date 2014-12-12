(function () {
    'use strict';
    var pathRX = new RegExp(/\/[^\/]+$/);
    var locationPath = location.pathname.replace(pathRX, '');

    define('angular', function () {
        if (angular) { return angular; }
        return {};
    });

    require({
        async: true,
        alias: [['text', 'dojo/text']],
        packages: [
            {
                name: 'controller',
                location: locationPath + "/js/controller"
            }, {
                name: 'service',
                location: locationPath + "/js/service"
            }, {
                name: 'js',
                location: locationPath + "/js"
            }
        ]
    });

    require([
        'dojo/ready',
        'js/bootstrap'
    ], function (ready, bootstrap) {
        ready(function () {
            console.log("start the bootstrapper");
            bootstrap.start();
        });
    });
}).call(this);