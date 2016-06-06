'use strict';

describe('module: welcome, controller: WelcomeMenuCtrl', function () {

  // load the controller's module
  beforeEach(module('welcome'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var WelcomeMenuCtrl;
  beforeEach(inject(function ($controller) {
    WelcomeMenuCtrl = $controller('WelcomeMenuCtrl');
  }));

  it('should do something', function () {
    expect(!!WelcomeMenuCtrl).toBe(true);
  });

});
