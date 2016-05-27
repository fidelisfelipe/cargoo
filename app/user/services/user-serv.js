'use strict';
angular.module('user')
.service('UserService', function ($log, $http) {

  $log.log('Hello from your Service: User in module user');

  var createUser = function (newUser) {
    $log.log('create user...', JSON.stringify(newUser));
    var response = $http.get('/data/accountresponsecreate.json');
    response.success(function (data) {
      $log.log('data:', JSON.stringify(data));
      var jsonResponse = data;
      $log.log('response success...');
      var status = parseInt(jsonResponse.response.status);
      switch (status) {
        case 201:
          $log.log('201 - Success create user!');
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
/*      var jsonResponse = JSON.parse(data);
      var status = jsonResponse.response.status;
      switch (status) {
        case 404:
          $log.log('404 - Not found!');
          return false;

        case 403:
          $log.log('403 - Forbidden!');
          return false;

        case 500:
          $log.log('500 - Server error!');
          return false;

        case 400:
          $log.log('400 - Bad request!');
          return false;

        default:
          $log.log('Status not defined: ', status);
          return false;
      }
*/
    });

    return response;
  };

  var getUser = function () {
    $log.log('get user...');
  };
  return {
    createUser: createUser,
    getUser: getUser
  };
});
