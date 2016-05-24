'use strict';
angular.module('cargoo', [
  // load your modules here
  'main',
  'home',
  'auth', // starting with the main module
])
.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})
.constant('USER_ROLES', {
  admin: 'admin_role',
  public: 'public_role'
});
