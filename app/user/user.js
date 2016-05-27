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
    .state('profile', {
      url: '/profile',
      template: '<ion-view view-title="Profile">Account Create Success</ion-view>',
      // templateUrl: 'user/templates/<someTemplate>.html',
      // controller: 'SomeCtrl as ctrl'
    });
});
