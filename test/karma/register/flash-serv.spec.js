'use strict';

describe('module: register, service: Flash', function () {

  // load the service's module
  beforeEach(module('register'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate service
  var Flash;
  beforeEach(inject(function (_Flash_) {
    Flash = _Flash_;
  }));

  it('should do something', function () {
    expect(!!Flash).toBe(true);
  });

});
