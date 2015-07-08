/*global Crawler:true */
/* Contains helper methods for Crawler Controller */
Crawler.factory('Crawler.Factory', [
	function () {
		'use strict';

		return {
			/**
			 * Extracts the protocol and hostname from a given url
			 * @param {string} url - The url to be parsed
			 */
			extractDomain: function(url) {
				if (typeof url === "string" && url.length > 0) {
					// Create a new in-memory anchor element to take advantage of 
					// native href parsing
					var link = document.createElement("a");
					link.href = url;

					return link.protocol + '//' + link.hostname;
				}
				return '';
			}
		};
	}
]);
