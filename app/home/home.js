'use strict';
angular.module('home', [
  'ionic',
  'ngCordova',
  'ui.router',
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider) {
  // ROUTING with ui.router
  $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    .state('home', {
      url: '/home',
      abstract: true,
      templateUrl: 'home/templates/menu.html',
      controller: 'HomeMenuCtrl as menu'
    })
    .state('home.welcome', {
      url: '/welcome',
      views: {
        'pageContent': {
          templateUrl: 'home/templates/welcome.html',
          controller: 'HomeCtrl as home'
        }
      }
    });
});
