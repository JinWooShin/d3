(function () {
    "use strict";
    angular.module('app')
    
    .controller('IndexCtrl', ['$scope', function ($scope) {
        $scope.test = "Hello World";
    }]);
      
}).call(this);