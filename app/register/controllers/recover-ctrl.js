'use strict';
angular.module('register')
.controller('RecoverCtrl', RecoverCtrl);
RecoverCtrl.$inject = ['$location', '$state', '$log', 'AuthenticationService', 'FlashService'];
function RecoverCtrl ($location, $state, $log, AuthenticationService, FlashService) {
  var vm = this;
  vm.recover = recover;
  vm.data = {
    title: 'Recover',
    btnRecover: 'Recover',
    btnLogin: 'Go Login',
    username: {placeholder: 'User Name', title: 'User Name'}
  };

  function recover () {
    FlashService.Loading(true);
    AuthenticationService.Recover(vm.username, function (response) {
      if (response.success) {
        FlashService.Success(response.message);
      } else {
        FlashService.Error(response.message);
      }
      FlashService.Loading(false);
    });
  }

}
