var HelpPage = function() {
    this.firstLineExpression = element(by.repeater("line in help").row(0).column('{{line.expression}}'));
    this.firstLineDescription = element(by.repeater("line in help").row(0).column('{{line.description}}'));
    this.closeButton = element(by.css("#helpModal button.close"))
};

module.exports = new HelpPage();

