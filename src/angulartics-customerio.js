/**
 * CustomerIO support contributed by http://github.com/baptistegendron
 * License: MIT
 */
(function (angular) {
'use strict';

/**
* @ngdoc overview
* @name angulartics.customerio
* Enables analytics support for CustomerIO (https://customer.io)
*/
angular.module('angulartics.customerio', ['angulartics'])

    /**
     * Loading CustomerIo Snippet
     * @link https://customer.io/docs/api/javascript.html
     */
    .provider('$analytics_customerio', [function $customerioProvider() {
       
	    var provider = {
            $get: ['$window', function ($window) {
                return $window._cio;
            }],
            /**
             * Init CustomerIO API.
             *
             * @param {string} siteId
             * @param {string} userId optional
             * @param {string} options optional
             * @param {string} callbackFn(instance) optional
             *
             * @link https://customer.io/docs/api/javascript.html#section-Installation
             */
            init: function (siteId) {
                // Loading the CustomerIO snippet
				var _cio = _cio || [];
				(function() {
					var a,b,c;a=function(f){return function(){_cio.push([f].
					concat(Array.prototype.slice.call(arguments,0)))}};b=["load","identify",
					"sidentify","track","page"];for(c=0;c<b.length;c++){_cio[b[c]]=a(b[c])};
					var t = document.createElement('script'),
						s = document.getElementsByTagName('script')[0];
					t.async = true;
					t.id    = 'cio-tracker';
					t.setAttribute('data-site-id', siteId);
					t.src = 'https://assets.customer.io/assets/track.js';
					s.parentNode.insertBefore(t, s);
				})();
            }            
        };
        return provider;
    }])
    
    .config(['$analyticsProvider', function($analyticsProvider) {

        /**
         * Track Pageview in CustomerIO
         *
         * @param {string} path value of Page dimension stored with hit e.g. '/home'
         * @param {object} $location
         *
         * @link https://customer.io/docs/api/javascript.html#section-Track_a_custom_event
         */
        $analyticsProvider.registerPageTrack(function (path, $location) {
			console.log("EEE location",$location);
			window._cio.track('pageView', {
                url: path
            });
        });

        /**
          * Track event in CustomerIO
          * 
          * @param {string} eventName
          * @param {object} properties
          *
          * @link https://customer.io/docs/api/javascript.html#section-Track_a_custom_event
          */
        $analyticsProvider.registerEventTrack(function (eventName, properties) {
			window._cio.track(eventName, properties);
        });

        /**
         * Set userId in CustomerIO
         * 
         * @param {string} username (null is allowed for anonymous user)
         *
         * @link https://customer.io/docs/api/javascript.html#section-Identify_customers
         */
        $analyticsProvider.registerSetUsername(function (username) {
			window._cio.identify({
				id: username, // Must be unique per customer. To increase security, we recommend hashing your ids.
			});
        });
        
        /**
          * Set user properties in CustomerIO.
		  *
		  * @param {object} properties = {
          *		first_name: 'John', // Add any attributes you'd like to use in the email subject or body.
		  *		...
		  *     id: userId, // Optional if you called $analytics.SetUsername() before
		  *   
		  *   First time you create a user, you shall specify:
		  * 	email: 'user@domain.com',
		  *		created_at: 1339438758, // Timestamp in your system that represents when the user first signed up. You'll want to send it as seconds since the epoch.
		  *	}
		  *
          * @link https://customer.io/docs/api/javascript.html#section-Identify_customers
          */
        $analyticsProvider.registerSetUserProperties(function (properties) {
            properties = properties || {};
            			
			window._cio.identify(properties);
        });
        
    }]);
})(angular);