'use strict';
angular.module('welcome')
.service('Welcome', function ($log, $timeout) {

  $log.log('Hello from your Service: Welcome in module welcome');

  // some initial data
  this.someData = {
    binding: 'Yes! Got that databinding working'
  };

  this.changeBriefly = function () {
    var initialValue = this.someData.binding;
    this.someData.binding = 'Yeah this was changed';

    var that = this;
    $timeout(function () {
      that.someData.binding = initialValue;
    }, 500);
  };

});
