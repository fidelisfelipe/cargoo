'use strict';
angular.module('authSocialBackand')
.controller('AuthSocialBackandCtrl', function ($log, $state, $rootScope, $timeout, FlashService, Backand, AuthSocialBackandService) {
  var vm = this;
  vm.socialSignin = socialSignIn;
  vm.signout = signout;
  $log.log('Hello from your Controller: AuthSocialBackandCtrl in module authSocialBackand:. This is your controller:', this);
  (function initController () {
    vm.username = '';
    vm.error = '';
  })();
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
  $rootScope.$on('authorized', function () {
    vm.isAuthorized = true;
    vm.username = $rootScope.globals.currentUser.username;
  });

  $rootScope.$on('logout', function () {
    vm.username = '';
    vm.isAuthorized = false;
    $state.go($state.current);
  });
});
