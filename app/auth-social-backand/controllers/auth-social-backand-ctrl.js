'use strict';
angular.module('authSocialBackand')
.controller('AuthSocialBackandCtrl', function ($log, $state, $scope, $rootScope, $timeout, FlashService, Backand, AuthSocialBackandService) {
  var vm = this;
  vm.socialSignin = socialSignIn;
  vm.signout = signout;
  vm.signin = signin;
  vm.signUpGo = function () {$state.go('authSocialBackandSignUp');};
  vm.signUp = signUp;
  $scope.$on('$destroy', function () {/**not destroy scope?**/});
  $scope.$on('$viewContentLoaded', function () {/**not destroy scope?**/});
  $log.log('Hello from your Controller: AuthSocialBackandCtrl in module authSocialBackand:. This is your controller:', this);

  vm.onValidLogin = function () {
    onLogin();
    vm.username = Backand.getUsername();
    $log.log('details: ', Backand.getUserDetails());
    FlashService.Success('welcome ' + vm.username);
    FlashService.Loading(false);
  };
  vm.onErrorInLogin = function (rejection) {
    vm.error = rejection.data;
    FlashService.Error(vm.error);
    $rootScope.$broadcast('logout');
    FlashService.Loading(false);
  };

  function onLogin () {
    $rootScope.$broadcast('authorized');
    $log.log('login on success. :)');
  }
  function socialSignIn (provider) {
    FlashService.Loading(true);
    AuthSocialBackandService.socialSignIn(provider).then(vm.onValidLogin, vm.onErrorInLogin);
    FlashService.Loading(false);
  }
  function signout () {
    FlashService.Question('Close Application Now?', function () {
      AuthSocialBackandService.signout()
        .then(function (data) {
          $rootScope.$broadcast('logout');
          $log.log('logout :' + data + ':' + $state.current.name);
        });
    });
  }
  function signin () {
    AuthSocialBackandService.signin(vm.email, vm.password).then(function (data) {
      onLogin();
      $log.log('login on: ' + data.username);
    }, function (error) {
      FlashService.Error(error.error_description);
      $log.log('sigin error', error);
    });
  }
  function signUp () {
    FlashService.Loading(true);
    AuthSocialBackandService.signup(vm.firstName, vm.lastName, vm.email, vm.password, vm.again)
        .then(function (response) {
          $log.log('success signup:', response);
          FlashService.Success('Sign Up Successfull!');
          $state.go('authSocialBackandLogin');
        }, function (reason) {
          $log.log('sigup error: ', reason.data);
          FlashService.Error(reason.data.error_description);
          //TODO: 417 - Critcal Exception (not exist error_description, sigup_error: 'An unexpected signup  exception occured') with enable e-mail confirm
        });
    FlashService.Loading(false);
  }
  $rootScope.$on('authorized', function () {
    $rootScope.isAuthorized = true;
    Backand.getUserDetails().then(function (data) {
      vm.username = data.username;
      vm.firstName = data.firstName;
    });
  });

  $rootScope.$on('logout', function () {
    vm.username = '';
    vm.isAuthorized = false;
    $rootScope.isAuthorized = false;
    $state.go($state.current);
  });
});
