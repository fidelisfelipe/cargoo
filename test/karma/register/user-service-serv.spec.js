'use strict';

describe('module: register, service: UserService', function () {

  // load the service's module
  beforeEach(module('register'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate service
  var UserService;
  beforeEach(inject(function (_UserService_) {
    UserService = _UserService_;
  }));

  it('should do something', function () {
    expect(!!UserService).toBe(true);
  });

});
