'use strict';
angular.module('main')
.service('LoginSrv', function ($log, $q, $http) {
  $log.log('Hello from your Service: LoginSrv in module main');

  var setLogon = function (user) {
    window.localStorage.credentials = JSON.stringify(user);
  };
  var isLogon = function () {
    return !(window.localStorage.credentials === '{}');
  };
  var setLogoff = function () {
    window.localStorage.credentials = '{}';
  };
  var getUser = function () {
    return JSON.parse(window.localStorage.credentials || '{}');
  };
  var loginUser = function (email, pw) {
    $log.log('pws show ', pw);
    var deferred = $q.defer();
    var promise = deferred.promise;
    //-------------------------------------------------
    //API check password init
    $http.get('/data/account.json', {header: {'Content-Type': 'application/json; charset=UTF-8'}})
     .success(function (data) {
       $log.log('data:', data.email.value);
       if (data.email.value === email) {

         //save local account
         setLogon(data);

       }

       if (isLogon()) {
         //retorna ok
         deferred.resolve('Welcome ' + email + '!');

       } else {

         setLogoff();
         //retorna falha
         deferred.reject('Wrong credentials.');

       }
     }).error(function (data) {
       $log.log('bad credential: ', data);
       //retorna falha
       deferred.reject('Wrong credentials.');
     });
    //-------------------------------------------------
    promise.success = function (fn) {
      promise.then(fn);
      return promise;
    };
    promise.error = function (fn) {
      promise.then(null, fn);
      return promise;
    };
    return promise;
  };
  var recover = function (email) {
    var deferred = $q.defer();
    var promise = deferred.promise;
    //-------------------------------------------------
    //API check recover init
    $http.get('/data/account.json')
     .success(function (data) {
       $log.log('data:', data.email.value);
       if (data.email.value === email) {

         //save local account
         deferred.resolve('Recover for ' + email + '!');

       } else {

         //retorna falha
         deferred.reject('Wrong credentials.');

       }
     }).error(function (data) {
       $log.log('bad credential: ', data);
       //retorna falha
       deferred.reject('Wrong credentials.');
     });
    //-------------------------------------------------
    promise.success = function (fn) {
      promise.then(fn);
      return promise;
    };
    promise.error = function (fn) {
      promise.then(null, fn);
      return promise;
    };
    return promise;
  };
  return {
    setLogon: setLogon,
    getUser: getUser,
    setLogoff: setLogoff,
    isLogon: isLogon,
    loginUser: loginUser,
    recover: recover
  };
});
