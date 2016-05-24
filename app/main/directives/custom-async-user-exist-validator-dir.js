'use strict';
angular.module('user')
.directive('customAsyncUserExistValidator', function () {
  return {
    template: '<div></div>',
    restrict: 'E',
    link: function postLink (scope, element, attrs) {
      element.text('this is the customAsyncUserExistValidator directive', attrs);
    }
  };
});
