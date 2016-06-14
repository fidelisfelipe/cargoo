'use strict';
angular.module('authSocialBackand')
.controller('AuthSocialBackandCtrl', function ($log, $state, $scope, $rootScope, $timeout, Utils, FlashService, Backand, AuthSocialBackandService) {
  $log.log('Hello from your Controller: AuthSocialBackandCtrl in module authSocialBackand:. This is your controller:', this);
  var vm = this;
  vm.data = {};
//go states
  vm.signUpGo = signUpGo;
  vm.updateAccountGo = updateAccountGo;
  vm.updatePasswordGo = passwordUpdateGo;

  vm.signin = signin;
  vm.signUp = signUp;
  vm.signout = signout;
  vm.socialSignin = socialSignIn;

  vm.updateAccount = updateAccount;
  vm.updatePassword = updatePassword;

  (function init () {
    $log.log('current state:', $state.current.name);
    if ($state.current.name === 'authSocialBackandUpdateAccount') {
      $log.log('form defined signup...');
      vm.data.user = Utils.getUserCurrent();
      $log.log('user for update: ', vm.data.user);
    }
  })();
  function onValidLogin () {
    AuthSocialBackandService.onAuthorized();
    FlashService.Success('welcome ' + $rootScope.currentUser.username);
    FlashService.Loading(false);
    loginGo();
  }

  function onErrorInLogin (rejection) {
    FlashService.Error(rejection.data && rejection.data.error_description || 'Fail on Login, retriver step...');
    AuthSocialBackandService.signout();
    FlashService.Loading(false);
  }

  function onValidSignup (response) {
    $log.log('success signup:', response);
    FlashService.Success('Sign Up Successfull!');
    loginGo();
  }
  function onErrorSignup (response) {
    $log.log('sigup error: ', response.data);
    FlashService.Error(response.data.error_description);
    //TODO: 417 - Critcal Exception (not exist error_description, sigup_error: 'An unexpected signup  exception occured') with enable e-mail confirm
  }
  function socialSignIn (provider) {
    FlashService.Loading(true);
    AuthSocialBackandService.socialSignIn(provider).then(onValidLogin, onErrorInLogin);
    FlashService.Loading(false);
  }

  function signout () {
    FlashService.Question('Close Application Now?', function () {
      AuthSocialBackandService.signout();
      loginGo();
    });
  }

  function signin () {
    FlashService.Loading(true);
    AuthSocialBackandService.signin(vm.email, vm.password, loginGo);
    FlashService.Loading(false);
  }

  function signUp () {
    FlashService.Loading(true);
    AuthSocialBackandService.signup(vm.firstName, vm.lastName, vm.email, vm.password, vm.again)
        .then(onValidSignup, onErrorSignup);
    FlashService.Loading(false);
  }
  function onValidUpdatePassword (data) {
    $log.log('success update password! ', data);
    FlashService.Success('Change passoword successfull...');
    AuthSocialBackandService.signout();
    loginGo();
  }
  function onErrorUpdatePassword (response) {
    $log.log('error update password: ', response);
    FlashService.Error(response.data);
  }
  function updatePassword () {
    FlashService.Loading(true);
    AuthSocialBackandService.updatePassword(vm.passwordCurrent, vm.passwordNew)
      .then(onValidUpdatePassword, onErrorUpdatePassword);
    FlashService.Loading(false);
  }
  function onErrorUpdateAccount (response) {
    $log.log('error update password: ', response);
    FlashService.Error(response.data);
  }
  function updateAccount () {
    FlashService.Loading(true);
    AuthSocialBackandService.updateAccount(vm.firstName, vm.lastName, $rootScope.userId)
      .then(Utils.onValidUpdateAccount, onErrorUpdateAccount);
    FlashService.Loading(false);
    updateAccountGo();
  }

  function updateAccountGo () {
    $state.go('authSocialBackandUpdateAccount');
  }

  function signUpGo () {
    $state.go('authSocialBackandSignUp');
  }

  function passwordUpdateGo () {
    $state.go('authSocialBackandUpdatePassword');
  }
  function loginGo () {
    $state.go('authSocialBackandLogin');
  }

});
