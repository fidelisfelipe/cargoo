'use strict';
angular.module('authSocialBackand', [
  'backand',
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider, $urlRouterProvider, $httpProvider, BackandProvider) {

  BackandProvider.setAppName('cargoo');
  BackandProvider.setSignUpToken('1902749c-e19e-4044-90db-ce2e84832ca6');

  $urlRouterProvider.otherwise('/auth/social/backand');
  // ROUTING with ui.router
  $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    .state('authSocialBackand', {
      url: '/auth/social/backand',
      templateUrl: 'auth-social-backand/templates/login.view.html',
      controller: 'AuthSocialBackandCtrl as vm'
    });
  $httpProvider.interceptors.push('APIInterceptor');

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

  function unauthorized () {
    $log.log('user is unauthorized, sending to login');
    $state.go('authSocialBackand');
  }

  function signout () {
    AuthSocialBackandService.signout();
  }

  $rootScope.$on('unauthorized', function () {
    unauthorized();
  });

  $rootScope.$on('authorized', function () {
    Backand.getUserDetails().then(function (data) {
      $rootScope.globals = {
        currentUser: {
          username: data.username
        }
      };
    });

  });

  $rootScope.$on('$stateChangeSuccess', function (event, toState) {
    if (toState.name === 'authSocialBackand') {
      signout();
    }
    else if (toState.name !== 'authSocialBackand' && Backand.getToken() === undefined) {
      unauthorized();
    }
  });
});
