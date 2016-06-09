'use strict';
angular.module('authSocialBackand')
.service('AuthSocialBackandService', function ($log, $state, $rootScope, Backand) {
  var service = this;
  $log.log('Hello from your Service: AuthSocialBackandService in module authSocialBackand');
  service.socialSignIn = function (provider) {
    return Backand.socialSignIn(provider);
  };
  service.signout = function () {
    $log.log('signout...');
    $rootScope.isAuthorized = false;
    $rootScope.username = '';
    $rootScope.firstName = '';
    $rootScope.lastName = '';
    $rootScope.userId = '';
    $state.go($state.current);
    return Backand.signout();
  };
  service.unauthorized = function () {
    $log.log('unauthorized...');
    $rootScope.isAuthorized = false;
    $state.go($state.current);
  };
  service.signin = function (email, password) {
    $log.log('signin...');
    return Backand.signin(email, password);
  };
  service.signup = function (firstName, lastName, email, password, confirmPassword) {
    $log.log('signup...');
    return Backand.signup(firstName, lastName, email, password, confirmPassword);
  };
  service.onAuthorized = function () {
    $log.log('onAuthorized...');
    Backand.getUserDetails().then(function (data) {
      if (data && data.username !== undefined) {
        $rootScope.isAuthorized = true;
        $rootScope.username = data.username;
        $rootScope.firstName = data.firstName;
        $rootScope.lastName = data.lastName;
        $rootScope.userId = data.userId;
      } else {
        $log.log('undefined user current...');
      }
    });

  };
  service.onChangeSuccess = function (event, toState) {
    $log.log('stateChangeSuccess...');
    if (toState.name === 'authSocialBackandLogin' && !$rootScope.isAuthorized) {
      service.signout();
      $state.go('authSocialBackandLogin');
    }
    else if (toState.name !== 'authSocialBackandLogin' && !$rootScope.isAuthorized && Backand.getToken() === undefined) {
      service.unauthorized();
      $state.go('authSocialBackandLogin');
    }
  };
  service.updatePassword = function (passwordCurrent, passwordNew) {
    return Backand.changePassword(passwordCurrent, passwordNew);
  };
});
