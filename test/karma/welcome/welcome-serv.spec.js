'use strict';

describe('module: welcome, service: Welcome', function () {

  // load the service's module
  beforeEach(module('welcome'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate service
  var Welcome;
  var $timeout;
  beforeEach(inject(function (_Welcome_, _$timeout_) {
    Welcome = _Welcome_;
    $timeout = _$timeout_;
  }));

  describe('.changeBriefly()', function () {
    beforeEach(function () {
      Welcome.changeBriefly();
    });
    it('should briefly change', function () {
      expect(Welcome.someData.binding).toEqual('Yeah this was changed');
      $timeout.flush();
      expect(Welcome.someData.binding).toEqual('Yes! Got that databinding working');
    });
  });

});
