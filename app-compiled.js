'use strict';

require('angular/angular-csp.css');

require('angular-ui-select/select.min.css');

require('bootstrap/dist/css/bootstrap.min.css');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

require('angular');

require('angular-ui-select/select');

require('angular-mocks');

require('angular-cookies');

require('angular-resource');

require('angular-sanitize');

require('angular-ui-router');

require('angular-jwt');

require('angular-bootstrap/ui-bootstrap-tpls');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.$ = _jquery2.default;

angular.element(document).ready(function () {
    //Fixing facebook bug with redirect
    if (window.location.hash === '#_=_') window.location.hash = '#!';

    //Then init the app
    //手动启动mean这

    angular.bootstrap(document, ['mean']);
});

function processModules(modules) {
    var packageModules = ['ngCookies', 'ngResource', 'ui.bootstrap', 'ui.router', 'ui.select', 'ngSanitize'],
        m,
        mn;
    for (var index in modules) {
        m = modules[index];
        mn = 'mean.' + m.name;
        angular.module(mn, m.angularDependencies || []);
        packageModules.push(mn);
    }

    var req = require.context("./packages", true, /\/public\/(?!tests|assets|views)(.*)\.js$/);
    req.keys().map(req);
    var req = require.context("./node_modules", true, /\/meanio-(admin|system|users|circles)\/public\/(?!tests|assets|views)(.*)\.js$/);
    req.keys().map(req);

    angular.module('mean', packageModules);
}

_jquery2.default.ajax('/_getModules', {
    dataType: 'json',
    async: false,
    success: processModules
});

//# sourceMappingURL=app-compiled.js.map