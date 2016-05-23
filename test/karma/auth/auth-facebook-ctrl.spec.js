'use strict';

describe('module: auth, controller: AuthFacebookCtrl', function () {

  // load the controller's module
  beforeEach(module('auth'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var AuthFacebookCtrl;
  beforeEach(inject(function ($controller) {
    AuthFacebookCtrl = $controller('AuthFacebookCtrl');
  }));

  it('should do something', function () {
    expect(!!AuthFacebookCtrl).toBe(true);
  });

});
