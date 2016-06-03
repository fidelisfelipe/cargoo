'use strict';
angular.module('register')
.controller('HomeCtrl', HomeCtrl);
HomeCtrl.$inject = ['$rootScope', '$log', 'UserService', 'AuthenticationService', 'FlashService'];
function HomeCtrl ($rootScope, $log, UserService, AuthenticationService, FlashService) {

  var vm = this;

  vm.user = null;
  vm.allUsers = [];
  vm.deleteUser = deleteUser;
  vm.logout = logout;
  initController();
  function initController () {
    loadCurrentUser();
    loadAllUsers();
  }

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
    //AuthenticationService.ClearCredentials();
    //$state.go('home');
  }
}
