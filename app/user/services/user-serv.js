'use strict';
angular.module('user')
.service('UserService', function ($log, $http, $state, $ionicHistory) {

  $log.log('Hello from your Service: User in module user');
  var exist = false;
  var isCreate = false;
  var user = {};
  var existUser = function (newUser) {
    var response = $http.get('/data/emails.json');

    response.success(function (data) {
      $log.log('check user exist: ', newUser.email.value);

      for (var i = 0, len = data.emails.length; i < len; i++)
      {
        $log.log('checking: ' + data.emails[i].toUpperCase() + ' === ' + newUser.email.value.toUpperCase(), data.emails[i].toUpperCase() === newUser.email.value.toUpperCase());
        exist = data.emails[i].toUpperCase() === newUser.email.value.toUpperCase();

        if (exist) {
          break;
        }
      }

    }).error(function (data) {
      $log.log('check user exist fail', data);
    });
    return exist;
  };
  var createUser = function (newUser) {
    $log.log('create user...', newUser);
    if (exist) {
      return false;
    }
    var response = $http.get('/data/accountresponsecreate.json');
    response.success(function (data) {
      var jsonResponse = data;
      $log.log('request create success...');
      var status = parseInt(jsonResponse.response.status);

      switch (status) {
        case 201:
          $log.log('201 - Success create user!');
          user = jsonResponse.response.user;
          isCreate = true;
          break;

        case 412:
          $log.log('412 - Precondition fail!');

          break;

        case 500:
          $log.log('500 - Server error!');

          break;

        default:
          $log.log('Status not defined: ', status);

      }

    });
    response.error(function (data) {
      $log.log('response error...', data);
      isCreate = false;
    });
    return isCreate;
  };

  var getUser = function () {
    $log.log('get user...');
    return user;
  };
  var logout = function () {
    $log.log('logout user...');
    user = {};
    $ionicHistory.clearHistory();
    $ionicHistory.clearCache();
    $ionicHistory.nextViewOptions({
      disableBack: true
    });
    $state.go('entrar');
  };
  return {
    existUser: existUser,
    createUser: createUser,
    getUser: getUser,
    logout: logout
  };
});
