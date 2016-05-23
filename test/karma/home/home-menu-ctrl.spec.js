'use strict';

describe('module: home, controller: HomeMenuCtrl', function () {

  // load the controller's module
  beforeEach(module('home'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var HomeMenuCtrl;
  beforeEach(inject(function ($controller) {
    HomeMenuCtrl = $controller('HomeMenuCtrl');
  }));

  it('should do something', function () {
    expect(!!HomeMenuCtrl).toBe(true);
  });

});
