'use strict';
angular.module('user', [
  'ionic',
  'ngCordova',
  'ui.router',
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider) {

  // ROUTING with ui.router
  $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    .state('user', {
      url: '/user/welcome',
      abstract: true,
      templateUrl: 'user/templates/menu.html',
      controller: 'UserMenuCtrl as menu'
    })
    // this state is placed in the <ion-nav-view> in the index.html
    .state('user.profile', {
      url: '/user/profile',
      views: {
        'pageContent': {
          templateUrl: 'user/templates/profile.html',
          controller: 'UserCtrl as user'
        }
      }
    });
});
