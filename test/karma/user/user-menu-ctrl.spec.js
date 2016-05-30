'use strict';

describe('module: user, controller: UserMenuCtrl', function () {

  // load the controller's module
  beforeEach(module('user'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var UserMenuCtrl;
  beforeEach(inject(function ($controller) {
    UserMenuCtrl = $controller('UserMenuCtrl');
  }));

  it('should do something', function () {
    expect(!!UserMenuCtrl).toBe(true);
  });

});
