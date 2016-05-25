'use strict';
angular.module('auth', [
  'ionic',
  'ngCordova',
  'ui.router',
  'ngMessages',
  'ui.utils.masks',
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider) {

  // ROUTING with ui.router
  $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    .state('account', {
      url: '/account',
      templateUrl: 'auth/templates/account.html',
      controller: 'AccountCtrl as account'
    })
    .state('authfacebook', {
      url: '/authfacebook',
      templateUrl: 'auth/templates/facebook.html',
      controller: 'AuthFacebookCtrl as authfacebook'
    });
});
