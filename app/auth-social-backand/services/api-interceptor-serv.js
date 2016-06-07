'use strict';
angular.module('authSocialBackand')
.service('APIInterceptor', function ($log, $rootScope, $q) {

  $log.log('Hello from your Service: APIInterceptor in module authSocialBackand');
  var service = this;
  service.responseError = function (response) {
    if (response.status === 401) {
      $rootScope.$broadcast('unauthorized');
    }
    return $q.reject(response);
  };

});
