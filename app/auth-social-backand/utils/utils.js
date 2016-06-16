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
        //sincronize data for user with model
        Utils.refreshUserCurrentForData();
        //set authorized post logon
        Utils.setIsAuthorized();
        //sincronize var user with root user
        Utils.refreshUserCurrentRoot();
        FlashService.Success('Change account successfull...');
      } else {
        $log.log('success update password! ', response);
        FlashService.Error(response.data);
      }
    },
//onErrorUpdateAccount
    onErrorUpdateAccount: function (response) {
      $log.log('error update account: ', response);
      FlashService.Error(response.data);
    },
//onValidSignup
    onValidSignup: function (response, callback) {
      $log.log('success signup:', response);
      FlashService.Success('Sign Up Successfull!');
      callback();
    },
//onErrorSignup
    onErrorSignup: function (response) {
      $log.log('sigup error: ', response.data);
      if (response.status === 406) {
        if (response.data.error_description === 'Membership failure:InvalidPassword') {
          FlashService.Error('password is lenght invalid! Must 6 digits!');
        } else {
          FlashService.Error(response.data);
        }
      } else {
        FlashService.Error(response.data.error_description);
      }
    //TODO: 417 - Critcal Exception (not exist error_description, sigup_error: 'An unexpected signup  exception occured') with enable e-mail confirm
    },
//onValidUpdatePassword
    onValidUpdatePassword: function (data, logout) {
      $log.log('success update password! ', data);
      FlashService.Success('Change password successfull...');
      logout();
    },
//onErrorUpdatePassword
    onErrorUpdatePassword: function (data) {
      $log.log('error update password: ', data);
      FlashService.Error(data.data);
    },
/**
 * Functions for User
 */
//setUserCurrent
    setUserCurrent: function (data) {
      user.userId = data.userId || data.id;
      user.username = data.username;
      user.firstName = data.firstName;
      user.lastName = data.lastName;
      user.role = data.role;
      $log.debug('set user ', user);
      sessionStorage.currentUser = user;
    },
//setUserForDataDomain
    setUserForDataDomain: function (data) {
      user.firstName = data.firstName;
      user.lastName = data.lastName;
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
      sessionStorage.removeItem('currentUser');
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
      $log.debug('get currentUser...', JSON.parse(sessionStorage.getItem('currentUser')));
      if (JSON.parse(sessionStorage.getItem('currentUser')) !== null) {
        user =  JSON.parse(sessionStorage.getItem('currentUser'));
      }
      return user;
    },
//refreshUserCurrentRoot
    refreshUserCurrentRoot: function () {
      sessionStorage.currentUser = JSON.stringify(user);
    },
//refreshUserCurrentForData
    refreshUserCurrentForData: function () {

      $log.debug('refresh user current for data...');
      $http({
        method: 'GET',
        url: Backand.getApiUrl() + '/1/objects/users/' + user.userId + '?exclude=items%2C%20__metadata'
      }).then(function (response) {
        $log.debug('return user data success!');
        Utils.setUserForDataDomain(response.data);
        Utils.refreshUserCurrentRoot();
      }, function (error) {
        $log.debug('error of update use for data!', error);
      });

    }
  };
  return Utils;
});
