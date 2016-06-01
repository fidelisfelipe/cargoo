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
  (function initController () {
    AuthenticationService.ClearCredentials();
  })();

  function recover () {
    vm.dataLoading = true;
    AuthenticationService.Recover(vm.username, function (response) {
      if (response.success) {
        vm.dataLoading = false;
        FlashService.Success(response.message);
      } else {
        FlashService.Error(response.message);
        $log.log('error recover: ', response.message);
        vm.dataLoading = false;
      }
    });
  }

}
