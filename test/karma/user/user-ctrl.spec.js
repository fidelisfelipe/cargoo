'use strict';

describe('module: user, controller: UserCtrl', function () {

  // load the controller's module
  beforeEach(module('user'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var UserCtrl;
  beforeEach(inject(function ($controller) {
    UserCtrl = $controller('UserCtrl');
  }));

  it('should do something', function () {
    expect(!!UserCtrl).toBe(true);
  });

});
