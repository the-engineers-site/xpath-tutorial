'use strict';
describe('Directives', function () {

    var body, html, element, scope;

    beforeEach(module("tutorialApp"));

    beforeEach(inject(function ($rootScope, $compile, $document) {
        body = angular.element($document[0].body);
        html = angular.element("<div id='output' html-visualizer expected-selection='expectedXpath' current-selection='xpath'" +
            "is-match='match' source='test-example'></div>");
        element = angular.element(html);
        body.append(element);

        scope = $rootScope.$new();
        scope.expectedXpath = './label';
        scope.xpath = './label';
        scope.match = false;
        scope.expectedSelection = ''

        $compile(element)(scope);
        scope.$digest();

    }));

    xit("should not be initially defined", inject(function () {
        element.scope().$apply();
        console.log(element.scope().expectedSelection);
    }));
});


