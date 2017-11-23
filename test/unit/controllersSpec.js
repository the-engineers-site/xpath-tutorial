'use strict';

/* jasmine specs for controllers go here */

describe('TutorialOnXpaths Controllers', function () {

    describe('NavigationController controller', function () {

        var scope, controller, location;

        beforeEach(module('tutorialApp'))

        beforeEach(inject(function ($controller, $rootScope, $location) {
            scope = $rootScope.$new();
            location = $location
            controller = $controller('NavigationController', {$scope: scope});
        }));

        it('should have firstStep equal to 1', function () {
            expect(scope.firstStep).toBe(1);
        });

        it('should have lastStep equal to 2', function () {
            expect(scope.lastStep).toBe(2);
        });

        it('should initially have currentStep equal to firstStep ', function () {
            expect(scope.currentStep).toBe(scope.firstStep);
        });

        it('goToNextStep should increase currentStep with 1', function () {
            var initialValue = scope.firstStep;
            expect(scope.currentStep).toBe(initialValue);
            scope.goToNextStep();

            expect(scope.currentStep).toBe((initialValue + 1))
        });

        it('goToNextStep should not increase currentStep when this is equal to lastStep', function () {
            scope.currentStep = scope.lastStep;
            scope.goToNextStep();
            expect(scope.currentStep).toBe((scope.lastStep))
        });

        it('goToPreviousStep should not decrease currentStep when this is equal to firstStep', function () {
            scope.currentStep = scope.firstStep;
            scope.goToPreviousStep();
            expect(scope.currentStep).toBe((scope.firstStep))
        });

        it('goToPreviousStep should decrease currentStep with 1', function () {
            scope.currentStep = scope.lastStep;
            scope.goToPreviousStep();
            expect(scope.currentStep).toBe((scope.lastStep - 1))
        });

        it('goToNextStep should change location path to next step', function () {
            spyOn(location, 'path');
            scope.goToNextStep();
            expect(location.path).toHaveBeenCalledWith('/step2');
        });

        it('goToPreviousStep should change location path to previous step', function () {
            scope.goToNextStep()
            spyOn(location, 'path');
            scope.goToPreviousStep()
            expect(location.path).toHaveBeenCalledWith('/step1');
        });
    })

    describe('XpathController controller', function () {
        var scope, controller;

        beforeEach(module('tutorialApp'))

        beforeEach(inject(function ($controller, $rootScope) {

            scope = $rootScope.$new();
            controller = $controller('XpathController', {
                $scope: scope
            });

        }))

        it("validateXpath should return \"\" if xpath is \"\"", function () {
            scope.xpath = ""
            expect(scope.validateXpath()).toBe("")
        })

        it("validateXpath should return 'invalid-xpath' if the xpath is invalid", function () {
            scope.xpath = "/a/"
            expect(scope.validateXpath()).toBe("invalid-xpath")
        })
    })

}) ;
