'use strict';
angular.module('cargoo', [
  // load your modules here
  'main',
  'home',
  'auth', // starting with the main module
]).config(function ($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  $httpProvider.defaults.headers.common['Accept'] = 'application/json';
  $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  $httpProvider.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET';
  $httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = 'Content-Type';
});
