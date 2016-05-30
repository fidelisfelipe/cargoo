'use strict';
angular.module('auth')
.controller('AccountCtrl', function ($log, $ionicPopup, $ionicLoading, $scope, $http, $state) {
  $log.log('Hello from your Controller: AccountCtrl in module auth:. This is your controller:', this);
  var auth = this;

  this.data = {
    'title': 'Criar Conta de Acesso',
    'nome': {placeholder: 'Seu Nome Completo', title: 'Nome Completo', value: null},
    'email': {placeholder: 'informe.seu@email.com.br', title: 'Email'},
    'telefone': {placeholder: '(11)5555-5555', title: 'Telefone'},
    'cpf': {placeholder: 'Seu CPF', title: 'CPF'},
    'dataNascimento': {placeholder: 'Sua Data Nascimento', title: 'Data Nascimento'},
    'senha': { placeholder: 'Sua Nova Senha de 6 dígitos', title: 'Senha'},
    'btnCriar': { title: 'Create Account' },
    'dest': null
  };
  var exist = false;
  var create = false;

  this.account = function (form) {
    $log.log('new account submitted');
    $log.log('account valid: ', form.$valid);
    if (form.$valid) {
      $log.log('sended account: ', auth.data);
      $ionicLoading.show({
        template: 'Sending...'
      }).then(function () {
//verifica se usuario existe
        $http.get('/data/emails.json')
          .success(function (data) {
            $log.log('check user exist: ', auth.data.email.value);

            for (var i = 0, len = data.emails.length; i < len; i++)
            {

              exist = data.emails[i].toUpperCase() === auth.data.email.value.toUpperCase();
              $log.log('checking: ', exist);
              if (exist) {
                break;
              }
            }

          }).error(function (data) {
            $log.log('check user exist fail', data);
          });

        if (!exist) {
          $log.log('init create user...');
          $http.get('/data/accountresponsecreate.json')
            .success(function (data) {
              var jsonResponse = data;
              $log.log('request create success...');
              var status = parseInt(jsonResponse.response.status);

              switch (status) {
                case 201:
                  $log.log('201 - Success create user!');

                  create = true;
                  break;

                case 412:
                  $log.log('412 - Precondition fail!');

                  break;

                case 500:
                  $log.log('500 - Server error!');

                  break;

                default:
                  $log.log('Status not defined: ', status);

              }

            })
            .error(function (data) {
              $log.log('response error...', data);
            });

        }
        if (create) {
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'User Create Success!',
            template: 'Please check your email for validate account'
          }).then(function () {
            $state.go('entrar');
          });

        } else {
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'User Exists',
            template: 'Please check your email or cpf account'
          });
        }
      });
    }
  };

  this.mock = function () {
    this.data.nome.value = 'Fidelis Felipe Caldas Guimarães';
    this.data.email.value = 'atosfiel@gmail.com';
    this.data.telefone.value = '6186075892';
    this.data.cpf.value = '99929830197';
    this.data.dataNascimento.value = (new Date()).toISOString();
    this.data.senha.value = '123456';
  };

  this.clear = function () {
    this.data.nome.value = null;
    this.data.email.value = null;
    this.data.telefone.value = null;
    this.data.cpf.value = null;
    this.data.dataNascimento.value = null;
    this.data.senha.value = null;
  };
});
