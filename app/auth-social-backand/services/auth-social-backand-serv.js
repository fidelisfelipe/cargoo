'use strict';
angular.module('authSocialBackand')
.service('AuthSocialBackandService', function ($log, $state, $http, Utils, FlashService, Backand) {
  $log.log('Hello from your Service: AuthSocialBackandService in module authSocialBackand');
  var service = this;
  service.signin = signin;
  service.signinSocial = signinSocial;
  service.signup = signup;
  service.signout = signout;

  service.unauthorized = unauthorized;
  service.onAuthorized = onAuthorized;
  service.onChangeSuccess = onChangeSuccess;
  service.updatePassword = updatePassword;
  service.updateAccount = updateAccount;

  service.getUserCurrent = function () {return Utils.getUserCurrent();};
  service.refreshData = function () {return Utils.refreshUserCurrentForData();};

  //socialSignIn
  function signinSocial (provider, callback) {
    return Backand.socialSignIn(provider).then(function (response) {
      $log.log('signinSocial:', response);
      onAuthorized(callback);
    }, function (response) {
      FlashService.Error(response.data && response.data.error_description || 'Fail on Login, retriver step...');
      signout();
    });
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
  function signup (firstName, lastName, email, password, confirmPassword, callback) {
    $log.log('signup...');
    return Backand.signup(firstName, lastName, email, password, confirmPassword)
      .then(function (response) {
        Utils.onValidSignup(response, callback);
      }, function (response) {
        Utils.onErrorSignup(response);
      });
  }
  //onAuthorized
  function onAuthorized (callback) {
    $log.log('onAuthorized...');
    Backand.getUserDetails().then(function (data) {
      if (data && data.username !== undefined && data.userId) {
        //init user blank
        Utils.setUserCurrentBlank();
        //set user logon
        Utils.setUserCurrent(data);
        //sincronize data for user with model
        Utils.refreshUserCurrentForData();
        //set authorized post logon
        Utils.setIsAuthorized();
        //sincronize var user with root user
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
    else if (Backand.getToken() !== undefined && Backand.getToken() !== null && Backand.getToken().toString().length > -1) {
      $log.debug('token valid...');
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
