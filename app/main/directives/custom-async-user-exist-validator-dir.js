'use strict';
angular.module('main')
.directive('customAsyncUserExistValidator',
  ['$http', '$log', function ($http, $log) {

    return {
      require: 'ngModel',
      link: function (scope, element, attrs, ngModel) {
        var apiUrl = attrs.customAsyncUserExistValidator;

        function setAsLoading (bool) {
          ngModel.$setValidity('customAsyncUserExistLoading', !bool);
        }

        function setAsAvailable (bool) {
          ngModel.$setValidity('customAsyncUserExist', bool);
        }

        ngModel.$parsers.push(function (value) {
          $log.log('value email: ', value);
          if (!value || value.length <= 9) {
            return;
          }

          $log.log('apiUrl: ', apiUrl);
          $http.get(apiUrl, { v: value })
            .success(function (data) {
              setAsLoading(true);
              var bolExist = false;
              $log.log('match receiver: ', data.emails.length);
              for (var i = 0, len = data.emails.length; i < len; i++)
                {
                $log.log('email receiver: ', data.emails[i].toUpperCase());
                $log.log('email tested: ', value.toUpperCase());
                if (data.emails[i].toUpperCase() === value.toUpperCase()) {
                  $log.log('existe');
                  bolExist = true;
                  break;
                } else {
                  $log.log('não existe');
                }
              }

              setAsLoading(false);
              setAsAvailable(!bolExist);

            })
            .error(function (data) {
              setAsLoading(false);
              setAsAvailable(false);
              $log.log('data error:', data);
            });

          return value;
        });
      }
    };
  }]);
