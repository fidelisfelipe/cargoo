'use strict';
angular.module('authSocialBackand')
.service('Utils', function ($log, $rootScope, $http, FlashService, Backand) {
  var user =  new function () {
    this.userId = 0;
    this.username = '';
    this.firstName = '';
    this.lastName = '';
    this.role = '';
    this.isAuthorized = false;
  };
  var Utils = {
/**
 * Functions for Callback features
 */
//onValidUpdateAccount
    onValidUpdateAccount: function (response) {
      if (response.status === 200) {
        $log.log('success update password! ', response);
        FlashService.Success('Change account successfull...');
      } else {
        $log.log('success update password! ', response);
        FlashService.Error(response.data);
      }
    },
/**
 * Functions for User
 */
//setUserCurrent
    setUserCurrent: function (data) {
      user.userId = data.userId;
      user.username = data.username;
      user.firstName = data.firstName;
      user.lastName = data.lastName;
      user.role = data.role;
      $log.debug('set user ', user);
    },
//setUserCurrentBlank
    setUserCurrentBlank: function () {
      user.userId = 0;
      user.username = '';
      user.firstName = '';
      user.lastName = '';
      user.role = '';
      user.isAuthorized = false;
      $log.debug('set user blank ', user);
    },
//setIsAuthorized
    setIsAuthorized: function () {
      user.isAuthorized = true;
      $log.debug('isAuthorized...', user.isAuthorized);
    },
//setNotAuthorized
    setNotAuthorized: function () {
      user.isAuthorized = false;
      $log.debug('notAuthorized...', user.isAuthorized);
    },
//isAutorized
    isAuthorized: function () {
      $log.debug('check isAutorized...', user.isAuthorized);
      return user.isAuthorized;
    },
//getUserCurrent
    getUserCurrent: function () {
      $log.debug('get user singleton...', user);
      return user;
    },
//refreshUserCurrentRoot
    refreshUserCurrentRoot: function () {
      $rootScope.currentUser = user;
      $log.debug('refresh user current in root...', $rootScope.currentUser);
    },
//refreshUserCurrentForData
    refreshUserCurrentForData: function (callback) {
      $log.debug('refresh user current for data...');
      $http({
        method: 'GET',
        url: Backand.getApiUrl() + '/1/objects/users/' + user.userId + '?exclude=items%2C%20__metadata'
      }).then(callback);

    }
  };
  return Utils;
});
