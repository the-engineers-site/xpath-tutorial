'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.

var tutorialServices = angular.module('tutorial.services', ['ngResource']);

tutorialServices.factory('Help', ['$resource',
    function ($resource) {
        return $resource('resources/help.json', {}, {
            getData:{method:'GET', isArray:true}
        });
    }]);

tutorialServices.factory('Xpaths', ['$resource',
    function ($resource) {
        return $resource('resources/xpaths.json', {}, {
            getData:{method:'GET', isArray:true}
        });
    }]);