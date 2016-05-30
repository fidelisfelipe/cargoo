'use strict';
angular.module('home')
.controller('HomeCtrl', function ($log, $http, LoginSrv) {

  $log.log('Hello from your Controller: HomeCtrl in module home:. This is your controller:', this);
  var home = this;
  this.user = {};
  this.current = function () {
    LoginSrv.current();
    home.current = $http.get('/data/account.json').success(function (data) {
      home.user = data;
    });
  };

});
