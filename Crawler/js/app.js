var Crawler = angular.module('Crawler', []);

Crawler.config(
	['$controllerProvider',
		'$provide',
		'$compileProvider',
		'$filterProvider',
		function ($controllerProvider, $provide, $compileProvider, $filterProvider) {
			'use strict';

			// Let's keep the older references.
			Crawler._controller = Crawler.controller;
			Crawler._service = Crawler.service;
			Crawler._factory = Crawler.factory;
			Crawler._value = Crawler.value;
			Crawler._constant = Crawler.constant;
			Crawler._directive = Crawler.directive;
			Crawler._filter = Crawler.filter;

			// Provider-based controller.
			Crawler.controller = function (name, constructor) {
				$controllerProvider.register(name, constructor);
				return (this);
			};

			// Provider-based service.
			Crawler.service = function (name, constructor) {
				$provide.service(name, constructor);
				return (this);
			};

			// Provider-based factory.
			Crawler.factory = function (name, factory) {
				$provide.factory(name, factory);
				return (this);
			};

			// Provider-based value.
			Crawler.value = function (name, value) {
				$provide.value(name, value);
				return (this);
			};

			// Provider-based constant.
			Crawler.constant = function (name, value) {
				$provide.constant(name, value);
				return (this);
			};

			// Provider-based directive.
			Crawler.directive = function (name, factory) {
				$compileProvider.directive(name, factory);
				return (this);
			};

			// Provider-based directive.
			Crawler.filter = function (name, factory) {
				$filterProvider.register(name, factory);
				return (this);
			};
		}
	]
);
