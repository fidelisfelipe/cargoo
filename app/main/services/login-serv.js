'use strict';
angular.module('main')
.service('LoginSrv', function ($log, $q) {
  $log.log('Hello from your Service: LoginSrv in module main');
  var credentials = {};
  return {
    loginUser: function (email, pw) {
      var deferred = $q.defer();
      var promise = deferred.promise;
      if (email === 'user' && pw === 'secret') {
        credentials.email = email;
        deferred.resolve('Welcome ' + email + '!');
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
    recover: function (email) {
      var deferred = $q.defer();
      var promise = deferred.promise;
      if (email === 'user') {
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
    }
  };
});
