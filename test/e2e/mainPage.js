var MainPage = function() {

    this.title = element(by.css("div[class$='navbar-brand']"));
    this.xpathInput = element(by.css("#xpath-form input"));
    this.previousButton = element(by.id("previous-button"));
    this.nextButton = element(by.id("next-button"));
    this.questionMark = element(by.css("span[class*='glyphicon-question-sign']"));
    this.helpDialog = element(by.id("helpModal"));
    this.selectedElement = element(by.xpath("//div[@id='output']//div[@class='tag'][div[text()='#Password']]"));
    this.guideHeader = element(by.css("h3#guide"));

    this.navigate = function() {
        browser.get('http://localhost:8000/app/index.html');
        browser.driver.manage().window().maximize();
        this.wait();
    };

    this.wait = function(){
        browser.waitForAngular();
    }

    this.setXpath = function(xpath) {
        this.xpathInput.sendKeys(xpath);
    };

    this.goToNextPage = function(){
        this.nextButton.click();
        this.wait();
    }
    this.goToPreviousPage = function(){
        this.previousButton.click();
        this.wait();
    }
};

module.exports = new MainPage();
