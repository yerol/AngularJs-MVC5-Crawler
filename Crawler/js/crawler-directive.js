/*global Crawler:true */
Crawler.directive('crawlerMain', [
	function () {
		'use strict';

		return {
			restrict: 'E',
			replace: true,
			controllerAs: 'crawlerController',
			controller: 'Crawler.Controller',
			link: function (scope, element, attrs, ctrl) {
				scope.$on('$destroy', ctrl.onDestroy);
			}
		};
	}
]);