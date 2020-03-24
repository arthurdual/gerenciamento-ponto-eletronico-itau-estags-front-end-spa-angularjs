angular.module('pontoeletronico').controller('LoginController', function ($scope, $http, $localStorage) {
	url = 'https://apirest-pontoeletronico.herokuapp.com/api/gestao/usuario'
	$scope.submeter = function () {
		if ($scope.usuario.nome == "chico" || $scope.usuario.nome == "moro" || $scope.usuario.nome == "antonio") {//gestores
			if ($scope.usuario.senha == '123') {
				$localStorage.nome = $scope.usuario.nome
				window.location.href = "/gestao";
			} else {
				alert("Senha incorreta!!")
			}
		} else if ($scope.usuario.nome != "chico" && $scope.usuario.nome != "moro" && $scope.usuario.nome != "antonio") {//usuarios
			$scope.gestao = []
			$http.get(url)
				.success(function (gestao) {
					existe = false
					for (const key in gestao) {
						if (gestao[key]['nome'] == $scope.usuario.nome) {
							existe = true
							if ($scope.usuario.senha == '123') {
								$localStorage.nome = $scope.usuario.nome
								window.location.href = "/ponto/" + gestao[key]['nome'];
							} else {
								alert("Senha incorreta!!")
							}
						}
					}
					if (existe == false) {
						alert("Este usuario não existe!!")

					}
				})
				.error(function (erro) {
					alert('Ocorreu um erro: ' + erro)
				})
		}
	}
});