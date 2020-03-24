angular.module('pontoeletronico')
	.controller('PontoController', function ($scope, $http, $localStorage, $routeParams) {

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

				//calcula jornada do ultimo dia com ponto registrado
				timestampEntrada = []
				timestampSaida = []
				dataBase = ponto[0]['data'].split("T")[0]
				for (const date in $scope.ponto) {
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

				time = 0
				if (timestampEntrada.length == timestampSaida.length) {// calcula time
					for (const key in timestampEntrada) {
						time += timestampSaida[key] - timestampEntrada[key]
					}
				} else if (timestampEntrada.length == timestampSaida.length + 1) {// calcula time caso em tempo real
					for (let i = 0; i < timestampSaida.length; i++) {
						time += timestampSaida[i] - timestampEntrada[i]
					}
					d = new Date();
					n = d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
					time += n - timestampEntrada[timestampEntrada.length - 1]
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
			$scope.batendoPonto.nome = $scope.nome
			console.log($scope.batendoPonto)
			if ($scope.batendoPonto.tipo == 'entrada' || $scope.batendoPonto.tipo == 'saida') {
				$http.post(url, $scope.batendoPonto)
					.success(function () {
						$scope.novoUsuario = {};
						alert('Ponto batido')
					})
					.error(function (erro) {
						alert('Não foi possível bater o ponto tente novamente mais tarde, Ocorreu um erro: ' + erro)
					})
			} else {
				alert('Digite apenas entrada ou saida')
			}
		}
	});