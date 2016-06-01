'use strict';
angular.module('register')
.controller('LoginCtrl', LoginCtrl);
LoginCtrl.$inject = ['$location', '$state', '$log', 'AuthenticationService', 'FlashService'];
function LoginCtrl ($location, $state, $log, AuthenticationService, FlashService) {
  var vm = this;
  vm.login = login;
  vm.clear = clear;
  vm.remembered = AuthenticationService.RememberState();
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
    AuthenticationService.Remember();
  })();

  function login () {
    vm.dataLoading = true;
    AuthenticationService.Login(vm.username, vm.password, function (response) {
      if (response.success) {
        AuthenticationService.SetCredentials(vm.username, vm.password);
        vm.dataLoading = false;
        AuthenticationService.Remembered(vm.remembered);
        $state.go('home');
      } else {
        FlashService.Error(response.message);
        $log.log('error login: ', response.message);
        vm.dataLoading = false;
      }
    });
  }

  function clear () {
    vm.username = null;
    vm.password = null;
  }

}
