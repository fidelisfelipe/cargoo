'use strict';
angular.module('register')
.controller('RegisterCtrl', RegisterCtrl);
RegisterCtrl.$inject = ['UserService', '$location', '$rootScope', '$state', '$log', 'FlashService'];
function RegisterCtrl (UserService, $location, $rootScope, $state, $log, FlashService) {
  var vm = this;
  vm.register = register;
  vm.data = {
    title: 'Login',
    btnRemember: 'Remember',
    btnLogin: 'Login',
    btnRegister: 'Register',
    btnReset: 'Reset',
    btnRecover: 'Recover',
    firstName: {placeholder: 'First Name', title: 'First Name'},
    lastName: {placeholder: 'Last Name', title: 'Last Name'},
    username: {placeholder: 'User Name', title: 'User Name'},
    password: {placeholder: 'Password', title: 'Password'}
  };
  function register () {
    $log.log('register...');
    vm.dataLoading = true;
    UserService.Create(vm.user).then(function (response) {
      $log.log('sending...');
      vm.dataLoading = true;
      if (response.success) {
        $log.log('success...');
        FlashService.Success('Registration successful', true);
        $state.go('login');
      } else {
        $log.log('fail...');
        FlashService.Error(response.message);
      }
      vm.dataLoading = false;
    });
  }
}
