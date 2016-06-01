'use strict';
angular.module('register')
.controller('RegisterCtrl', RegisterCtrl);
RegisterCtrl.$inject = ['UserService', '$location', '$rootScope', '$state', 'FlashService'];
function RegisterCtrl (UserService, $location, $rootScope, $state, FlashService) {
  var vm = this;
  vm.register = register;
  function register () {
    vm.dataLoading = true;
    UserService.Create(vm.user).then(function (response) {
      if (response.success) {
        FlashService.Success('Registration successful', true);
        $state.go('login');
      } else {
        FlashService.Error(response.message);
        vm.dataLoading = false;
      }
    });
  }
}
