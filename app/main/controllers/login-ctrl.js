'use strict';
angular.module('main')
.controller('LoginCtrl', function ($log, $state, $ionicPopup, LoginSrv) {
  var login = this;
  login.data = { 'email': null, 'password': null};
  $log.log('Hello from your Controller: LoginCtrl in module main:. This is your controller:', this);
  this.login = function () {
    $log.log('email:', this.data.email);
    $log.log('password:', this.data.password);
    LoginSrv.loginUser(login.data.email, login.data.password).success(function (data) {
      $log.log('success login:', data);
      $state.go('home.welcome');
      login.data = {};
    }).error(function (data) {
      $log.log('error login:', data);
      $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!'
      });
    });
  };
  this.recover = function () {
    $log.log('recover password');
    $state.go('recover');
  };
  this.recoverSend = function () {
    $log.log('send email recover');
    $log.log('email:', this.data.email);
    LoginSrv.recover(login.data.email).success(function (data) {
      $log.log('success recover:', data);
      $ionicPopup.alert({
        title: 'Recover Success!',
        template: 'Please check your email, Thanks!'
      });
      $state.go('entrar');
    }).error(function (data) {
      $log.log('error login:', data);
      $ionicPopup.alert({
        title: 'Recover failed!',
        template: 'Please check your credentials!'
      });
    });
  };
});
