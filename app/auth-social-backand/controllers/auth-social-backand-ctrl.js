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
  vm.signinSocial = signinSocial;

  vm.updateAccount = updateAccount;
  vm.toogleUpdate = function () {return !vm.showUpdate;};

  (function init () {
    vm.currentUser = AuthSocialBackandService.getUserCurrent();
    vm.updatePwd = false;
    vm.showUpdate = false;
    $log.log('current state:', $state.current.name);
    $log.debug('vm.currentUser:', vm.currentUser);
    $log.debug('vm.updatePwd:', vm.updatePwd);
  })();

  function signinSocial (provider) {
    FlashService.Loading(true);
    AuthSocialBackandService.signinSocial(provider, loginGo);
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
    AuthSocialBackandService.signup(vm.firstName, vm.lastName, vm.email, vm.password, vm.again, loginGo);
    FlashService.Loading(false);
  }
  function updateAccount () {
    $log.debug('update data', vm.updatePwd);
    FlashService.Loading(true);
    if (!vm.updatePwd) {
      AuthSocialBackandService.updateAccount(vm.currentUser.firstName, vm.currentUser.lastName, vm.currentUser.userId)
        .then(Utils.onValidUpdateAccount, Utils.onErrorUpdateAccount);
    } else {
      AuthSocialBackandService.updatePassword(vm.currentUser.passwordCurrent, vm.currentUser.passwordNew);
    }
    FlashService.Loading(false);
    $state.go($state.current.name);
  }

  function updateAccountGo () {
    vm.isUpdateAccount = true;
    $state.go('authSocialBackandUpdateAccount');
  }

  function signUpGo () {
    $state.go('authSocialBackandSignUp');
  }

  function passwordUpdateGo () {
    vm.isUpdatePassword = true;
    $state.go('authSocialBackandUpdateAccount');
  }
  function loginGo () {
    $state.go('authSocialBackandLogin');
  }

});
