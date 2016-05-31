'use strict';
angular.module('home')
.controller('HomeCtrl', function ($log, $http, LoginSrv) {

  $log.log('Hello from your Controller: HomeCtrl in module home:. This is your controller:', this);
  this.user = LoginSrv.getUser();

});
