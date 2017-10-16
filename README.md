## angulartics-customerio
[![NPM version][npm-image]][npm-url] [![NPM downloads][npm-downloads-image]][npm-downloads-url] [![Bower version][bower-image]][bower-url] [![MIT license][license-image]][license-url]

CustomerIO plugin for [Angulartics](http://github.com/angulartics).

## Install
First make sure you've read installation and setup instructions for [Angulartics](http://angulartics.github.io/).

Then you can install this package either with `npm` or with `bower`.

### npm

```shell
npm install angulartics-customerio
```

Then add `angulartics.customerio` as a dependency for your app:

```javascript
require('angulartics')

angular.module('myApp', [
  'angulartics', 
  require('angulartics-customerio')
]);
```

### bower
```shell
bower install angulartics-customerio
```

Add the `<script>` to your `index.html`:

```html
<script src="/bower_components/angulartics-customerio/dist/angulartics-customerio.min.js"></script>
```

Then add `angulartics.customerio` as a dependency for your app:

```javascript
angular.module('myApp', ['angulartics','angulartics.customerio']);
```

## Documentation
* This plugin includes the snippet code provided by Amplitude.
<br>
* Init your api key in your app .config():
```javascript
var myApp = angular.module('myApp',[]);

myApp.config(['$analytics_customerioProvider', function($analytics_customerioProvider) {
    $analytics_customerioProvider.init("Site_ID");
}]);
```

If needed, you can access the CustomerIO object by injecting '$analytics_customerio'. For instance:
```javascript
myApp.run(['$analytics_customerio', function($analytics_customerio) {
    $analytics_customerio.cookieNamespace;
}])
```
Check [CustomerIO documentation](https://customer.io/docs/api/javascript.htm) for more details.
<br>
* Tracking Event, Pages and setting user properties are done through '$analytics' service.
This angulartics plugin supports the following analytics calls:
```javascript
$analytics.pageTrack()
$analytics.eventTrack()
$analytics.setUsernames()
$analytics.setUserProperties()
$analytics.setSuperProperties()
```

Check [Angulartics documentation](https://github.com/angulartics/angulartics) for more details.

## Development

```shell
npm install
npm run build
```

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/angulartics-customerio.svg
[npm-url]: https://npmjs.org/package/angulartics-customerio
[npm-downloads-image]: https://img.shields.io/npm/dm/angulartics-customerio.svg
[npm-downloads-url]: https://npmjs.org/package/angulartics-customerio
[bower-image]: https://img.shields.io/bower/v/angulartics-customerio.svg
[bower-url]: http://bower.io/search/?q=angulartics-customerio
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg
[license-url]: LICENSE