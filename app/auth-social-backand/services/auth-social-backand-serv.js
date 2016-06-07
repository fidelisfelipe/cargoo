'use strict';
angular.module('authSocialBackand')
.service('AuthSocialBackandService', function ($log, Backand) {
  var service = this;
  $log.log('Hello from your Service: AuthSocialBackandService in module authSocialBackand');
  service.socialSignIn = function (provider) {
    return Backand.socialSignIn(provider);
  };
  service.signout = function () {
    return Backand.signout();
  };

});
