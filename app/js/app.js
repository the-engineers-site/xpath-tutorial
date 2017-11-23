'use strict';

var tutorialApp = angular.module('tutorialApp', [
    'ngRoute',
    'tutorial.services',
    'tutorial.directives',
    'tutorial.controllers'
]);

tutorialApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/welcome', {
                templateUrl: 'steps/welcome.html',
                controller: 'XpathController'
            }).
            when('/step00', {
                templateUrl: 'steps/step00.html',
                controller: 'XpathController'
            }).
            when('/step01', {
                templateUrl: 'steps/step01.html',
                controller: 'XpathController'
            }).
            when('/step02', {
                templateUrl: 'steps/step02.html',
                controller: 'XpathController'
            }).
            when('/step03', {
                templateUrl: 'steps/step03.html',
                controller: 'XpathController'
            }).
            when('/step04', {
                templateUrl: 'steps/step04.html',
                controller: 'XpathController'
            }).
            when('/step05', {
                templateUrl: 'steps/step05.html',
                controller: 'XpathController'
            }).
            when('/step06', {
                templateUrl: 'steps/step06.html',
                controller: 'XpathController'
            }).
            when('/step07', {
                templateUrl: 'steps/step07.html',
                controller: 'XpathController'
            }).
            when('/step08', {
                templateUrl: 'steps/step08.html',
                controller: 'XpathController'
            }).
            when('/step09', {
                templateUrl: 'steps/step09.html',
                controller: 'XpathController'
            }).
            when('/step10', {
                templateUrl: 'steps/step10.html',
                controller: 'XpathController'
            }).
            when('/step11', {
                templateUrl: 'steps/step11.html',
                controller: 'XpathController'
            }).
            when('/step12', {
                templateUrl: 'steps/step12.html',
                controller: 'XpathController'
            }).
            when('/step13', {
                templateUrl: 'steps/step13.html',
                controller: 'XpathController'
            }).
            when('/step14', {
                templateUrl: 'steps/step14.html',
                controller: 'XpathController'
            }).
            when('/step15', {
                templateUrl: 'steps/step15.html',
                controller: 'XpathController'
            }).
            when('/step16', {
                templateUrl: 'steps/step16.html',
                controller: 'XpathController'
            }).
            when('/step17', {
                templateUrl: 'steps/step17.html',
                controller: 'XpathController'
            }).
            when('/step18', {
                templateUrl: 'steps/step18.html',
                controller: 'XpathController'
            }).
            when('/step19', {
                templateUrl: 'steps/step19.html',
                controller: 'XpathController'
            }).
            when('/step20', {
                templateUrl: 'steps/step20.html',
                controller: 'XpathController'
            }).
            when('/step21', {
                templateUrl: 'steps/step21.html',
                controller: 'XpathController'
            }).
            when('/step22', {
                templateUrl: 'steps/step22.html',
                controller: 'XpathController'
            }).
            when('/step23', {
                templateUrl: 'steps/step23.html',
                controller: 'XpathController'
            }).
            when('/step24', {
                templateUrl: 'steps/step24.html',
                controller: 'XpathController'
            }).
            when('/step25', {
                templateUrl: 'steps/step25.html',
                controller: 'XpathController'
            }).
            when('/step26', {
                templateUrl: 'steps/step26.html',
                controller: 'XpathController'
            }).
            when('/step27', {
                templateUrl: 'steps/step27.html',
                controller: 'XpathController'
            }).
            when('/step28', {
                templateUrl: 'steps/step28.html',
                controller: 'XpathController'
            }).
            when('/step29', {
                templateUrl: 'steps/step29.html',
                controller: 'XpathController'
            }).
            when('/step30', {
                templateUrl: 'steps/step30.html',
                controller: 'XpathController'
            }).
            otherwise({
                redirectTo: '/welcome'
            })
    }]);

