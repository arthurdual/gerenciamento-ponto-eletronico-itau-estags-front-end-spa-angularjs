angular.module('pontoeletronico').controller('GestaoController', function ($scope, $http, $routeParams, $route) {
	$scope.gestao = []
	$scope.filtro = ''
	url = 'https://apirest-pontoeletronico.herokuapp.com/api/gestao/usuario'

	$http.get(url)//busca todos os usuarios
		.success(function (gestao) {
			$scope.gestao = gestao;
		})
		.error(function (erro) {
			alert('Não foi possivel encontrar os usuarios' + ', Ocorreu um erro: ' + erro);
		})
	if ($routeParams.usuarioId) {// busca informações dos usuarios existentes se ouver um route param
		$http.get(url + '/' + $routeParams.usuarioId)
			.success(function (novoUsuario) {
				$scope.novoUsuario = novoUsuario;
			})
			.error(function (erro) {
				alert('Não foi possível obter as informações deste usuario #' + $routeParams.usuarioId + ', Ocorreu um erro: ' + erro);
			});
	}

	$scope.submeter = function () {
		alert('Processando solicitação ... Aguarde!!');
		if ($scope.formulario.$valid) {// valida formulario

			usuarioExistente = false
			for (let i = 0; i < $scope.gestao.length; i++) {// valida se o usuario ja existe
				if ($scope.gestao[i]['nome'] == $scope.novoUsuario.nome) {
					usuarioExistente = true
					break
				}
			}

			if (usuarioExistente == false) {
				if ($scope.novoUsuario.id) {// Edita um usuario
					$http.put(url, $scope.novoUsuario)
						.success(function () {
							alert('Informações do usuario(a) ' + $scope.novoUsuario.nome + ' alteradas com sucesso');
							$route.reload()
						})
						.error(function (erro) {
							alert('Não foi possível fazer as alterações no usuario #' + $routeParams.usuarioId + ', Ocorreu um erro: ' + erro);
						});
				} else {// cadastra novo usuario
					console.log($scope.novoUsuario);
					$http.post(url, $scope.novoUsuario)
						.success(function () {
							alert('Usuario ' + $scope.novoUsuario.nome + ' cadastrado(a) com sucesso');
							$scope.novoUsuario = {};
						})
						.error(function (erro) {
							console.log(erro);
							alert('Não foi possível cadastrar o usuario' + ', Ocorreu um erro: ' + erro);
						})
				}
			} else {
				alert('Este usuario já existe, Por favor insira outro nome de usuario!!')
			}

		}
	};
});