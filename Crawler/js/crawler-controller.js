/*global Crawler:true */
/* Main controller for Crawler module */
Crawler.controller('Crawler.Controller', [
	'$scope',
	'$window',
	'Crawler.Service',
	'Crawler.Factory',
	function ($scope, $window, crawlerService, crawlerFactory) {
		'use strict';

		/**
		 * Private helper methods
		 * @private
		 */
		var my = {
			/**
			 * Success handler for the fetch url call
			 * @param {Object} response - Response object from $http promise
			 */
			fetchUrlSuccess: function (response) {
				if (response.status === 200) {
					// response.data contains the full page markup
					// jQuery wrapping it allows us to filter/loop within
					// We are selecting all the children of top level elements
					var nodes = $(response.data).find('*');

					// Loop through the nodes to parse them, but do this only once per page
					angular.forEach(nodes, function (node) {

						// If the node is an element
						if (node.nodeType === 1) {

							// If the node is an Anchor ..
							if (node.nodeName === 'A') {

								// .. AND have a valid HREF attribute
								if (node.href && node.href.length > 0) {

									// If the href domain of the Anchor is the same as our search domain, 
									// then add it to the internal links collection ..
									if (node.href.indexOf(this.model.domain) !== -1) {
										// .. ONLY If it wasn't added before
										if (!this.model.internalLinks[node.href]) {
											this.model.internalLinks[node.href] = node.href;
											this.model.internalLinksCount++;
											$scope.urlsToBeFetched.push(node.href);
										}
									}
									else {
										// It is an external url, only add it to external links 
										// collection if it wasn't added before
										if (!this.model.externalLinks[node.href]) {
											this.model.externalLinks[node.href] = node.href;
											this.model.externalLinksCount++;
											
										}
									}
								}
							}
							// If the node is an image ..
							if (node.nodeName === 'IMG') {
								// .. AND have a valid SRC attribute
								if (node.src && node.src.length > 0) {
									// If the src domain of the image is the same as our search domain, 
									// then add it to the internal image links collection ..
									if (node.src.indexOf(this.model.domain) !== -1) {
										// .. ONLY If it wasn't added before
										if (!this.model.internalImageLinks[node.src]) {
											this.model.internalImageLinks[node.src] = node.src;
											this.model.internalImageLinksCount++;
										}
									}
									else {
										// It is an external image url, only add it to external image links 
										// collection if it wasn't added before
										if (!this.model.externalImageLinks[node.src]) {
											this.model.externalImageLinks[node.src] = node.src;
											this.model.externalImageLinksCount++;
										}
									}
								}
							}
						}
					}
					// Bind makes sure that the context within the async loop is the same as our controller
					// This is required in order to access this.model
					.bind(this));

					// The XHR call is complete, clear the cached promise so the next call in the queue can progress
					this.model.fetchPromise = null;
					// The current url is fetched. Remove it from the queue to let the loop progress.
					$scope.urlsToBeFetched.splice(0, 1);
				}
			},

			/**
			 * Error handler for the fetch url call
			 * @param {Object} response - Response object from $http promise
			 */
			fetchUrlError: function (response) {
				this.model.fetchPromise = null;
				this.model.errorMessage = 'Error';
				this.state.fetching = false;
			}
		};

		/**
		 * The object responsible from managing UI state within the controller
		 */
		this.state = {
			fetching: false
		};

		/**
		 * Data model object
		 */
		this.model = {
			startUrl: '',
			fetchPromise: null,
			errorMessage: '',
			internalLinks: {},
			externalLinks: {},
			internalImageLinks: {},
			externalImageLinks: {},
			internalLinksCount: 0,
			externalLinksCount: 0,
			internalImageLinksCount: 0,
			externalImageLinksCount: 0
		};

		/**
		 * Method that resets the link lists and counts
		 */
		this.clear = function() {
			this.model.internalLinks = {};
			this.model.externalLinks = {};
			this.model.internalImageLinks = {};
			this.model.externalImageLinks = {};
			this.model.internalLinksCount = 0;
			this.model.externalLinksCount = 0;
			this.model.internalImageLinksCount = 0;
			this.model.externalImageLinksCount = 0;
		};

		/**
		 * Submit handler for the GO button
		 */
		this.onSubmit = function () {
			// Start only if we have a valid url
			if (this.model.startUrl) {

				// Disable the button until crawling is complete
				this.state.fetching = true;

				// Clear the lists
				this.clear();

				// Cache the requested url's domain
				this.model.domain = crawlerFactory.extractDomain(this.model.startUrl);

				// Push the start url into the queue to kick start
				$scope.urlsToBeFetched.push(this.model.startUrl);
			}
		};

		// Queue for urls to be fetched and parsed
		$scope.urlsToBeFetched = [];

		/*
		 * Watch handler for the url queue
		 */ 
		$scope.$watch('urlsToBeFetched', function () {
			// Fetch a new url only if there is a valid one in the queue and there are no requests in progress
			if (angular.isArray($scope.urlsToBeFetched) && $scope.urlsToBeFetched.length > 0 && this.model.fetchPromise === null) {

				// Pick up the first one from the queue
				this.model.currentUrl = $scope.urlsToBeFetched[0];

				// Call the service to fetch the page
				this.model.fetchPromise = crawlerService.fetchUrl(this.model.startUrl)
					.then(
						my.fetchUrlSuccess.bind(this),
						my.fetchUrlError.bind(this)
					);
			}
			// When we reach length 0 in the queue, we are done
			else if (angular.isArray($scope.urlsToBeFetched) && $scope.urlsToBeFetched.length === 0) {
				// Crawling is complete, enable the button
				this.state.fetching = false;
			}
		}.bind(this),true);

		/*
		 * Destroy handler for the controller
		 */
		this.onDestroy = function () {
			my = null;
		};
	}
]);
