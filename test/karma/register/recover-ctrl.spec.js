'use strict';

describe('module: register, controller: RecoverCtrl', function () {

  // load the controller's module
  beforeEach(module('register'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var RecoverCtrl;
  beforeEach(inject(function ($controller) {
    RecoverCtrl = $controller('RecoverCtrl');
  }));

  it('should do something', function () {
    expect(!!RecoverCtrl).toBe(true);
  });

});
