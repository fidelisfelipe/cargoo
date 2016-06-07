'use strict';

describe('module: authSocialBackand, service: AuthSocialBackand', function () {

  // load the service's module
  beforeEach(module('authSocialBackand'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate service
  var AuthSocialBackand;
  beforeEach(inject(function (_AuthSocialBackand_) {
    AuthSocialBackand = _AuthSocialBackand_;
  }));

  it('should do something', function () {
    expect(!!AuthSocialBackand).toBe(true);
  });

});
