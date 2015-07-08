/*global Crawler:true */
/* Contains the XHR methods */
Crawler.service('Crawler.Service', [
	'$http',
	function ($http) {
		'use strict';

		return {
			/**
			 * Fetches the full page markup of a given url
			 * @param {string} url - The url to download the page from
			 */
			fetchUrl : function(url) {
				return $http({
					url: '/home/fetch',
					method: 'GET',
					params: {
						url : url
					}
				});
			}
		};
	}]);
