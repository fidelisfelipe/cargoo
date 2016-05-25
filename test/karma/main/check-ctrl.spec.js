'use strict';

describe('module: main, controller: CheckCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var CheckCtrl;
  beforeEach(inject(function ($controller) {
    CheckCtrl = $controller('CheckCtrl');
  }));

  it('should do something', function () {
    expect(!!CheckCtrl).toBe(true);
  });

});
