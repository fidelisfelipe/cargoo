'use strict';

describe('module: authSocialBackand, controller: AuthSocialBackandCtrl', function () {

  // load the controller's module
  beforeEach(module('authSocialBackand'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var AuthSocialBackandCtrl;
  beforeEach(inject(function ($controller) {
    AuthSocialBackandCtrl = $controller('AuthSocialBackandCtrl');
  }));

  it('should do something', function () {
    expect(!!AuthSocialBackandCtrl).toBe(true);
  });

});
