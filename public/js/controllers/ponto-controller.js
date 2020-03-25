angular.module('pontoeletronico')
	.controller('PontoController', function ($scope, $http, $localStorage, $routeParams, $route) {

		$scope.ponto = []
		$scope.nome = $localStorage.nome
		$scope.filtro = $scope.nome
		$scope.jornada = ''
		url = 'https://apirest-pontoeletronico.herokuapp.com/api/ponto'

		$http.get(url + '/usuario/' + $routeParams.usuarioId)
			.success(function (ponto) {
				for (const date in ponto) {
					horasServidor = ponto[date]['data'].split("T")[1]
					horasBrasil = parseInt(horasServidor.split(':')[0]) - 3
					dataBrasil = ponto[date]['data'].split("T")[0] + 'T' + horasBrasil + ':' + horasServidor.split(':')[1] + ':' + horasServidor.split(':')[2]
					ponto[date]['data'] = dataBrasil;
				}
				$scope.ponto = ponto;
				console.log(ponto)

				//calcula jornada do dia
				timestampEntrada = []
				timestampSaida = []
				if ($scope.ponto.length != 0) {// verifica se nao esta vazio 
					dataBase = ponto[ponto.length - 1]['data'].split("T")[0]
					for (const date in $scope.ponto) { // separa entradas em um array e saidas em outro
						if (dataBase = ponto[date]['data'].split("T")[0]) {
							if (ponto[date]['tipo'] == 'entrada') {
								entrada = ponto[date]['data'].split("T")[1].split(":")
								timestampEntrada.push(parseInt(entrada[0] * 3600) + parseInt(entrada[1] * 60) + parseInt(entrada[2]))
							} else {
								saida = ponto[date]['data'].split("T")[1].split(":")
								timestampSaida.push(parseInt(saida[0] * 3600) + parseInt(saida[1] * 60) + parseInt(saida[2]))
							}
						}
					};
				}

				time = 0
				if (timestampEntrada.length == timestampSaida.length) {// verifica se os array tem o msm tamanho
					for (const key in timestampEntrada) { // calcula jornada
						time += timestampSaida[key] - timestampEntrada[key]
					}
				} else if (timestampEntrada.length == timestampSaida.length + 1) {//verifica falta uma saida no array
					for (let i = 0; i < timestampSaida.length; i++) {// calcula jornada
						time += timestampSaida[i] - timestampEntrada[i]
					}
					d = new Date();
					horasRestantes = d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
					time += horasRestantes - timestampEntrada[timestampEntrada.length - 1] // soma jornada obtendo o horario atual
				}

				//transforma timestamp da jornada pra time
				dateObj = new Date(time * 1000);
				utcString = dateObj.toUTCString();
				jornada = utcString.slice(-12, -4);
				$scope.jornada = jornada
			})
			.error(function (erro) {
				alert('Ocorreu um erro: ' + erro)
			})

		$scope.submeter = function () {// bate ponto
			$scope.batendoPonto.nome = $routeParams.usuarioId
			if ($scope.ponto.length == 0) {// caso seja primeira batida de ponto do dia
				batePonto()
			} else {
				if ($scope.batendoPonto.tipo == $scope.ponto[$scope.ponto.length - 1]['tipo']) { // verifica entrada duplicada
					alert('Não é possivel bater um ponto ' + $scope.batendoPonto.tipo + ' após resgistrar uma ' + $scope.ponto[$scope.ponto.length - 1]['tipo'])
				} else {
					batePonto()
				}
			}
		}

		function batePonto() {
			if ($scope.batendoPonto.tipo == 'entrada' || $scope.batendoPonto.tipo == 'saida') {
				$http.post(url, $scope.batendoPonto)
					.success(function () {
						$scope.novoUsuario = {};
						alert('Ponto batido')
						$route.reload()
					})
					.error(function (erro) {
						alert('Não foi possível bater o ponto tente novamente mais tarde, Ocorreu um erro: ' + erro)
					})
			} else {
				alert('Digite apenas entrada ou saida')
			}
		}
	});

