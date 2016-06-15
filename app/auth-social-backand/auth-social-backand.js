'use strict';
angular.module('authSocialBackand', [
  'backand',
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider, $urlRouterProvider, $httpProvider, BackandProvider) {

  BackandProvider.setAppName('cargoo');
  BackandProvider.setSignUpToken('1902749c-e19e-4044-90db-ce2e84832ca6');

  $httpProvider.interceptors.push('APIInterceptor');

  $urlRouterProvider.otherwise('/auth/social/backand/login');
  // ROUTING with ui.router
  $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    .state('authSocialBackandLogin', {
      url: '/auth/social/backand/login',
      templateUrl: 'auth-social-backand/templates/login.view.html',
      cache: false,
      controller: 'AuthSocialBackandCtrl as vm'
    })
    .state('authSocialBackandSignUp', {
      url: '/auth/social/backand/sigup',
      templateUrl: 'auth-social-backand/templates/signUp.view.html',
      cache: false,
      controller: 'AuthSocialBackandCtrl as vm'
    })
    .state('authSocialBackandUpdatePassword', {
      url: '/auth/social/backand/update/password',
      templateUrl: 'auth-social-backand/templates/updatePassword.view.html',
      cache: false,
      controller: 'AuthSocialBackandCtrl as vm'
    })
    .state('authSocialBackandUpdateAccount', {
      url: '/auth/social/backand/update/account',
      templateUrl: 'auth-social-backand/templates/updateAccount.view.html',
      cache: false,
      controller: 'AuthSocialBackandCtrl as vm'
    });

}).run(function ($ionicPlatform, $rootScope, $state, $log, AuthSocialBackandService, Backand) {

  $ionicPlatform.ready(function () {

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      window.cordova.plugins.Keyboard.disableScroll(true);
    }

    if (window.StatusBar) {
    // org.apache.cordova.statusbar required
      window.StatusBar.styleLightContent();
    }

    var isMobile = !(ionic.Platform.platforms[0] === 'browser');
    Backand.setIsMobile(isMobile);
    Backand.setRunSignupAfterErrorInSigninSocial(true);
  });

  $rootScope.$on('$stateChangeSuccess', AuthSocialBackandService.onChangeSuccess);


});
