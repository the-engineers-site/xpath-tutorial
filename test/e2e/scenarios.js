'use strict';

describe('MainPage', function () {

    var mainPage = require('./mainPage.js');
    var helpPage = require('./helpPage.js')

    beforeEach(function () {
        mainPage.navigate();
    })

    it("should have title equal to 'Tutorial on xpaths.'", function () {
        expect(mainPage.title.isDisplayed()).toBe(true);
        expect(mainPage.title.getText()).toEqual('Tutorial on xpaths');
    });

    it("should open Help dialog with rendered information when click on question mark and close it when click on x.", function () {
        expect(mainPage.helpDialog.isDisplayed()).toBe(false);
        mainPage.questionMark.click()
        mainPage.wait();
        expect(mainPage.helpDialog.isDisplayed()).toBe(true);
        expect(helpPage.firstLineExpression.getText()).toEqual('/');
        expect(helpPage.firstLineDescription.getText()).toEqual('goes one level deep');

        helpPage.closeButton.click()
        mainPage.wait();
        expect(mainPage.helpDialog.isDisplayed()).toBe(false);
    });

    describe('Xpath input form work correctly', function () {
        it("should validate correctly the xpath entered in the input form", function () {
            expect(mainPage.xpathInput.getAttribute("class")).not.toContain('invalid-xpath');
            mainPage.setXpath('/div/');
            expect(mainPage.xpathInput.getAttribute('value')).toBe('//div/');
            expect(mainPage.xpathInput.getAttribute("class")).toContain('invalid-xpath');
       });

       it("should set green background to the matching element when entered xpath equals with the expected.", function () {
            mainPage.goToNextPage();
            expect(mainPage.selectedElement.getAttribute("expectedSelect")).toBe('true');
            expect(mainPage.selectedElement.getAttribute("actualSelect")).toBe('false');
            mainPage.xpathInput.clear();
            mainPage.setXpath('//div/label[text() = "Password"]');
            expect(mainPage.xpathInput.getAttribute("class")).not.toContain('invalid-xpath');
            expect(mainPage.selectedElement.getAttribute("expectedSelect")).toBe('true');
            expect(mainPage.selectedElement.getAttribute("actualSelect")).toBe('true');
        });
    })

    describe('Navigation', function () {
        it('should load correct content when going clicking on next and previous buttons', function () {
            expect(mainPage.guideHeader.getText()).toBe("Step 1 of 2");
            mainPage.goToNextPage();
            expect(mainPage.guideHeader.getText()).toBe("Step 2 of 2");
            mainPage.goToPreviousPage();
            expect(mainPage.guideHeader.getText()).toBe("Step 1 of 2");
        })
    })
})
;
