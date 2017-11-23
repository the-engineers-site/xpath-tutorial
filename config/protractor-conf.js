/*var ScreenShotReporter = require('protractor-screenshot-reporter-with-postprocessing');
 var ScreenShotReporter = require('protractor-screenshot-reporter');*/


var HtmlReporter = require('protractor-html-screenshot-reporter');

exports.config = {
    seleniumAddress:'http://localhost:4444/wd/hub',
    /*  suite: {
     mainPage:   '../test/e2e/mainPageScenarios.js'
     },*/
    seleniumPort:null,
    specs:[
        '../test/e2e/scenarios.js'
    ],

    /*capabilities:{
     'browserName':'chrome'
     },*/

    chromeOnly:false,

    multiCapabilities:[{
        'browserName':'chrome'
        },{
        'browserName':'firefox'
        }
    ],
    rootElement:'body',
    baseUrl:'http://localhost:8000/app/',
    framework:'jasmine',
    jasmineNodeOpts:{
        onComplete:function () {
        },
        defaultTimeoutInterval:30000,
        includeStackTrace:false,
        showColors:true
    },
    allScriptsTimeout:11000,

    onPrepare:function () {
        var disableNgAnimate = function () {
            angular.module('disableNgAnimate', []).run(
                function ($animate) {
                    $animate.enabled(false);
                }
            );
            browser.addMockModule('disableNgAnimate', disableNgAnimate)
        }
        jasmine.getEnv().addReporter(new HtmlReporter({
            baseDirectory:'testResults/endToEnd'
        }));
    }
}


