'use strict';
angular.module('authSocialBackand')
.controller('AuthSocialBackandCtrl', function ($log, $state, $scope, $rootScope, $timeout, FlashService, Backand, AuthSocialBackandService) {
  $log.log('Hello from your Controller: AuthSocialBackandCtrl in module authSocialBackand:. This is your controller:', this);
  var vm = this;
  vm.socialSignin = socialSignIn;
  vm.signout = signout;
  vm.signin = signin;
  vm.signUpGo = function () {$state.go('authSocialBackandSignUp');};
  vm.updatePasswordGo = passwordUpdateGo;
  vm.updatePassword = updatePassword;
  vm.signUp = signUp;
  $scope.$on('$destroy', function () {/**not destroy scope?**/});
  $scope.$on('$viewContentLoaded', function () {/**not destroy scope?**/});


  vm.onValidLogin = function () {
    AuthSocialBackandService.onAuthorized();
    vm.username = Backand.getUsername();
    $log.log('details: ', Backand.getUserDetails());
    FlashService.Success('welcome ' + vm.username);
    FlashService.Loading(false);
  };
  vm.onErrorInLogin = function (rejection) {
    vm.error = rejection.data && rejection.data.error_description || 'Fail on Login, retriver step...';
    FlashService.Error(vm.error);
    AuthSocialBackandService.signout();
    FlashService.Loading(false);
  };
  vm.onValidSignin = function (response) {
    FlashService.Loading(false);
    if (response.error && response.error_description) {
      FlashService.Error(response.error_description);
    } else {
      FlashService.Success('Welcome ' + Backand.getUsername() + '!');
      AuthSocialBackandService.onAuthorized();
    }
  };
  vm.onErrorSignin = function (rejection) {
    FlashService.Loading(false);
    vm.error = 'Login or Password inválid!';
    FlashService.Error(rejection);
  };
  function socialSignIn (provider) {
    FlashService.Loading(true);
    AuthSocialBackandService.socialSignIn(provider).then(vm.onValidLogin, vm.onErrorInLogin);
    FlashService.Loading(false);
  }
  function signout () {
    FlashService.Question('Close Application Now?', function () {
      AuthSocialBackandService.signout();
    });
  }
  function signin () {
    FlashService.Loading(true);
    AuthSocialBackandService.signin(vm.email, vm.password).then(vm.onValidSignin, vm.onErrorSignin);
    FlashService.Loading(false);
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
  function passwordUpdateGo () {
    $state.go('authSocialBackandUpdatePassword');
  }
  function updatePassword () {
    FlashService.Loading(true);
    AuthSocialBackandService.updatePassword(vm.passwordCurrent, vm.passwordNew)
      .then(function (data) {
        $log.log('success update password! ', data);
        AuthSocialBackandService.signout();
        $state.go('authSocialBackandLogin');
        FlashService.Success('Change passoword successfull...');
      }, function (data) {
        $log.log('error update password: ', data);
        FlashService.Error(data.data);
      });
    FlashService.Loading(false);
  }
});
