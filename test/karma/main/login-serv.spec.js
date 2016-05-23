'use strict';

describe('module: main, service: Login', function () {

  // load the service's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate service
  var Login;
  beforeEach(inject(function (_Login_) {
    Login = _Login_;
  }));

  it('should do something', function () {
    expect(!!Login).toBe(true);
  });

});
