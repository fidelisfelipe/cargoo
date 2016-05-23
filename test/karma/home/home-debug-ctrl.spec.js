'use strict';

describe('module: home, controller: HomeDebugCtrl', function () {

  // load the controller's module
  beforeEach(module('home'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var HomeDebugCtrl;
  beforeEach(inject(function ($controller) {
    HomeDebugCtrl = $controller('HomeDebugCtrl');
  }));

  describe('.grade()', function () {

    it('should classify asd as weak', function () {
      HomeDebugCtrl.password.input = 'asd';
      HomeDebugCtrl.grade();
      expect(HomeDebugCtrl.password.strength).toEqual('weak');
    });

    it('should classify asdf as medium', function () {
      HomeDebugCtrl.password.input = 'asdf';
      HomeDebugCtrl.grade();
      expect(HomeDebugCtrl.password.strength).toEqual('medium');
    });

    it('should classify asdfasdfasdf as strong', function () {
      HomeDebugCtrl.password.input = 'asdfasdfasdf';
      HomeDebugCtrl.grade();
      expect(HomeDebugCtrl.password.strength).toEqual('strong');
    });
  });

});
