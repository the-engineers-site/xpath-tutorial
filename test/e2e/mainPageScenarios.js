//'use strict';

describe('MainPage', function() {
    var mainPage = require('./mainPage.js');

    beforeEach( function(){
        mainPage.navigate();
    })

    beforeEach(function() {
        ptor = protractor.getInstance();
        ptor.ignoreSynchronization = true;
        console.log("What's up with ignoreSynchronization?" + ptor.ignoreSynchronization);
        //ptor.driver.manage().timeouts().setScriptTimeout(500);
    }, 20000);

    it("should have title equal to 'Tutorial on xpaths'", function() {
        expect(mainPage.title.isDisplayed()).toBe(true);
        expect(mainPage.title.getText()).toEqual('Tutorial on xpaths');
    });

    it("should open Help dialog when click on question mark", function(){
        expect(mainPage.helpDialog.isDisplayed()).toBe(false);
        mainPage.questionMark.click()
        expect(mainPage.helpDialog.isDisplayed()).toBe(true);
    });
});

