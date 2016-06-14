'use strict';
angular.module('authSocialBackand')
.service('AuthSocialBackandService', function ($log, $state, $rootScope, $http, Utils, FlashService, Backand) {
  $log.log('Hello from your Service: AuthSocialBackandService in module authSocialBackand');
  var service = this;
  service.signin = signin;
  service.socialSignIn = socialSignIn;
  service.signup = signup;
  service.signout = signout;

  service.unauthorized = unauthorized;
  service.onAuthorized = onAuthorized;
  service.onChangeSuccess = onChangeSuccess;
  service.updatePassword = updatePassword;
  service.updateAccount = updateAccount;

  //socialSignIn
  function socialSignIn (provider) {
    return Backand.socialSignIn(provider);
  }
  //signout
  function signout () {
    $log.log('signout...');
    Utils.setUserCurrentBlank();
    $state.go($state.current);
    return Backand.signout();
  }
  //unauthorized
  function unauthorized () {
    $log.log('unauthorized...');
    Utils.setNotAuthorized;
    $state.go($state.current);
  }
  //signin
  function signin (email, password, callback) {
    $log.log('signin...');
    return Backand.signin(email, password)
      .then(function (response) {
        if (response.error && response.error_description) {
          FlashService.Error(response.error_description);
        } else {
          onAuthorized(callback);
        }
      }, function (response) {
        FlashService.Error(response);
      });
  }
  //signup
  function signup (firstName, lastName, email, password, confirmPassword) {
    $log.log('signup...');
    return Backand.signup(firstName, lastName, email, password, confirmPassword);
  }
  //onAuthorized
  function onAuthorized (callback) {
    $log.log('onAuthorized...');
    Backand.getUserDetails().then(function (data) {
      if (data && data.username !== undefined && data.userId) {
        Utils.setUserCurrentBlank();
        Utils.setUserCurrent(data);
        Utils.setIsAuthorized();
        Utils.refreshUserCurrentRoot();
        FlashService.Success('Welcome');
        callback();
      } else {
        $log.log('undefined user current...');
      }
    });
  }
  //onChangeSuccess
  function onChangeSuccess (event, toState) {
    $log.log('stateChangeSuccess...');
    if (toState.name === 'authSocialBackandLogin' && !Utils.isAuthorized) {
      service.signout();
      $state.go('authSocialBackandLogin');
    }
    else if (toState.name !== 'authSocialBackandLogin' && !Utils.isAuthorized && Backand.getToken() === undefined) {
      service.unauthorized();
      $state.go('authSocialBackandLogin');
    }
  }
  //updatePassword
  function updatePassword (passwordCurrent, passwordNew) {
    return Backand.changePassword(passwordCurrent, passwordNew);
  }
  //updateAccount
  function updateAccount (firstName, lastName, id) {
    var returnObject = true;
    var name = 'users';
    var userData = {
      'grant_type': 'text',
      'firstName': firstName,
      'lastName': lastName
    };
    return $http({
      method: 'PUT',
      url: Backand.getApiUrl() + '/1/objects/' + name + '/' + id,
      data: userData,
      params: {
        returnObject: returnObject
      }
    });
  }
});
