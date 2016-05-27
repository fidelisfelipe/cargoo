'use strict';
angular.module('auth')
.controller('AccountCtrl', function ($log, $ionicPopup, $ionicLoading, $scope, $http, UserService, $state) {
  $log.log('Hello from your Controller: AccountCtrl in module auth:. This is your controller:', this);
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

  this.account = function (form) {
    $log.log('new account submitted');
    $log.log('account valid: ', form.$valid);
    if (form.$valid) {
      $log.log('sended account: ', this.data);
      $scope.data = { json: JSON.stringify(this.data), dest: 'http://cep.paicon.com.br/json/72145811', result: ''};
      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        template: 'Rest<input type="text" ng-model="data.dest"><br/>send:<textarea ng-model="data.json"></textarea>',
        title: 'DEST WS',
        subTitle: 'Please define url rest',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Send</b>',
            type: 'button-positive',
            onTap: function (e) {
              if (!$scope.data.dest) {
                //don't allow the user to close unless he enters dest ws
                e.preventDefault();
              } else {
                $log.log('sending...');
                return $scope.data.dest;
              }
            }
          },
        ]
      });
      myPopup.then(function (res) {
        var string = 'dest: ';
        string += res;
        $ionicLoading.show({
          template: 'Sending...'
        }).then(function () {
          var result = UserService.createUser($scope.data);
          result.success(function (data) {
            $ionicLoading.hide();
            $scope.data.result = JSON.stringify(data);
            $ionicPopup.alert({
              title: 'Success',
              scope: $scope,
              template: '<textarea ng-model="data.result"></textarea>'
            }).then(function () {
              $state.go('profile');
            });
          });
          result.error(function (results) {
            $ionicLoading.hide();
            $ionicPopup.alert({
              title: 'Fail',
              template: results
            });
          });
        });
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
