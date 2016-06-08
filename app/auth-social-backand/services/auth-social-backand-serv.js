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
  service.signin = function (email, password) {
  //call Backand for sign in
    return Backand.signin(email, password);
  };
  service.signup = function (firstName, lastName, email, password, confirmPassword) {
    return Backand.signup(firstName, lastName, email, password, confirmPassword);
  };

});
