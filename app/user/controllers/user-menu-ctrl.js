'use strict';
angular.module('user')
.controller('UserMenuCtrl', function ($log, UserService) {

  $log.log('Hello from your Controller: UserMenuCtrl in module user:. This is your controller:', this);
  this.user = UserService.getUser();
  $log.log('user:', this.user);
  this.logout = function () {
    $log.log('user-menu -> user logout...');
    UserService.logout();
  };
});
