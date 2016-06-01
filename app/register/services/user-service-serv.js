'use strict';
angular.module('register')
.factory('UserService', UserService);
UserService.$inject = ['$http', '$timeout', '$filter', '$q'];
function UserService ($http, $timeout, $filter, $q) {
  var service = {};

  service.GetAll = GetAllMock;
  service.GetById = GetByIdMock;
  service.GetByUsername = GetByUsernameMock;
  service.Create = CreateMock;
  service.Update = UpdateMock;
  service.Delete = DeleteMock;

  return service;
/*eslint-disable no-unused-vars*/
  function GetAll () {
    return $http.get('/api/users', {headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}).then(handleSuccess, handleError('Error getting all users'));
  }

  function GetAllMock () {
    var deferred = $q.defer();
    deferred.resolve(getUsers());
    return deferred.promise;
  }

  function GetById (id) {
    return $http.get('/api/users/' + id, {headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}).then(handleSuccess, handleError('Error getting user by id'));
  }
  function GetByIdMock (id) {
    var deferred = $q.defer();
    var filtered = $filter('filter')(getUsers(), { id: id });
    var user = filtered.length ? filtered[0] : null;
    deferred.resolve(user);
    return deferred.promise;
  }

  function GetByUsername (username) {
    return $http.get('/api/users/' + username, {headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}).then(handleSuccess, handleError('Error getting user by username'));
  }
  function GetByUsernameMock (username) {
    var deferred = $q.defer();
    var filtered = $filter('filter')(getUsers(), { username: username });
    var user = filtered.length ? filtered[0] : null;
    deferred.resolve(user);
    return deferred.promise;
  }

  function Create (user) {
    return $http.post('/api/users', user, {headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}).then(handleSuccess, handleError('Error creating user'));
  }
  function CreateMock (user) {
    var deferred = $q.defer();

// simulate api call with $timeout
    $timeout(function () {
      GetByUsernameMock(user.username)
        .then(function (duplicateUser) {
          if (duplicateUser !== null) {
            deferred.resolve({ success: false, message: 'Username "' + user.username + '" is already taken' });
          } else {
            var users = getUsers();

// assign id
            var lastUser = users[users.length - 1] || { id: 0 };
            user.id = lastUser.id + 1;

// save to local storage
            users.push(user);
            setUsers(users);

            deferred.resolve({ success: true });
          }
        });
    }, 1000);

    return deferred.promise;
  }

  function Update (user) {
    return $http.put('/api/users/' + user.id, user, {headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}).then(handleSuccess, handleError('Error updating user'));
  }
  function UpdateMock (user) {
    var deferred = $q.defer();

    var users = getUsers();
    for (var i = 0; i < users.length; i++) {
      if (users[i].id === user.id) {
        users[i] = user;
        break;
      }
    }
    setUsers(users);
    deferred.resolve();

    return deferred.promise;
  }

  function Delete (id) {
    return $http.delete('/api/users/' + id, {headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}).then(handleSuccess, handleError('Error deleting user'));
  }
  function DeleteMock (id) {
    var deferred = $q.defer();

    var users = getUsers();
    for (var i = 0; i < users.length; i++) {
      var user = users[i];
      if (user.id === id) {
        users.splice(i, 1);
        break;
      }
    }
    setUsers(users);
    deferred.resolve();

    return deferred.promise;
  }
/*eslint-disable no-unused-vars*/
// private functions

  function handleSuccess (res) {
    return res.data;
  }

  function handleError (error) {
    return function () {
      return { success: false, message: error };
    };
  }
  function getUsers () {
    if (!localStorage.users) {
      localStorage.users = JSON.stringify([]);
    }

    return JSON.parse(localStorage.users);
  }

  function setUsers (users) {
    localStorage.users = JSON.stringify(users);
  }
}
