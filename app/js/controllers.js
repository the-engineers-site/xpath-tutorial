'use strict';

/* Controllers */

var tutorialControllers = angular.module('tutorial.controllers', []);

tutorialControllers.controller('NavigationController', ['$scope', 'Help', '$location',
    function ($scope, Help, $location) {

        $scope.help = Help.getData();

        $scope.getCurrentStep = function () {
            var step = $location.absUrl().substr($location.absUrl().length - 2, 2);
            if(step == "me")
                return -1;
            else
                return parseInt(step);
        }

        $scope.currentStep = $scope.getCurrentStep();
        $scope.firstStep = -1;
        $scope.lastStep = 30;

        $scope.getLocationPath = function(){
            if($scope.currentStep == -1)
                return "/welcome";
            else if ($scope.currentStep < 10 )
                return "/step0" + $scope.currentStep;
            else
                return "/step" + $scope.currentStep;
        }

        $scope.goToPreviousStep = function () {
            $scope.currentStep = $scope.getCurrentStep();
            if ($scope.currentStep > $scope.firstStep)
                $scope.currentStep -= 1;
            $location.path($scope.getLocationPath())
        };

        $scope.goToNextStep = function () {
            $scope.currentStep = $scope.getCurrentStep();
            if ($scope.getCurrentStep() < $scope.lastStep)
                $scope.currentStep += 1;
            $location.path($scope.getLocationPath())
        };
        $scope.goToHome = function () {
            $location.path("/welcome");
        };
    }
]);

tutorialControllers.controller('XpathController', ['$scope', 'Help', 'Xpaths', '$location',
    function ($scope, Help, Xpaths, $location) {

        $scope.xpaths = Xpaths.getData();
        $scope.htmlSourceId = "test-example";
        $scope.xpath = '';
        $scope.match = false;

        $scope.validateXpath = function () {
            if ($scope.xpath == "") {
                return "";
            }
            try {
                document.evaluate($scope.xpath, document.getElementById('test-example'), null,
                    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                    null);
            } catch (e) {
                return "invalid-xpath";
            }

            return "";
        };

        $scope.expectedXpath = '';
        $scope.xpaths = Xpaths.getData().$promise.then(function (data) {
            $scope.xpaths = data;
            $scope.expectedXpath = $scope.xpaths[$scope.currentStep - 1].xpath;
        });
    }
]);
