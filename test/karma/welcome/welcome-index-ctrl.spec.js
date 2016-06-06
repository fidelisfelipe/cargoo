'use strict';

describe('module: welcome, controller: WelcomeIndexCtrl', function () {

  // load the controller's module
  beforeEach(module('welcome'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var IndexCtrl;
  beforeEach(inject(function ($controller) {
    IndexCtrl = $controller('WelcomeIndexCtrl');
  }));

  it('should do something', function () {
    expect(!!IndexCtrl).toBe(true);
  });

});
