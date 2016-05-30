'use strict';

describe('module: auth, controller: AuthAccountCtrl', function () {

  // load the controller's module
  beforeEach(module('auth'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var AuthAccountCtrl;
  beforeEach(inject(function ($controller) {
    AuthAccountCtrl = $controller('AuthAccountCtrl');
  }));

  it('should do something', function () {
    expect(!!AuthAccountCtrl).toBe(true);
  });

});
