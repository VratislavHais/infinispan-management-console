'use strict';

describe('Slider function', function() {
    //login
    var utils = require('../e2eUtils');
    
    beforeEach(function() {
        utils.defaultLogin();
        var link = element(by.id('cluster-link-clustered'));
        link.click();
        browser.sleep(1000);
        element(by.css('.header-links')).click();
        browser.sleep(500);
    });
    
    it('should move with Average read time slider and see results', function() {
        var moveAndChech = function(sliderLower, sliderUpper, expectation) {
            var sleepTime = 100; //for easier changing
            var moveValue = 100; //only for x axis (there are no y axis oriented sliders)
            browser.actions().dragAndDrop(sliderUpper, {x:-moveValue, y:0}).perform();
            browser.sleep(sleepTime);
            browser.actions().dragAndDrop(sliderUpper, {x:moveValue, y:0}).perform();
            browser.sleep(sleepTime);
            browser.actions().dragAndDrop(sliderLower, {x:moveValue, y:0}).perform();
            browser.sleep(sleepTime);
            expect(element.all(by.css('.box.col-md-2.nopadding.ng-scope.ng-hide')).count()).toBe(expectation);
            browser.actions().dragAndDrop(sliderLower, {x:-moveValue, y:0}).perform();
            browser.sleep(sleepTime);
            expect(element.all(by.css('.box.col-md-2.nopadding.ng-scope.ng-hide')).count()).toBe(0);
        }
        
        // Average read time slider
        var sliderLower = element.all(by.repeater('slider in sliders')).get(0).element(by.css('.noUi-handle.noUi-handle-lower'));
        var sliderUpper = element.all(by.repeater('slider in sliders')).get(0).element(by.css('.noUi-handle.noUi-handle-upper'));
        moveAndChech(sliderLower, sliderUpper, 2);
        
        // Average write time slider 
        sliderLower = element.all(by.repeater('slider in sliders')).get(1).element(by.css('.noUi-handle.noUi-handle-lower'));
        sliderUpper = element.all(by.repeater('slider in sliders')).get(1).element(by.css('.noUi-handle.noUi-handle-upper'));
        moveAndChech(sliderLower, sliderUpper, 2);
        
        // Average remove time slider
        sliderLower = element.all(by.repeater('slider in sliders')).get(2).element(by.css('.noUi-handle.noUi-handle-lower'));
        sliderUpper = element.all(by.repeater('slider in sliders')).get(2).element(by.css('.noUi-handle.noUi-handle-upper'));
        moveAndChech(sliderLower, sliderUpper, 2);
        
        // Average replication time slider
        sliderLower = element.all(by.repeater('slider in sliders')).get(3).element(by.css('.noUi-handle.noUi-handle-lower'));
        sliderUpper = element.all(by.repeater('slider in sliders')).get(3).element(by.css('.noUi-handle.noUi-handle-upper'));
        moveAndChech(sliderLower, sliderUpper, 0);
    });
});