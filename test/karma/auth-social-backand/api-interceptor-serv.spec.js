'use strict';

describe('module: authSocialBackand, service: APIInterceptor', function () {

  // load the service's module
  beforeEach(module('authSocialBackand'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate service
  var APIInterceptor;
  beforeEach(inject(function (_APIInterceptor_) {
    APIInterceptor = _APIInterceptor_;
  }));

  it('should do something', function () {
    expect(!!APIInterceptor).toBe(true);
  });

});
