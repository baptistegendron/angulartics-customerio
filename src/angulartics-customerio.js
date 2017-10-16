/**
 * CustomerIO support contributed by http://github.com/bateast2
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
    .provider('$analytics_customerio', ['$analyticsProvider', function($analyticsProvider) {        
        var loadSnippet = function(siteId) {

            // Loading the CustomerIO snippet
            // IMPORTANT: when updating snippet, prefix '_cio' with 'window.'
            window._cio = window._cio || [];
            (function() {
				var a,b,c;a=function(f){return function(){window._cio.push([f].
				concat(Array.prototype.slice.call(arguments,0)))}};b=["load","identify",
				"sidentify","track","page"];for(c=0;c<b.length;c++){window._cio[b[c]]=a(b[c])};
				var t = document.createElement('script'),
					s = document.getElementsByTagName('script')[0];
				t.async = true;
				t.id    = 'cio-tracker';
				t.setAttribute('data-site-id', siteId);
				t.src = 'https://assets.customer.io/assets/track.js';
				s.parentNode.insertBefore(t, s);
            })();

        };

        var provider = {
            $get: ['$window', function ($window) {
                return $window._cio;
            }],
            /**
             * Init CustomerIO API.
             *
             * @param {string} siteId
             *
             * @link https://customer.io/docs/api/javascript.html#section-Installation
             */
            init: loadSnippet
        };
        return provider;
    }])
    
    .config(['$analyticsProvider', function($analyticsProvider) {
        var userId;
        var superProperties = {};

        /**
         * Track Pageview in CustomerIO
         *
         * @param {string} path value of Page dimension stored with hit e.g. '/home'
         * @param {object} $location
         *
         * @link https://customer.io/docs/api/javascript.html#section-Track_a_custom_event
         */
        $analyticsProvider.registerPageTrack(function (path, $location) {
            var properties = {
                url: path,
                host: $location.host()
            };
            properties = angular.extend({}, superProperties, properties);

            window._cio.track('PageView', properties);
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
            properties = properties || {};
            properties = angular.extend({}, superProperties, properties);

            window._cio.track(eventName, properties);
        });

        /**
         * Set userId in CustomerIO
         * 
         * @param {string} username Must be unique per customer. Null is allowed for anonymous user
         *
         * @link https://customer.io/docs/api/javascript.html#section-Identify_customers
         */
        $analyticsProvider.registerSetUsername(function (username) {
            userId = username;

            window._cio.identify({
				id: userId
			});
        });
        
        /**
          * Set user properties in CustomerIO.
		  *
		  * @param {object} properties = {
          *		first_name: 'John', // Add any attributes you'd like to use in the email subject or body.
		  *		...
		  *     id: userId, // Optional if you already called $analytics.SetUsername() before
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
            if (properties.id == null) {
                properties.id = userId;
            }

			window._cio.identify(properties);
        });

        /**
          * Set super properties to be added to all $analytics.pagetTrack and $analytics.eventTrack
		  * To remove a property, set its value to null
          *
		  * @param {object} properties = { superProperty1: value, superPropertyToRemove: null, superProperty2...}
          */
        $analyticsProvider.registerSetSuperProperties(function(properties) {
            for (var property in properties) {
                if (properties.hasOwnProperty(property)) {
                    if (properties[property] == null) {
                        if (superProperties.hasOwnProperty(property))
                            delete superProperties[property];
                    } else {
                        superProperties[property] = properties[property];  
                    }
                }
            }
        });
        
    }]);
})(angular);