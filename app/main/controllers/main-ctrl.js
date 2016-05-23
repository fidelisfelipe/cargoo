'use strict';
angular.module('main')
.controller('MainCtrl', function ($log, $state, LoginSrv) {

  $log.log('Hello from your Controller: MainCtrl in module main:. This is your controller:', this);
  this.login = function () {
    $state.go('login');
  };
  this.logout = function () {
    LoginSrv.logout();
    $state.go('entrar');
  };
  this.facebook = function () {
    $state.go('authfacebook');
  };
});
