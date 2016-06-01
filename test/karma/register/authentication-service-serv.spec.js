'use strict';

describe('module: register, service: AuthenticationService', function () {

  // load the service's module
  beforeEach(module('register'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate service
  var AuthenticationService;
  beforeEach(inject(function (_AuthenticationService_) {
    AuthenticationService = _AuthenticationService_;
  }));

  it('should do something', function () {
    expect(!!AuthenticationService).toBe(true);
  });

});
