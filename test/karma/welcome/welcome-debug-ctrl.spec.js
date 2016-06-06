'use strict';

describe('module: welcome, controller: WelcomeDebugCtrl', function () {

  // load the controller's module
  beforeEach(module('welcome'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var WelcomeDebugCtrl;
  beforeEach(inject(function ($controller) {
    WelcomeDebugCtrl = $controller('WelcomeDebugCtrl');
  }));

  describe('.grade()', function () {

    it('should classify asd as weak', function () {
      WelcomeDebugCtrl.password.input = 'asd';
      WelcomeDebugCtrl.grade();
      expect(WelcomeDebugCtrl.password.strength).toEqual('weak');
    });

    it('should classify asdf as medium', function () {
      WelcomeDebugCtrl.password.input = 'asdf';
      WelcomeDebugCtrl.grade();
      expect(WelcomeDebugCtrl.password.strength).toEqual('medium');
    });

    it('should classify asdfasdfasdf as strong', function () {
      WelcomeDebugCtrl.password.input = 'asdfasdfasdf';
      WelcomeDebugCtrl.grade();
      expect(WelcomeDebugCtrl.password.strength).toEqual('strong');
    });
  });

});
