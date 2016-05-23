'use strict';

describe('module: home, service: Home', function () {

  // load the service's module
  beforeEach(module('home'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate service
  var Home;
  var $timeout;
  beforeEach(inject(function (_Home_, _$timeout_) {
    Home = _Home_;
    $timeout = _$timeout_;
  }));

  describe('.changeBriefly()', function () {
    beforeEach(function () {
      Home.changeBriefly();
    });
    it('should briefly change', function () {
      expect(Home.someData.binding).toEqual('Yeah this was changed');
      $timeout.flush();
      expect(Home.someData.binding).toEqual('Yes! Got that databinding working');
    });
  });

});
