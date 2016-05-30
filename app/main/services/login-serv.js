'use strict';
angular.module('main')
.service('LoginSrv', function ($log, $q, $http) {
  $log.log('Hello from your Service: LoginSrv in module main');
  var credentials = {};
  return {
    loginUser: function (email, pw) {
      var deferred = $q.defer();
      var promise = deferred.promise;
      var logado = false;
      $http.get('/data/account.json')
       .success(function (data) {
         $log.log('data:', data.email.value);
         if (data.email.value === email) {
           credentials = data;
           logado = true;
         }
         $log.log('credentials: ', credentials);
         if (logado) {
           credentials.email = email;
           deferred.resolve('Welcome ' + email + '!');
         } else {
           credentials = {};
           deferred.reject('Wrong credentials.');
         }
       }).error(function (data) {
         $log.log('fail login: ', data);
       });
      promise.success = function (fn) {
        promise.then(fn);
        return promise;
      };
      promise.error = function (fn) {
        promise.then(null, fn);
        return promise;
      };
      return promise;
    },
    recover: function (email) {
      var deferred = $q.defer();
      var promise = deferred.promise;
      if (email === 'atosfiel@gmail.com') {
        deferred.resolve('Send recover ' + email + '!');
      } else {
        credentials = {};
        deferred.reject('Wrong credentials.');
      }
      promise.success = function (fn) {
        promise.then(fn);
        return promise;
      };
      promise.error = function (fn) {
        promise.then(null, fn);
        return promise;
      };
      return promise;
    },
    logout: function () {
      credentials = {};
      $log.log('logout, bye bye :)', credentials);
    },
    current: function () {
      $log.log('get current credential: ', credentials);
      return credentials;
    }
  };
});
