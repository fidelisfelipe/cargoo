'use strict';
angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router',
  'ngMessages',
  'ui.utils.masks',
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider, $urlRouterProvider) {

  // ROUTING with ui.router
  $urlRouterProvider.otherwise('/entrar');
  $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    .state('entrar', {
      url: '/entrar',
      templateUrl: 'main/templates/entrar.html',
      controller: 'MainCtrl as main'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'main/templates/login.html',
      controller: 'LoginCtrl as login'
    })
    .state('recover', {
      url: '/recover',
      templateUrl: 'main/templates/recover.html',
      controller: 'LoginCtrl as login'
    });
});
