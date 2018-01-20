'use strict';

angular.module('myApp', [
    'ngTouch',
    'ngRoute',
    'ngAnimate',
    'ngSanitize',
    'ngCookies',
    'snap',
    'ui.bootstrap',
    'myApp.controllers',
    'myApp.restServices',
    'myApp.httpProvider'
])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/:uuid/:domainUuid/:productId/:modelName/:detailDesc/:filePath', {templateUrl: 'partials/content.html', controller: 'contentCtrl'});
    $routeProvider.otherwise({redirectTo: '/'});
}])

;