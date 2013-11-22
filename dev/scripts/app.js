'use strict';

var VCMS = angular.module('vcmsApp', ['ngRoute', 'ngResource', 'ngAnimate']);

VCMS.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html'
            })
            .when('/signup', {
                templateUrl: 'views/signup.html',
                controller: 'AuthCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
]);