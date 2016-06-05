'use strict';
angular.module('register')
.controller('LoginCtrl', LoginCtrl);
LoginCtrl.$inject = ['$location', '$state', '$log', 'AuthenticationService', 'FlashService'];
function LoginCtrl ($location, $state, $log, AuthenticationService, FlashService) {
  var vm = this;
  vm.login = login;
  vm.clear = clear;

  vm.remembered = AuthenticationService.RememberState() === 'true';
  $log.log('vm.remembered', vm.remembered);
  vm.changeRemember = function () { vm.remembered = !vm.remembered;};
  vm.data = {
    title: 'Login',
    btnRemember: 'Remember',
    btnLogin: 'Login',
    btnRegister: 'Register',
    btnReset: 'Reset',
    btnRecover: 'Recover',
    username: {placeholder: 'User Name', title: 'User Name'},
    password: {placeholder: 'Password', title: 'Password'}
  };
  (function initController () {
    AuthenticationService.ClearCredentials();
    vm.username = AuthenticationService.Remember();
  })();

  function login () {
    FlashService.Loading(true);
    AuthenticationService.Login(vm.username, vm.password, function (response) {
      if (response.success) {
        AuthenticationService.SetCredentials(vm.username, vm.password);
        $log.log('vm.remembered', vm.remembered);
        AuthenticationService.Remembered(vm.remembered);
        FlashService.Success(response.message);
        $state.go('home');
      } else {
        FlashService.Error(response.message);
      }
      FlashService.Loading(false);
    });
  }

  function clear () {
    vm.username = null;
    vm.password = null;
  }

}
