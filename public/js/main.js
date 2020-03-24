angular.module('pontoeletronico', ['ngRoute', 'ngStorage'])
	.config(function ($routeProvider, $locationProvider) {

		$locationProvider.html5Mode(true);

		$routeProvider.when('/home', {
			templateUrl: 'partials/home.html',
			controller: 'LoginController'
		});

		$routeProvider.when('/ponto/:usuarioId', {
			templateUrl: 'partials/usuario.html',
			controller: 'PontoController'
		});

		$routeProvider.when('/gestao', {//pagina gestao
			templateUrl: 'partials/gestao.html',
			controller: 'GestaoController'
		});
		$routeProvider.when('/gestao/novo/usuario', {//pagina cadastro novo usuario
			templateUrl: 'partials/cadastro-usuario.html',
			controller: 'GestaoController'
		});
		$routeProvider.when('/gestao/novo/usuario/:usuarioId', {//pagina edição de usuario
			templateUrl: 'partials/cadastro-usuario.html',
			controller: 'GestaoController'
		});
		$routeProvider.otherwise({ redirectTo: '/home' });

	});