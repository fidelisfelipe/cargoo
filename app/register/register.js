'use strict';
angular.module('register', [
  'ionic',
  'ngCordova',
  'ui.router',
  'ngCookies',
  'ngMessages',
  'ui.utils.masks',
  'LocalForageModule',
  // TODO: load other modules selected during generation
])
.config(config)
.run(run);

config.$inject = ['$stateProvider', '$urlRouterProvider'];
function config ($stateProvider, $urlRouterProvider) {

//remember config

//router config
  $urlRouterProvider.otherwise('/index');

  $stateProvider

  .state('login', {
    url: '/login',
    controller: 'LoginCtrl as vm',
    templateUrl: 'register/templates/login.view.html'
  })

  .state('recover', {
    url: '/recover',
    controller: 'RecoverCtrl as vm',
    templateUrl: 'register/templates/recover.view.html'
  })

  .state('register', {
    url: '/register',
    controller: 'RegisterCtrl as vm',
    templateUrl: 'register/templates/register.view.html'
  });

}
run.$inject = ['$rootScope', '$location', '$cookieStore', '$http', '$log', '$state'];
function run ($rootScope, $location, $cookieStore, $http, $log, $state) {
// keep user logged in after page refresh
  $rootScope.globals = $cookieStore.get('globals') || {};
  if ($rootScope.globals.currentUser) {
    $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
  }

  $rootScope.$on('$locationChangeStart', function () {//event, next, current) {
// redirect to login page if not logged in and trying to access a restricted page
    //workaround replace $.inArray(jquery version);
    $rootScope.inArray = function (item, array) {
      return (-1 === array.indexOf(item));
    };
    var restrictedPage = $rootScope.inArray($location.path(), ['/login', '/register', '/recover']);
    $log.log('local path:', $location.path());
    var loggedIn = $rootScope.globals.currentUser;
    if (restrictedPage && !loggedIn) {
      $state.go('login');
    }
  });
}
