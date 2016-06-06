'use strict';
angular.module('welcome', [
  'ionic',
  'ngCordova',
  'ui.router',
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider) {

  // ROUTING with ui.router
  $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    .state('welcome', {
      url: '/welcome',
      abstract: true,
      templateUrl: 'welcome/templates/menu.html',
      controller: 'WelcomeMenuCtrl as menu'
    })
  .state('welcome.index', {
    url: '/index',
    views: {
      'pageContent': {
        templateUrl: 'welcome/templates/index.html',
        controller: 'WelcomeIndexCtrl as vm'
      }
    }
  })
  .state('welcome.list', {
    url: '/list',
    views: {
      'pageContent': {
        templateUrl: 'welcome/templates/list.html',
        // controller: '<someCtrl> as ctrl'
      }
    }
  })
  .state('welcome.listDetail', {
    url: '/list/detail',
    views: {
      'pageContent': {
        templateUrl: 'welcome/templates/list-detail.html',
        // controller: '<someCtrl> as ctrl'
      }
    }
  })
  .state('welcome.debug', {
    url: '/debug',
    views: {
      'pageContent': {
        templateUrl: 'welcome/templates/debug.html',
        controller: 'WelcomeDebugCtrl as ctrl'
      }
    }
  });
});
