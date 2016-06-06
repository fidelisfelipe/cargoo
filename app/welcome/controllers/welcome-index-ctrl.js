'use strict';
angular.module('welcome')
.controller('WelcomeIndexCtrl', WelcomeIndexCtrl);
WelcomeIndexCtrl.$inject = ['$rootScope', '$log', 'UserService', 'AuthenticationService', 'FlashService'];
function WelcomeIndexCtrl ($rootScope, $log, UserService, AuthenticationService, FlashService) {

  var vm = this;

  vm.user = null;
  vm.allUsers = [];
  vm.deleteUser = deleteUser;
  vm.logout = logout;
  (function initController () {
    loadCurrentUser();
    loadAllUsers();
  })();

  function loadCurrentUser () {
    UserService.GetByUsername($rootScope.globals.currentUser.username)
      .then(function (user) {
        vm.user = user;
      });
  }

  function loadAllUsers () {
    UserService.GetAll()
      .then(function (users) {
        vm.allUsers = users;
      });
  }

  function deleteUser (id) {
    UserService.Delete(id)
      .then(function () {
        loadAllUsers();
      });
  }
  function setLogout () {
    AuthenticationService.ClearCredentials();
  }
  function logout () {
    $log.log('logout...');
    FlashService.Question('Logout now?', setLogout);
  }
}
