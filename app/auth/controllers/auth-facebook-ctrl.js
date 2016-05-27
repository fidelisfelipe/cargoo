'use strict';
angular.module('auth')
.controller('AuthFacebookCtrl', function ($log, $scope, $state, $q, AuthFacebookUserService, $ionicLoading, $cordovaFacebook) {

  $log.log('Hello from your Controller: AuthFacebookCtrl in module auth:. This is your controller:', this);

  // This is the fail callback from the login method
  var fbLoginError = function (error) {
    $log.log('fbLoginError', error);
    $ionicLoading.hide();
  };

    // This method is to get the user profile info from the facebook api
  var getFacebookProfileInfo = function (authResponse) {
    var info = $q.defer();

    $cordovaFacebook.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
      function (response) {
        $log.log(response);
        info.resolve(response);
      },
      function (response) {
        $log.log(response);
        info.reject(response);
      }
    );
    return info.promise;
  };

  // This is the success callback from the login method
  var fbLoginSuccess = function (response) {
    if (!response.authResponse) {
      fbLoginError('Cannot find the authResponse');
      return;
    }

    var authResponse = response.authResponse;

    getFacebookProfileInfo(authResponse)
    .then(function (profileInfo) {
      // For the purpose of this example I will store user data on local storage
      AuthFacebookUserService.setUser({
        authResponse: authResponse,
        userID: profileInfo.id,
        name: profileInfo.name,
        email: profileInfo.email,
        picture: 'http://graph.facebook.com/' + authResponse.userID + '/picture?type=large'
      });
      $ionicLoading.hide();
      $state.go('home.welcome');
    }, function (fail) {
      // Fail get profile info
      $log.log('profile info fail', fail);
    });
  };

  //This method is executed when the user press the "Login with facebook" button
  $scope.facebookSignIn = function () {
    $cordovaFacebook.getLoginStatus(function (success) {
      if (success.status === 'connected') {
        // The user is logged in and has authenticated your app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed request, and the time the access token
        // and signed request each expire
        $log.log('getLoginStatus', success.status);

        // Check if we have our user saved
        var user = AuthFacebookUserService.getUser('facebook');

        if (!user.userID) {
          getFacebookProfileInfo(success.authResponse)
          .then(function (profileInfo) {
	// For the purpose of this example I will store user data on local storage
            AuthFacebookUserService.setUser({
              authResponse: success.authResponse,
              userID: profileInfo.id,
              name: profileInfo.name,
              email: profileInfo.email,
              picture: 'http://graph.facebook.com/' + success.authResponse.userID + '/picture?type=large'
            });

            $state.go('home.welcome');
          }, function (fail) {
          // Fail get profile info
            $log.log('profile info fail', fail);
          });
        } else {
          $state.go('home.welcome');
        }
      } else {
        // If (success.status === 'not_authorized') the user is logged in to Facebook,
				// but has not authenticated your app
        // Else the person is not logged into Facebook,
				// so we're not sure if they are logged into this app or not.

        $log.log('getLoginStatus', success.status);

        $ionicLoading.show({
          template: 'Logging in...'
        });

		// Ask the permissions you need. You can learn more about
		// FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
        $cordovaFacebook.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
      }
    });
  };
});
