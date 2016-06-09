'use strict';
angular.module('authSocialBackand')
.service('APIInterceptor', function ($log, $rootScope, $q, Backand) {

  $log.log('Hello from your Service: APIInterceptor in module authSocialBackand');
  var service = this;
  service.responseError = function (response) {

    if ((response.config.url + '').indexOf('token') === -1) {
      if (response.status === 401 && !Backand.isManagingRefreshToken()) {
 // When using refresh token, on 401 responses
 // Backand SDK manages refreshing the session and re-sending the requests
        $rootScope.$broadcast('unauthorized');
      }
      return $q.reject(response);
    }
  };

});
