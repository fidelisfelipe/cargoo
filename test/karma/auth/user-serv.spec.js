'use strict';

describe('module: auth, service: User', function () {

  // load the service's module
  beforeEach(module('auth'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate service
  var User;
  beforeEach(inject(function (_User_) {
    User = _User_;
  }));

  it('should do something', function () {
    expect(!!User).toBe(true);
  });

});
