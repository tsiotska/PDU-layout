module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "JkW7");
/******/ })
/************************************************************************/
/******/ ({

/***/ "/QC5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribers", function() { return subscribers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentUrl", function() { return getCurrentUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "route", function() { return route; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return Router; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Route", function() { return Route; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Link", function() { return Link; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exec", function() { return exec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("WMsV");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);


var EMPTY$1 = {};

function assign(obj, props) {
	// eslint-disable-next-line guard-for-in
	for (var i in props) {
		obj[i] = props[i];
	}
	return obj;
}

function exec(url, route, opts) {
	var reg = /(?:\?([^#]*))?(#.*)?$/,
	    c = url.match(reg),
	    matches = {},
	    ret;
	if (c && c[1]) {
		var p = c[1].split('&');
		for (var i = 0; i < p.length; i++) {
			var r = p[i].split('=');
			matches[decodeURIComponent(r[0])] = decodeURIComponent(r.slice(1).join('='));
		}
	}
	url = segmentize(url.replace(reg, ''));
	route = segmentize(route || '');
	var max = Math.max(url.length, route.length);
	for (var i$1 = 0; i$1 < max; i$1++) {
		if (route[i$1] && route[i$1].charAt(0) === ':') {
			var param = route[i$1].replace(/(^:|[+*?]+$)/g, ''),
			    flags = (route[i$1].match(/[+*?]+$/) || EMPTY$1)[0] || '',
			    plus = ~flags.indexOf('+'),
			    star = ~flags.indexOf('*'),
			    val = url[i$1] || '';
			if (!val && !star && (flags.indexOf('?') < 0 || plus)) {
				ret = false;
				break;
			}
			matches[param] = decodeURIComponent(val);
			if (plus || star) {
				matches[param] = url.slice(i$1).map(decodeURIComponent).join('/');
				break;
			}
		} else if (route[i$1] !== url[i$1]) {
			ret = false;
			break;
		}
	}
	if (opts.default !== true && ret === false) {
		return false;
	}
	return matches;
}

function pathRankSort(a, b) {
	return a.rank < b.rank ? 1 : a.rank > b.rank ? -1 : a.index - b.index;
}

// filter out VNodes without attributes (which are unrankeable), and add `index`/`rank` properties to be used in sorting.
function prepareVNodeForRanking(vnode, index) {
	vnode.index = index;
	vnode.rank = rankChild(vnode);
	return vnode.props;
}

function segmentize(url) {
	return url.replace(/(^\/+|\/+$)/g, '').split('/');
}

function rankSegment(segment) {
	return segment.charAt(0) == ':' ? 1 + '*+?'.indexOf(segment.charAt(segment.length - 1)) || 4 : 5;
}

function rank(path) {
	return segmentize(path).map(rankSegment).join('');
}

function rankChild(vnode) {
	return vnode.props.default ? 0 : rank(vnode.props.path);
}

var customHistory = null;

var ROUTERS = [];

var subscribers = [];

var EMPTY = {};

function setUrl(url, type) {
	if (type === void 0) type = 'push';

	if (customHistory && customHistory[type]) {
		customHistory[type](url);
	} else if (typeof history !== 'undefined' && history[type + 'State']) {
		history[type + 'State'](null, null, url);
	}
}

function getCurrentUrl() {
	var url;
	if (customHistory && customHistory.location) {
		url = customHistory.location;
	} else if (customHistory && customHistory.getCurrentLocation) {
		url = customHistory.getCurrentLocation();
	} else {
		url = typeof location !== 'undefined' ? location : EMPTY;
	}
	return "" + (url.pathname || '') + (url.search || '');
}

function route(url, replace) {
	if (replace === void 0) replace = false;

	if (typeof url !== 'string' && url.url) {
		replace = url.replace;
		url = url.url;
	}

	// only push URL into history if we can handle it
	if (canRoute(url)) {
		setUrl(url, replace ? 'replace' : 'push');
	}

	return routeTo(url);
}

/** Check if the given URL can be handled by any router instances. */
function canRoute(url) {
	for (var i = ROUTERS.length; i--;) {
		if (ROUTERS[i].canRoute(url)) {
			return true;
		}
	}
	return false;
}

/** Tell all router instances to handle the given URL.  */
function routeTo(url) {
	var didRoute = false;
	for (var i = 0; i < ROUTERS.length; i++) {
		if (ROUTERS[i].routeTo(url) === true) {
			didRoute = true;
		}
	}
	for (var i$1 = subscribers.length; i$1--;) {
		subscribers[i$1](url);
	}
	return didRoute;
}

function routeFromLink(node) {
	// only valid elements
	if (!node || !node.getAttribute) {
		return;
	}

	var href = node.getAttribute('href'),
	    target = node.getAttribute('target');

	// ignore links with targets and non-path URLs
	if (!href || !href.match(/^\//g) || target && !target.match(/^_?self$/i)) {
		return;
	}

	// attempt to route, if no match simply cede control to browser
	return route(href);
}

function handleLinkClick(e) {
	if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button !== 0) {
		return;
	}
	routeFromLink(e.currentTarget || e.target || this);
	return prevent(e);
}

function prevent(e) {
	if (e) {
		if (e.stopImmediatePropagation) {
			e.stopImmediatePropagation();
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		e.preventDefault();
	}
	return false;
}

function delegateLinkHandler(e) {
	// ignore events the browser takes care of already:
	if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button !== 0) {
		return;
	}

	var t = e.target;
	do {
		if (String(t.nodeName).toUpperCase() === 'A' && t.getAttribute('href')) {
			if (t.hasAttribute('native')) {
				return;
			}
			// if link is handled by the router, prevent browser defaults
			if (routeFromLink(t)) {
				return prevent(e);
			}
		}
	} while (t = t.parentNode);
}

var eventListenersInitialized = false;

function initEventListeners() {
	if (eventListenersInitialized) {
		return;
	}

	if (typeof addEventListener === 'function') {
		if (!customHistory) {
			addEventListener('popstate', function () {
				routeTo(getCurrentUrl());
			});
		}
		addEventListener('click', delegateLinkHandler);
	}
	eventListenersInitialized = true;
}

var Router = function (Component$$1) {
	function Router(props) {
		Component$$1.call(this, props);
		if (props.history) {
			customHistory = props.history;
		}

		this.state = {
			url: props.url || getCurrentUrl()
		};

		initEventListeners();
	}

	if (Component$$1) Router.__proto__ = Component$$1;
	Router.prototype = Object.create(Component$$1 && Component$$1.prototype);
	Router.prototype.constructor = Router;

	Router.prototype.shouldComponentUpdate = function shouldComponentUpdate(props) {
		if (props.static !== true) {
			return true;
		}
		return props.url !== this.props.url || props.onChange !== this.props.onChange;
	};

	/** Check if the given URL can be matched against any children */
	Router.prototype.canRoute = function canRoute(url) {
		var children = Object(__WEBPACK_IMPORTED_MODULE_0_preact__["toChildArray"])(this.props.children);
		return this.getMatchingChildren(children, url, false).length > 0;
	};

	/** Re-render children with a new URL to match against. */
	Router.prototype.routeTo = function routeTo(url) {
		this.setState({ url: url });

		var didRoute = this.canRoute(url);

		// trigger a manual re-route if we're not in the middle of an update:
		if (!this.updating) {
			this.forceUpdate();
		}

		return didRoute;
	};

	Router.prototype.componentWillMount = function componentWillMount() {
		ROUTERS.push(this);
		this.updating = true;
	};

	Router.prototype.componentDidMount = function componentDidMount() {
		var this$1 = this;

		if (customHistory) {
			this.unlisten = customHistory.listen(function (location) {
				this$1.routeTo("" + (location.pathname || '') + (location.search || ''));
			});
		}
		this.updating = false;
	};

	Router.prototype.componentWillUnmount = function componentWillUnmount() {
		if (typeof this.unlisten === 'function') {
			this.unlisten();
		}
		ROUTERS.splice(ROUTERS.indexOf(this), 1);
	};

	Router.prototype.componentWillUpdate = function componentWillUpdate() {
		this.updating = true;
	};

	Router.prototype.componentDidUpdate = function componentDidUpdate() {
		this.updating = false;
	};

	Router.prototype.getMatchingChildren = function getMatchingChildren(children, url, invoke) {
		return children.filter(prepareVNodeForRanking).sort(pathRankSort).map(function (vnode) {
			var matches = exec(url, vnode.props.path, vnode.props);
			if (matches) {
				if (invoke !== false) {
					var newProps = { url: url, matches: matches };
					assign(newProps, matches);
					delete newProps.ref;
					delete newProps.key;
					return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["cloneElement"])(vnode, newProps);
				}
				return vnode;
			}
		}).filter(Boolean);
	};

	Router.prototype.render = function render(ref, ref$1) {
		var children = ref.children;
		var onChange = ref.onChange;
		var url = ref$1.url;

		var active = this.getMatchingChildren(Object(__WEBPACK_IMPORTED_MODULE_0_preact__["toChildArray"])(children), url, true);

		var current = active[0] || null;

		var previous = this.previousUrl;
		if (url !== previous) {
			this.previousUrl = url;
			if (typeof onChange === 'function') {
				onChange({
					router: this,
					url: url,
					previous: previous,
					active: active,
					current: current
				});
			}
		}

		return current;
	};

	return Router;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);

var Link = function Link(props) {
	return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["createElement"])('a', assign({ onClick: handleLinkClick }, props));
};

var Route = function Route(props) {
	return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["createElement"])(props.component, props);
};

Router.subscribers = subscribers;
Router.getCurrentUrl = getCurrentUrl;
Router.route = route;
Router.Router = Router;
Router.Route = Route;
Router.Link = Link;
Router.exec = exec;

/* harmony default export */ __webpack_exports__["default"] = (Router);
//# sourceMappingURL=preact-router.es.js.map

/***/ }),

/***/ "F1Bf":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "JZ8d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
	var result;
	var Symbol = root.Symbol;

	if (typeof Symbol === 'function') {
		if (Symbol.observable) {
			result = Symbol.observable;
		} else {
			result = Symbol('observable');
			Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};

/***/ }),

/***/ "JkW7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ../node_modules/preact-cli/node_modules/preact/dist/preact.min.js
var preact_min = __webpack_require__("WMsV");
var preact_min_default = /*#__PURE__*/__webpack_require__.n(preact_min);

// CONCATENATED MODULE: ../node_modules/tslib/tslib.es6.js
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return _extendStatics(d, b);
};

function __extends(d, b) {
    _extendStatics(d, b);
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var _assign = function __assign() {
    _assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return _assign.apply(this, arguments);
};


function __rest(s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) {
        decorator(target, key, paramIndex);
    };
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function sent() {
            if (t[0] & 1) throw t[1];return t[1];
        }, trys: [], ops: [] },
        f,
        y,
        t,
        g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
    }), g;
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) {
            try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0:case 1:
                        t = op;break;
                    case 4:
                        _.label++;return { value: op[1], done: false };
                    case 5:
                        _.label++;y = op[1];op = [0];continue;
                    case 7:
                        op = _.ops.pop();_.trys.pop();continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;continue;
                        }
                        if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                            _.label = op[1];break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];t = op;break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];_.ops.push(op);break;
                        }
                        if (t[2]) _.ops.pop();
                        _.trys.pop();continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [6, e];y = 0;
            } finally {
                f = t = 0;
            }
        }if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator,
        m = s && o[s],
        i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function next() {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o),
        r,
        ar = [],
        e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
            ar.push(r.value);
        }
    } catch (error) {
        e = { error: error };
    } finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
            if (e) throw e.error;
        }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++) {
        ar = ar.concat(__read(arguments[i]));
    }return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
        s += arguments[i].length;
    }for (var r = Array(s), k = 0, i = 0; i < il; i++) {
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
            r[k] = a[j];
        }
    }return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []),
        i,
        q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
        return this;
    }, i;
    function verb(n) {
        if (g[n]) i[n] = function (v) {
            return new Promise(function (a, b) {
                q.push([n, v, a, b]) > 1 || resume(n, v);
            });
        };
    }
    function resume(n, v) {
        try {
            step(g[n](v));
        } catch (e) {
            settle(q[0][3], e);
        }
    }
    function step(r) {
        r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }
    function fulfill(value) {
        resume("next", value);
    }
    function reject(value) {
        resume("throw", value);
    }
    function settle(f, v) {
        if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
    }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) {
        throw e;
    }), verb("return"), i[Symbol.iterator] = function () {
        return this;
    }, i;
    function verb(n, f) {
        i[n] = o[n] ? function (v) {
            return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v;
        } : f;
    }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator],
        i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
        return this;
    }, i);
    function verb(n) {
        i[n] = o[n] && function (v) {
            return new Promise(function (resolve, reject) {
                v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
        };
    }
    function settle(resolve, reject, d, v) {
        Promise.resolve(v).then(function (v) {
            resolve({ value: v, done: d });
        }, reject);
    }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) {
        if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    }result.default = mod;
    return result;
}

function __importDefault(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}
// CONCATENATED MODULE: ../node_modules/preact-cli/node_modules/preact-context/dist/esm/context-value-emitter.js
function createEmitter(initialValue, bitmaskFactory) {
    var registeredUpdaters = [];
    var value = initialValue;
    var diff = function diff(newValue) {
        return bitmaskFactory(value, newValue) | 0;
    };
    return {
        register: function register(updater) {
            registeredUpdaters.push(updater);
            updater(value, diff(value));
        },
        unregister: function unregister(updater) {
            registeredUpdaters = registeredUpdaters.filter(function (i) {
                return i !== updater;
            });
        },
        val: function val(newValue) {
            if (newValue === undefined || newValue == value) {
                return value;
            }
            var bitmask = diff(newValue);
            value = newValue;
            registeredUpdaters.forEach(function (up) {
                return up(newValue, bitmask);
            });
            return value;
        }
    };
}
var noopEmitter = {
    register: function register(_) {
        console.warn("Consumer used without a Provider");
    },
    unregister: function unregister(_) {
        // do nothing
    },
    val: function val(_) {
        //do nothing;
    }
};
// CONCATENATED MODULE: ../node_modules/preact-cli/node_modules/preact-context/dist/esm/utils.js
/*
 * Extracts the children from the props and returns an object containing the
 * only element of the given array (preact always passes children as an array)
 * or null otherwise. The result contains always a reference to the original
 * array of children
 *
 * @param {RenderableProps<*>} props - the component's properties
 * @return {{ child: JSX.Element | null, children: JSX.Element[]}}
 */
function getOnlyChildAndChildren(props) {
  var children = props.children;
  var child = children.length === 1 ? children[0] : null;
  return { child: child, children: children };
}
// CONCATENATED MODULE: ../node_modules/preact-cli/node_modules/preact-context/dist/esm/context.js




function getRenderer(props) {
    var child = getOnlyChildAndChildren(props).child;
    // TODO: "render" in props check is only done to make TS happy
    return child || "render" in props && props.render;
}
var MAX_SIGNED_31_BIT_INT = 1073741823;
var defaultBitmaskFactory = function defaultBitmaskFactory() {
    return MAX_SIGNED_31_BIT_INT;
};
var ids = 0;
function _createContext(value, bitmaskFactory) {
    var key = "_preactContextProvider-" + ids++;
    var Provider = /** @class */function (_super) {
        __extends(Provider, _super);
        function Provider(props) {
            var _this = _super.call(this, props) || this;
            _this._emitter = createEmitter(props.value, bitmaskFactory || defaultBitmaskFactory);
            return _this;
        }
        Provider.prototype.getChildContext = function () {
            var _a;
            return _a = {}, _a[key] = this._emitter, _a;
        };
        Provider.prototype.componentDidUpdate = function () {
            this._emitter.val(this.props.value);
        };
        Provider.prototype.render = function () {
            var _a = getOnlyChildAndChildren(this.props),
                child = _a.child,
                children = _a.children;
            if (child) {
                return child;
            }
            // preact does not support fragments,
            // therefore we wrap the children in a span
            return Object(preact_min["h"])("span", null, children);
        };
        return Provider;
    }(preact_min["Component"]);
    var Consumer = /** @class */function (_super) {
        __extends(Consumer, _super);
        function Consumer(props, ctx) {
            var _this = _super.call(this, props, ctx) || this;
            _this._updateContext = function (value, bitmask) {
                var unstable_observedBits = _this.props.unstable_observedBits;
                var observed = unstable_observedBits === undefined || unstable_observedBits === null ? MAX_SIGNED_31_BIT_INT : unstable_observedBits;
                observed = observed | 0;
                if ((observed & bitmask) === 0) {
                    return;
                }
                _this.setState({ value: value });
            };
            _this.state = { value: _this._getEmitter().val() || value };
            return _this;
        }
        Consumer.prototype.componentDidMount = function () {
            this._getEmitter().register(this._updateContext);
        };
        Consumer.prototype.shouldComponentUpdate = function (nextProps, nextState) {
            return this.state.value !== nextState.value || getRenderer(this.props) !== getRenderer(nextProps);
        };
        Consumer.prototype.componentWillUnmount = function () {
            this._getEmitter().unregister(this._updateContext);
        };
        Consumer.prototype.componentDidUpdate = function (_, __, prevCtx) {
            var previousProvider = prevCtx[key];
            if (previousProvider === this.context[key]) {
                return;
            }
            (previousProvider || noopEmitter).unregister(this._updateContext);
            this.componentDidMount();
        };
        Consumer.prototype.render = function () {
            // TODO: "render" in props check is only done to make TS happy
            var render = "render" in this.props && this.props.render;
            var r = getRenderer(this.props);
            if (render && render !== r) {
                console.warn("Both children and a render function are defined. Children will be used");
            }
            if (typeof r === "function") {
                return r(this.state.value);
            }
            console.warn("Consumer is expecting a function as one and only child but didn't find any");
        };
        Consumer.prototype._getEmitter = function () {
            return this.context[key] || noopEmitter;
        };
        return Consumer;
    }(preact_min["Component"]);
    return {
        Provider: Provider,
        Consumer: Consumer
    };
}
// named and default export in order to have less problems with bundlers
/* harmony default export */ var esm_context = (_createContext);
var createContext = _createContext;
// EXTERNAL MODULE: ../node_modules/symbol-observable/es/index.js
var es = __webpack_require__("LkZ7");

// CONCATENATED MODULE: ../node_modules/redux/es/redux.js


/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var randomString = function randomString() {
  return Math.random().toString(36).substring(7).split('').join('.');
};

var ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  var proto = obj;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}

/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */

function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {
    throw new Error('It looks like you are passing several store enhancers to ' + 'createStore(). This is not supported. Instead, compose them ' + 'together to a single function.');
  }

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;
  /**
   * This makes a shallow copy of currentListeners so we can use
   * nextListeners as a temporary list while dispatching.
   *
   * This prevents any bugs around consumers calling
   * subscribe/unsubscribe in the middle of a dispatch.
   */

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */

  function getState() {
    if (isDispatching) {
      throw new Error('You may not call store.getState() while the reducer is executing. ' + 'The reducer has already received the state as an argument. ' + 'Pass it down from the top reducer instead of reading it from the store.');
    }

    return currentState;
  }
  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */

  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function.');
    }

    if (isDispatching) {
      throw new Error('You may not call store.subscribe() while the reducer is executing. ' + 'If you would like to be notified after the store has been updated, subscribe from a ' + 'component and invoke store.getState() in the callback to access the latest state. ' + 'See https://redux.js.org/api-reference/store#subscribelistener for more details.');
    }

    var isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      if (isDispatching) {
        throw new Error('You may not unsubscribe from a store listener while the reducer is executing. ' + 'See https://redux.js.org/api-reference/store#subscribelistener for more details.');
      }

      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
      currentListeners = null;
    };
  }
  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */

  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;

    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }
  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */

  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer; // This action has a similiar effect to ActionTypes.INIT.
    // Any reducers that existed in both the new and old rootReducer
    // will receive the previous state. This effectively populates
    // the new state tree with any relevant data from the old one.

    dispatch({
      type: ActionTypes.REPLACE
    });
  }
  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */

  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe: unsubscribe
        };
      }
    }, _ref[es["a" /* default */]] = function () {
      return this;
    }, _ref;
  } // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.


  dispatch({
    type: ActionTypes.INIT
  });
  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[es["a" /* default */]] = observable, _ref2;
}

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */

  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
  } catch (e) {} // eslint-disable-line no-empty
}

function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionDescription = actionType && "action \"" + String(actionType) + "\"" || 'an action';
  return "Given " + actionDescription + ", reducer \"" + key + "\" returned undefined. " + "To ignore an action, you must explicitly return the previous state. " + "If you want this reducer to hold no value, you can return null instead of undefined.";
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!isPlainObject(inputState)) {
    return "The " + argumentName + " has unexpected type of \"" + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + "\". Expected argument to be an object with the following " + ("keys: \"" + reducerKeys.join('", "') + "\"");
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });
  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });
  if (action && action.type === ActionTypes.REPLACE) return;

  if (unexpectedKeys.length > 0) {
    return "Unexpected " + (unexpectedKeys.length > 1 ? 'keys' : 'key') + " " + ("\"" + unexpectedKeys.join('", "') + "\" found in " + argumentName + ". ") + "Expected to find one of the known reducer keys instead: " + ("\"" + reducerKeys.join('", "') + "\". Unexpected keys will be ignored.");
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, {
      type: ActionTypes.INIT
    });

    if (typeof initialState === 'undefined') {
      throw new Error("Reducer \"" + key + "\" returned undefined during initialization. " + "If the state passed to the reducer is undefined, you must " + "explicitly return the initial state. The initial state may " + "not be undefined. If you don't want to set a value for this reducer, " + "you can use null instead of undefined.");
    }

    if (typeof reducer(undefined, {
      type: ActionTypes.PROBE_UNKNOWN_ACTION()
    }) === 'undefined') {
      throw new Error("Reducer \"" + key + "\" returned undefined when probed with a random type. " + ("Don't try to handle " + ActionTypes.INIT + " or other actions in \"redux/*\" ") + "namespace. They are considered private. Instead, you must return the " + "current state for any unknown actions, unless it is undefined, " + "in which case you must return the initial state, regardless of the " + "action type. The initial state may not be undefined, but can be null.");
    }
  });
}
/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */

function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};

  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (false) {
      if (typeof reducers[key] === 'undefined') {
        warning("No reducer provided for key \"" + key + "\"");
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }

  var finalReducerKeys = Object.keys(finalReducers); // This is used to make sure we don't warn about the same
  // keys multiple times.

  var unexpectedKeyCache;

  if (false) {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError;

  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination(state, action) {
    if (state === void 0) {
      state = {};
    }

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (false) {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);

      if (warningMessage) {
        warning(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};

    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);

      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }

      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }

    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  };
}

function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(this, arguments));
  };
}
/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass an action creator as the first argument,
 * and get a dispatch wrapped function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */

function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error("bindActionCreators expected an object or a function, instead received " + (actionCreators === null ? 'null' : typeof actionCreators) + ". " + "Did you write \"import ActionCreators from\" instead of \"import * as ActionCreators from\"?");
  }

  var boundActionCreators = {};

  for (var key in actionCreators) {
    var actionCreator = actionCreators[key];

    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }

  return boundActionCreators;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    keys.push.apply(keys, Object.getOwnPropertySymbols(object));
  }

  if (enumerableOnly) keys = keys.filter(function (sym) {
    return Object.getOwnPropertyDescriptor(object, sym).enumerable;
  });
  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */
function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
}

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */

function applyMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function () {
      var store = createStore.apply(void 0, arguments);

      var _dispatch = function dispatch() {
        throw new Error('Dispatching while constructing your middleware is not allowed. ' + 'Other middleware would not be applied to this dispatch.');
      };

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch() {
          return _dispatch.apply(void 0, arguments);
        }
      };
      var chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = compose.apply(void 0, chain)(store.dispatch);
      return _objectSpread2({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

/*
 * This is a dummy function to check if the function name has been altered by minification.
 * If the function has been minified and NODE_ENV !== 'production', warn the user.
 */

function isCrushed() {}

if (false) {
  warning('You are currently using minified code outside of NODE_ENV === "production". ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) ' + 'to ensure you have the correct code for your production build.');
}


// CONCATENATED MODULE: ../node_modules/preact-redux/dist/preact-redux.esm.js




function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function invariant() {}

var React = {
  createContext: createContext,
  forwardRef: invariant,
  createElement: preact_min["h"]
};

var ReactReduxContext = React.createContext(null);

var preact_redux_esm_Provider = function (_Component) {
  _inheritsLoose(Provider, _Component);
  function Provider(props) {
    var _this;
    _this = _Component.call(this, props) || this;
    var store = props.store;
    _this.state = {
      storeState: store.getState(),
      store: store
    };
    return _this;
  }
  var _proto = Provider.prototype;
  _proto.componentDidMount = function componentDidMount() {
    this._isMounted = true;
    this.subscribe();
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
    this._isMounted = false;
  };
  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (this.props.store !== prevProps.store) {
      if (this.unsubscribe) this.unsubscribe();
      this.subscribe();
    }
  };
  _proto.subscribe = function subscribe() {
    var _this2 = this;
    var store = this.props.store;
    this.unsubscribe = store.subscribe(function () {
      var newStoreState = store.getState();
      if (!_this2._isMounted) {
        return;
      }
      _this2.setState(function (providerState) {
        if (providerState.storeState === newStoreState) {
          return null;
        }
        return {
          storeState: newStoreState
        };
      });
    });
    var postMountStoreState = store.getState();
    if (postMountStoreState !== this.state.storeState) {
      this.setState({
        storeState: postMountStoreState
      });
    }
  };
  _proto.render = function render() {
    var Context = this.props.context || ReactReduxContext;
    return React.createElement(Context.Provider, {
      value: this.state
    }, this.props.children);
  };
  return Provider;
}(preact_min["Component"]);

function unwrapExports(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
  return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var reactIs_production_min = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: !0
  });
  var c = 60103,
      d = 60106,
      e = 60107,
      f = 60108,
      g = 60114,
      h = 60109,
      k = 60110,
      l = 60111,
      m = 60111,
      n = 60112,
      p = 60113,
      q = 60115,
      r = 60116;
  function t(a) {
    if ("object" === typeof a && null !== a) {
      var u = a.$$typeof;
      switch (u) {
        case c:
          switch (a = a.type, a) {
            case l:
            case m:
            case e:
            case g:
            case f:
            case p:
              return a;
            default:
              switch (a = a && a.$$typeof, a) {
                case k:
                case n:
                case h:
                  return a;
                default:
                  return u;
              }
          }
        case r:
        case q:
        case d:
          return u;
      }
    }
  }
  function v(a) {
    return t(a) === m;
  }
  exports.typeOf = t;
  exports.AsyncMode = l;
  exports.ConcurrentMode = m;
  exports.ContextConsumer = k;
  exports.ContextProvider = h;
  exports.Element = c;
  exports.ForwardRef = n;
  exports.Fragment = e;
  exports.Lazy = r;
  exports.Memo = q;
  exports.Portal = d;
  exports.Profiler = g;
  exports.StrictMode = f;
  exports.Suspense = p;
  exports.isValidElementType = function (a) {
    return "string" === typeof a || "function" === typeof a || a === e || a === m || a === g || a === f || a === p || "object" === typeof a && null !== a && (a.$$typeof === r || a.$$typeof === q || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n);
  };
  exports.isAsyncMode = function (a) {
    return v(a) || t(a) === l;
  };
  exports.isConcurrentMode = v;
  exports.isContextConsumer = function (a) {
    return t(a) === k;
  };
  exports.isContextProvider = function (a) {
    return t(a) === h;
  };
  exports.isElement = function (a) {
    return "object" === typeof a && null !== a && a.$$typeof === c;
  };
  exports.isForwardRef = function (a) {
    return t(a) === n;
  };
  exports.isFragment = function (a) {
    return t(a) === e;
  };
  exports.isLazy = function (a) {
    return t(a) === r;
  };
  exports.isMemo = function (a) {
    return t(a) === q;
  };
  exports.isPortal = function (a) {
    return t(a) === d;
  };
  exports.isProfiler = function (a) {
    return t(a) === g;
  };
  exports.isStrictMode = function (a) {
    return t(a) === f;
  };
  exports.isSuspense = function (a) {
    return t(a) === p;
  };
});
unwrapExports(reactIs_production_min);
var reactIs_production_min_1 = reactIs_production_min.typeOf;
var reactIs_production_min_2 = reactIs_production_min.AsyncMode;
var reactIs_production_min_3 = reactIs_production_min.ConcurrentMode;
var reactIs_production_min_4 = reactIs_production_min.ContextConsumer;
var reactIs_production_min_5 = reactIs_production_min.ContextProvider;
var reactIs_production_min_6 = reactIs_production_min.Element;
var reactIs_production_min_7 = reactIs_production_min.ForwardRef;
var reactIs_production_min_8 = reactIs_production_min.Fragment;
var reactIs_production_min_9 = reactIs_production_min.Lazy;
var reactIs_production_min_10 = reactIs_production_min.Memo;
var reactIs_production_min_11 = reactIs_production_min.Portal;
var reactIs_production_min_12 = reactIs_production_min.Profiler;
var reactIs_production_min_13 = reactIs_production_min.StrictMode;
var reactIs_production_min_14 = reactIs_production_min.Suspense;
var reactIs_production_min_15 = reactIs_production_min.isValidElementType;
var reactIs_production_min_16 = reactIs_production_min.isAsyncMode;
var reactIs_production_min_17 = reactIs_production_min.isConcurrentMode;
var reactIs_production_min_18 = reactIs_production_min.isContextConsumer;
var reactIs_production_min_19 = reactIs_production_min.isContextProvider;
var reactIs_production_min_20 = reactIs_production_min.isElement;
var reactIs_production_min_21 = reactIs_production_min.isForwardRef;
var reactIs_production_min_22 = reactIs_production_min.isFragment;
var reactIs_production_min_23 = reactIs_production_min.isLazy;
var reactIs_production_min_24 = reactIs_production_min.isMemo;
var reactIs_production_min_25 = reactIs_production_min.isPortal;
var reactIs_production_min_26 = reactIs_production_min.isProfiler;
var reactIs_production_min_27 = reactIs_production_min.isStrictMode;
var reactIs_production_min_28 = reactIs_production_min.isSuspense;

var reactIs = createCommonjsModule(function (module) {
  {
    module.exports = reactIs_production_min;
  }
});
var reactIs_1 = reactIs.isValidElementType;
var reactIs_2 = reactIs.isContextConsumer;

var REACT_STATICS = {
  childContextTypes: true,
  contextType: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromError: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var FORWARD_REF_STATICS = {
  '$$typeof': true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  '$$typeof': true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
function getStatics(component) {
  if (reactIs.isMemo(component)) {
    return MEMO_STATICS;
  }
  return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
}
var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;
function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== 'string') {
    if (objectPrototype) {
      var inheritedComponent = getPrototypeOf(sourceComponent);
      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }
    }
    var keys = getOwnPropertyNames(sourceComponent);
    if (getOwnPropertySymbols) {
      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
    }
    var targetStatics = getStatics(targetComponent);
    var sourceStatics = getStatics(sourceComponent);
    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i];
      if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
        try {
          defineProperty(targetComponent, key, descriptor);
        } catch (e) {}
      }
    }
    return targetComponent;
  }
  return targetComponent;
}
var hoistNonReactStatics_cjs = hoistNonReactStatics;

function connectAdvanced(selectorFactory, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$getDisplayName = _ref.getDisplayName,
      getDisplayName = _ref$getDisplayName === void 0 ? function (name) {
    return "ConnectAdvanced(" + name + ")";
  } : _ref$getDisplayName,
      _ref$methodName = _ref.methodName,
      methodName = _ref$methodName === void 0 ? 'connectAdvanced' : _ref$methodName,
      _ref$renderCountProp = _ref.renderCountProp,
      renderCountProp = _ref$renderCountProp === void 0 ? undefined : _ref$renderCountProp,
      _ref$shouldHandleStat = _ref.shouldHandleStateChanges,
      shouldHandleStateChanges = _ref$shouldHandleStat === void 0 ? true : _ref$shouldHandleStat,
      _ref$storeKey = _ref.storeKey,
      storeKey = _ref$storeKey === void 0 ? 'store' : _ref$storeKey,
      _ref$withRef = _ref.withRef,
      _ref$forwardRef = _ref.forwardRef,
      forwardRef = _ref$forwardRef === void 0 ? false : _ref$forwardRef,
      _ref$context = _ref.context,
      context = _ref$context === void 0 ? ReactReduxContext : _ref$context,
      connectOptions = _objectWithoutPropertiesLoose(_ref, ["getDisplayName", "methodName", "renderCountProp", "shouldHandleStateChanges", "storeKey", "withRef", "forwardRef", "context"]);
  var customStoreWarningMessage = 'To use a custom Redux store for specific components,  create a custom React context with ' + "React.createContext(), and pass the context object to React Redux's Provider and specific components" + ' like:  <Provider context={MyContext}><ConnectedComponent context={MyContext} /></Provider>. ' + 'You may also pass a {context : MyContext} option to connect';
  var Context = context;
  return function wrapWithConnect(WrappedComponent) {
    var wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    var displayName = getDisplayName(wrappedComponentName);
    var selectorFactoryOptions = _extends({}, connectOptions, {
      getDisplayName: getDisplayName,
      methodName: methodName,
      renderCountProp: renderCountProp,
      shouldHandleStateChanges: shouldHandleStateChanges,
      storeKey: storeKey,
      displayName: displayName,
      wrappedComponentName: wrappedComponentName,
      WrappedComponent: WrappedComponent
    });
    var pure = connectOptions.pure;
    var OuterBaseComponent = preact_min["Component"];
    if (pure) {
      OuterBaseComponent = preact_min["Component"];
    }
    function makeDerivedPropsSelector() {
      var lastProps;
      var lastState;
      var lastDerivedProps;
      var lastStore;
      var lastSelectorFactoryOptions;
      var sourceSelector;
      return function selectDerivedProps(state, props, store, selectorFactoryOptions) {
        if (pure && lastProps === props && lastState === state) {
          return lastDerivedProps;
        }
        if (store !== lastStore || lastSelectorFactoryOptions !== selectorFactoryOptions) {
          lastStore = store;
          lastSelectorFactoryOptions = selectorFactoryOptions;
          sourceSelector = selectorFactory(store.dispatch, selectorFactoryOptions);
        }
        lastProps = props;
        lastState = state;
        var nextProps = sourceSelector(state, props);
        lastDerivedProps = nextProps;
        return lastDerivedProps;
      };
    }
    function makeChildElementSelector() {
      var lastChildProps, lastForwardRef, lastChildElement, lastComponent;
      return function selectChildElement(WrappedComponent, childProps, forwardRef) {
        if (childProps !== lastChildProps || forwardRef !== lastForwardRef || lastComponent !== WrappedComponent) {
          lastChildProps = childProps;
          lastForwardRef = forwardRef;
          lastComponent = WrappedComponent;
          lastChildElement = React.createElement(WrappedComponent, _extends({}, childProps, {
            ref: forwardRef
          }));
        }
        return lastChildElement;
      };
    }
    var Connect = function (_OuterBaseComponent) {
      _inheritsLoose(Connect, _OuterBaseComponent);
      function Connect(props) {
        var _this;
        _this = _OuterBaseComponent.call(this, props) || this;
        invariant(forwardRef ? !props.wrapperProps[storeKey] : !props[storeKey], 'Passing redux store in props has been removed and does not do anything. ' + customStoreWarningMessage);
        _this.selectDerivedProps = makeDerivedPropsSelector();
        _this.selectChildElement = makeChildElementSelector();
        _this.indirectRenderWrappedComponent = _this.indirectRenderWrappedComponent.bind(_assertThisInitialized(_this));
        return _this;
      }
      var _proto = Connect.prototype;
      _proto.indirectRenderWrappedComponent = function indirectRenderWrappedComponent(value) {
        return this.renderWrappedComponent(value);
      };
      _proto.renderWrappedComponent = function renderWrappedComponent(value) {
        var storeState = value.storeState,
            store = value.store;
        var wrapperProps = this.props;
        var forwardedRef;
        if (forwardRef) {
          wrapperProps = this.props.wrapperProps;
          forwardedRef = this.props.forwardedRef;
        }
        var derivedProps = this.selectDerivedProps(storeState, wrapperProps, store, selectorFactoryOptions);
        return this.selectChildElement(WrappedComponent, derivedProps, forwardedRef);
      };
      _proto.render = function render() {
        var ContextToUse = this.props.context && this.props.context.Consumer && reactIs_2(React.createElement(this.props.context.Consumer, null)) ? this.props.context : Context;
        return React.createElement(ContextToUse.Consumer, null, this.indirectRenderWrappedComponent);
      };
      return Connect;
    }(OuterBaseComponent);
    Connect.WrappedComponent = WrappedComponent;
    Connect.displayName = displayName;
    if (forwardRef) {
      var forwarded = React.forwardRef(function forwardConnectRef(props, ref) {
        return React.createElement(Connect, {
          wrapperProps: props,
          forwardedRef: ref
        });
      });
      forwarded.displayName = displayName;
      forwarded.WrappedComponent = WrappedComponent;
      return hoistNonReactStatics_cjs(forwarded, WrappedComponent);
    }
    return hoistNonReactStatics_cjs(Connect, WrappedComponent);
  };
}

var hasOwn = Object.prototype.hasOwnProperty;
function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}
function shallowEqual(objA, objB) {
  if (is(objA, objB)) return true;
  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }
  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }
  return true;
}

function wrapMapToPropsConstant(getConstant) {
  return function initConstantSelector(dispatch, options) {
    var constant = getConstant(dispatch, options);
    function constantSelector() {
      return constant;
    }
    constantSelector.dependsOnOwnProps = false;
    return constantSelector;
  };
}
function getDependsOnOwnProps(mapToProps) {
  return mapToProps.dependsOnOwnProps !== null && mapToProps.dependsOnOwnProps !== undefined ? Boolean(mapToProps.dependsOnOwnProps) : mapToProps.length !== 1;
}
function wrapMapToPropsFunc(mapToProps, methodName) {
  return function initProxySelector(dispatch, _ref) {
    var displayName = _ref.displayName;
    var proxy = function mapToPropsProxy(stateOrDispatch, ownProps) {
      return proxy.dependsOnOwnProps ? proxy.mapToProps(stateOrDispatch, ownProps) : proxy.mapToProps(stateOrDispatch);
    };
    proxy.dependsOnOwnProps = true;
    proxy.mapToProps = function detectFactoryAndVerify(stateOrDispatch, ownProps) {
      proxy.mapToProps = mapToProps;
      proxy.dependsOnOwnProps = getDependsOnOwnProps(mapToProps);
      var props = proxy(stateOrDispatch, ownProps);
      if (typeof props === 'function') {
        proxy.mapToProps = props;
        proxy.dependsOnOwnProps = getDependsOnOwnProps(props);
        props = proxy(stateOrDispatch, ownProps);
      }
      return props;
    };
    return proxy;
  };
}

function whenMapDispatchToPropsIsFunction(mapDispatchToProps) {
  return typeof mapDispatchToProps === 'function' ? wrapMapToPropsFunc(mapDispatchToProps, 'mapDispatchToProps') : undefined;
}
function whenMapDispatchToPropsIsMissing(mapDispatchToProps) {
  return !mapDispatchToProps ? wrapMapToPropsConstant(function (dispatch) {
    return {
      dispatch: dispatch
    };
  }) : undefined;
}
function whenMapDispatchToPropsIsObject(mapDispatchToProps) {
  return mapDispatchToProps && typeof mapDispatchToProps === 'object' ? wrapMapToPropsConstant(function (dispatch) {
    return bindActionCreators(mapDispatchToProps, dispatch);
  }) : undefined;
}
var defaultMapDispatchToPropsFactories = [whenMapDispatchToPropsIsFunction, whenMapDispatchToPropsIsMissing, whenMapDispatchToPropsIsObject];

function whenMapStateToPropsIsFunction(mapStateToProps) {
  return typeof mapStateToProps === 'function' ? wrapMapToPropsFunc(mapStateToProps, 'mapStateToProps') : undefined;
}
function whenMapStateToPropsIsMissing(mapStateToProps) {
  return !mapStateToProps ? wrapMapToPropsConstant(function () {
    return {};
  }) : undefined;
}
var defaultMapStateToPropsFactories = [whenMapStateToPropsIsFunction, whenMapStateToPropsIsMissing];

function defaultMergeProps(stateProps, dispatchProps, ownProps) {
  return _extends({}, ownProps, stateProps, dispatchProps);
}
function wrapMergePropsFunc(mergeProps) {
  return function initMergePropsProxy(dispatch, _ref) {
    var displayName = _ref.displayName,
        pure = _ref.pure,
        areMergedPropsEqual = _ref.areMergedPropsEqual;
    var hasRunOnce = false;
    var mergedProps;
    return function mergePropsProxy(stateProps, dispatchProps, ownProps) {
      var nextMergedProps = mergeProps(stateProps, dispatchProps, ownProps);
      if (hasRunOnce) {
        if (!pure || !areMergedPropsEqual(nextMergedProps, mergedProps)) mergedProps = nextMergedProps;
      } else {
        hasRunOnce = true;
        mergedProps = nextMergedProps;
      }
      return mergedProps;
    };
  };
}
function whenMergePropsIsFunction(mergeProps) {
  return typeof mergeProps === 'function' ? wrapMergePropsFunc(mergeProps) : undefined;
}
function whenMergePropsIsOmitted(mergeProps) {
  return !mergeProps ? function () {
    return defaultMergeProps;
  } : undefined;
}
var defaultMergePropsFactories = [whenMergePropsIsFunction, whenMergePropsIsOmitted];

function impureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch) {
  return function impureFinalPropsSelector(state, ownProps) {
    return mergeProps(mapStateToProps(state, ownProps), mapDispatchToProps(dispatch, ownProps), ownProps);
  };
}
function pureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, _ref) {
  var areStatesEqual = _ref.areStatesEqual,
      areOwnPropsEqual = _ref.areOwnPropsEqual,
      areStatePropsEqual = _ref.areStatePropsEqual;
  var hasRunAtLeastOnce = false;
  var state;
  var ownProps;
  var stateProps;
  var dispatchProps;
  var mergedProps;
  function handleFirstCall(firstState, firstOwnProps) {
    state = firstState;
    ownProps = firstOwnProps;
    stateProps = mapStateToProps(state, ownProps);
    dispatchProps = mapDispatchToProps(dispatch, ownProps);
    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    hasRunAtLeastOnce = true;
    return mergedProps;
  }
  function handleNewPropsAndNewState() {
    stateProps = mapStateToProps(state, ownProps);
    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);
    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }
  function handleNewProps() {
    if (mapStateToProps.dependsOnOwnProps) stateProps = mapStateToProps(state, ownProps);
    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);
    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }
  function handleNewState() {
    var nextStateProps = mapStateToProps(state, ownProps);
    var statePropsChanged = !areStatePropsEqual(nextStateProps, stateProps);
    stateProps = nextStateProps;
    if (statePropsChanged) mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }
  function handleSubsequentCalls(nextState, nextOwnProps) {
    var propsChanged = !areOwnPropsEqual(nextOwnProps, ownProps);
    var stateChanged = !areStatesEqual(nextState, state);
    state = nextState;
    ownProps = nextOwnProps;
    if (propsChanged && stateChanged) return handleNewPropsAndNewState();
    if (propsChanged) return handleNewProps();
    if (stateChanged) return handleNewState();
    return mergedProps;
  }
  return function pureFinalPropsSelector(nextState, nextOwnProps) {
    return hasRunAtLeastOnce ? handleSubsequentCalls(nextState, nextOwnProps) : handleFirstCall(nextState, nextOwnProps);
  };
}
function finalPropsSelectorFactory(dispatch, _ref2) {
  var initMapStateToProps = _ref2.initMapStateToProps,
      initMapDispatchToProps = _ref2.initMapDispatchToProps,
      initMergeProps = _ref2.initMergeProps,
      options = _objectWithoutPropertiesLoose(_ref2, ["initMapStateToProps", "initMapDispatchToProps", "initMergeProps"]);
  var mapStateToProps = initMapStateToProps(dispatch, options);
  var mapDispatchToProps = initMapDispatchToProps(dispatch, options);
  var mergeProps = initMergeProps(dispatch, options);
  var selectorFactory = options.pure ? pureFinalPropsSelectorFactory : impureFinalPropsSelectorFactory;
  return selectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, options);
}

function match(arg, factories, name) {
  for (var i = factories.length - 1; i >= 0; i--) {
    var result = factories[i](arg);
    if (result) return result;
  }
  return function (dispatch, options) {
    throw new Error("Invalid value of type " + typeof arg + " for " + name + " argument when connecting component " + options.wrappedComponentName + ".");
  };
}
function strictEqual(a, b) {
  return a === b;
}
function createConnect(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$connectHOC = _ref.connectHOC,
      connectHOC = _ref$connectHOC === void 0 ? connectAdvanced : _ref$connectHOC,
      _ref$mapStateToPropsF = _ref.mapStateToPropsFactories,
      mapStateToPropsFactories = _ref$mapStateToPropsF === void 0 ? defaultMapStateToPropsFactories : _ref$mapStateToPropsF,
      _ref$mapDispatchToPro = _ref.mapDispatchToPropsFactories,
      mapDispatchToPropsFactories = _ref$mapDispatchToPro === void 0 ? defaultMapDispatchToPropsFactories : _ref$mapDispatchToPro,
      _ref$mergePropsFactor = _ref.mergePropsFactories,
      mergePropsFactories = _ref$mergePropsFactor === void 0 ? defaultMergePropsFactories : _ref$mergePropsFactor,
      _ref$selectorFactory = _ref.selectorFactory,
      selectorFactory = _ref$selectorFactory === void 0 ? finalPropsSelectorFactory : _ref$selectorFactory;
  return function connect(mapStateToProps, mapDispatchToProps, mergeProps, _temp2) {
    var _ref2 = _temp2 === void 0 ? {} : _temp2,
        _ref2$pure = _ref2.pure,
        pure = _ref2$pure === void 0 ? true : _ref2$pure,
        _ref2$areStatesEqual = _ref2.areStatesEqual,
        areStatesEqual = _ref2$areStatesEqual === void 0 ? strictEqual : _ref2$areStatesEqual,
        _ref2$areOwnPropsEqua = _ref2.areOwnPropsEqual,
        areOwnPropsEqual = _ref2$areOwnPropsEqua === void 0 ? shallowEqual : _ref2$areOwnPropsEqua,
        _ref2$areStatePropsEq = _ref2.areStatePropsEqual,
        areStatePropsEqual = _ref2$areStatePropsEq === void 0 ? shallowEqual : _ref2$areStatePropsEq,
        _ref2$areMergedPropsE = _ref2.areMergedPropsEqual,
        areMergedPropsEqual = _ref2$areMergedPropsE === void 0 ? shallowEqual : _ref2$areMergedPropsE,
        extraOptions = _objectWithoutPropertiesLoose(_ref2, ["pure", "areStatesEqual", "areOwnPropsEqual", "areStatePropsEqual", "areMergedPropsEqual"]);
    var initMapStateToProps = match(mapStateToProps, mapStateToPropsFactories, 'mapStateToProps');
    var initMapDispatchToProps = match(mapDispatchToProps, mapDispatchToPropsFactories, 'mapDispatchToProps');
    var initMergeProps = match(mergeProps, mergePropsFactories, 'mergeProps');
    return connectHOC(selectorFactory, _extends({
      methodName: 'connect',
      getDisplayName: function getDisplayName(name) {
        return "Connect(" + name + ")";
      },
      shouldHandleStateChanges: Boolean(mapStateToProps),
      initMapStateToProps: initMapStateToProps,
      initMapDispatchToProps: initMapDispatchToProps,
      initMergeProps: initMergeProps,
      pure: pure,
      areStatesEqual: areStatesEqual,
      areOwnPropsEqual: areOwnPropsEqual,
      areStatePropsEqual: areStatePropsEqual,
      areMergedPropsEqual: areMergedPropsEqual
    }, extraOptions));
  };
}
var connect = createConnect();

var preact_redux_esm_index = {
  Provider: preact_redux_esm_Provider,
  connect: connect,
  connectAdvanced: connectAdvanced,
  ReactReduxContext: ReactReduxContext
};

/* harmony default export */ var preact_redux_esm = (preact_redux_esm_index);

//# sourceMappingURL=preact-redux.esm.js.map
// EXTERNAL MODULE: ../node_modules/preact-router/dist/preact-router.es.js
var preact_router_es = __webpack_require__("/QC5");

// CONCATENATED MODULE: ./store/store.js


var ACTIONS = {};

var INITIAL = {};

/* harmony default export */ var store = (createStore(function (state, action) {
	return action && ACTIONS[action.type] ? ACTIONS[action.type](state, action) : state;
}, INITIAL, typeof devToolsExtension === 'function' ? devToolsExtension() : undefined));
// CONCATENATED MODULE: ./store/index.js

// EXTERNAL MODULE: ./globalStyles/index.less
var globalStyles = __webpack_require__("F1Bf");
var globalStyles_default = /*#__PURE__*/__webpack_require__.n(globalStyles);

// CONCATENATED MODULE: ./constants/mockOutlets.js
var MockOutlets = {
	data: [{
		Phases: { Voltage: '220V', Current: '168A' },
		Outputs: [{
			State: 'On',
			Voltage: '220V',
			Current: '56A',
			ActivePower: '4.01kW'
		}, {
			State: 'On',
			Voltage: '220V',
			Current: '56A',
			ActivePower: '4.01kW'
		}, {
			State: 'On',
			Voltage: '220V',
			Current: '56A',
			ActivePower: '4.01kW'
		}]
	}, {
		Phases: { Voltage: '220V', Current: '168A' },
		Outputs: [{
			State: 'On',
			Voltage: '220V',
			Current: '56A',
			ActivePower: '4.01kW'
		}, {
			State: 'Error',
			Voltage: '220V',
			Current: '56A',
			ActivePower: '4.01kW'
		}, {
			State: 'Overload',
			Voltage: '220V',
			Current: '56A',
			ActivePower: '4.01kW'
		}]
	}, {
		Phases: { Voltage: '220V', Current: '168A' },
		Outputs: [{
			State: 'Off',
			Voltage: '220V',
			Current: '56A',
			ActivePower: '4.01kW'
		}, {
			State: 'Off',
			Voltage: '220V',
			Current: '56A',
			ActivePower: '4.01kW'
		}, {
			State: 'Off',
			Voltage: '220V',
			Current: '56A',
			ActivePower: '4.01kW'
		}]
	}]
};
/* harmony default export */ var mockOutlets = (MockOutlets);
// CONCATENATED MODULE: ./constants/Routes.js
var ROUTE = {
	OVERVIEW: '/overview',
	OUTLETS: '/outlets',
	PROTOCOLS: '/protocols/:page?',
	LOGS: '/logs',
	USERS: '/users/:page?',
	SETTINGS: '/settings/:page?',
	LOGIN: '/login',
	PROFILE: '/profile',
	LANGUAGES: '/languages'
};

/* harmony default export */ var Routes = (ROUTE);
// CONCATENATED MODULE: ./constants/index.js


// CONCATENATED MODULE: ../node_modules/preact/hooks/dist/hooks.module.js
var hooks_module_t,
    hooks_module_r,
    hooks_module_u,
    hooks_module_i = [],
    hooks_module_o = preact_min["options"].__r,
    f = preact_min["options"].diffed,
    c = preact_min["options"].__c,
    e = preact_min["options"].unmount;function a(t) {
  preact_min["options"].__h && preact_min["options"].__h(hooks_module_r);var u = hooks_module_r.__H || (hooks_module_r.__H = { __: [], __h: [] });return t >= u.__.length && u.__.push({}), u.__[t];
}function v(n) {
  return m(x, n);
}function m(n, u, i) {
  var o = a(hooks_module_t++);return o.__c || (o.__c = hooks_module_r, o.__ = [i ? i(u) : x(void 0, u), function (t) {
    var r = n(o.__[0], t);o.__[0] !== r && (o.__[0] = r, o.__c.setState({}));
  }]), o.__;
}function p(n, u) {
  var i = a(hooks_module_t++);q(i.__H, u) && (i.__ = n, i.__H = u, hooks_module_r.__H.__h.push(i));
}function l(n, u) {
  var i = a(hooks_module_t++);q(i.__H, u) && (i.__ = n, i.__H = u, hooks_module_r.__h.push(i));
}function y(n) {
  return s(function () {
    return { current: n };
  }, []);
}function d(n, t, r) {
  l(function () {
    "function" == typeof n ? n(t()) : n && (n.current = t());
  }, null == r ? r : r.concat(n));
}function s(n, r) {
  var u = a(hooks_module_t++);return q(u.__H, r) ? (u.__H = r, u.__h = n, u.__ = n()) : u.__;
}function h(n, t) {
  return s(function () {
    return n;
  }, t);
}function T(n) {
  var u = hooks_module_r.context[n.__c];if (!u) return n.__;var i = a(hooks_module_t++);return null == i.__ && (i.__ = !0, u.sub(hooks_module_r)), u.props.value;
}function w(t, r) {
  preact_min["options"].useDebugValue && preact_min["options"].useDebugValue(r ? r(t) : t);
}function A(n) {
  var u = a(hooks_module_t++),
      i = v();return u.__ = n, hooks_module_r.componentDidCatch || (hooks_module_r.componentDidCatch = function (n) {
    u.__ && u.__(n), i[1](n);
  }), [i[0], function () {
    i[1](void 0);
  }];
}function F() {
  hooks_module_i.some(function (t) {
    if (t.__P) try {
      t.__H.__h.forEach(hooks_module__), t.__H.__h.forEach(g), t.__H.__h = [];
    } catch (r) {
      return preact_min["options"].__e(r, t.__v), !0;
    }
  }), hooks_module_i = [];
}function hooks_module__(n) {
  n.t && n.t();
}function g(n) {
  var t = n.__();"function" == typeof t && (n.t = t);
}function q(n, t) {
  return !n || t.some(function (t, r) {
    return t !== n[r];
  });
}function x(n, t) {
  return "function" == typeof t ? t(n) : t;
}preact_min["options"].__r = function (n) {
  hooks_module_o && hooks_module_o(n), hooks_module_t = 0, (hooks_module_r = n.__c).__H && (hooks_module_r.__H.__h.forEach(hooks_module__), hooks_module_r.__H.__h.forEach(g), hooks_module_r.__H.__h = []);
}, preact_min["options"].diffed = function (t) {
  f && f(t);var r = t.__c;if (r) {
    var o = r.__H;o && o.__h.length && (1 !== hooks_module_i.push(r) && hooks_module_u === preact_min["options"].requestAnimationFrame || ((hooks_module_u = preact_min["options"].requestAnimationFrame) || function (n) {
      var t,
          r = function r() {
        clearTimeout(u), cancelAnimationFrame(t), setTimeout(n);
      },
          u = setTimeout(r, 100);"undefined" != typeof window && (t = requestAnimationFrame(r));
    })(F));
  }
}, preact_min["options"].__c = function (t, r) {
  r.some(function (t) {
    try {
      t.__h.forEach(hooks_module__), t.__h = t.__h.filter(function (n) {
        return !n.__ || g(n);
      });
    } catch (u) {
      r.some(function (n) {
        n.__h && (n.__h = []);
      }), r = [], preact_min["options"].__e(u, t.__v);
    }
  }), c && c(t, r);
}, preact_min["options"].unmount = function (t) {
  e && e(t);var r = t.__c;if (r) {
    var u = r.__H;if (u) try {
      u.__.forEach(function (n) {
        return n.t && n.t();
      });
    } catch (t) {
      preact_min["options"].__e(t, r.__v);
    }
  }
};
//# sourceMappingURL=hooks.module.js.map
// CONCATENATED MODULE: ./components/Dropdown/Dropdown.js



var Dropdown_Dropdown = function Dropdown(props) {
	var _useState = v(false),
	    isDropOpened = _useState[0],
	    toggle = _useState[1];

	var _useState2 = v(props.list[0]),
	    selectedValue = _useState2[0],
	    changeValue = _useState2[1];

	return Object(preact_min["h"])(
		"div",
		{ className: "dropdown", onClick: function onClick() {
				return toggle(!isDropOpened);
			} },
		props.iconUrl && Object(preact_min["h"])(
			"div",
			{ className: "iconContainer" },
			Object(preact_min["h"])("img", { className: "icon", src: props.iconUrl, alt: "dropdownIcon" })
		),
		Object(preact_min["h"])(
			"span",
			{ className: "label" },
			selectedValue
		),
		isDropOpened && Object(preact_min["h"])(
			"div",
			{ className: "dropdown-content" },
			props.list && props.list.map(function (item) {
				return Object(preact_min["h"])(
					"div",
					{ className: "item", onClick: function onClick() {
							return changeValue(item);
						} },
					Object(preact_min["h"])("input", { className: "radio", type: "radio", checked: selectedValue === item }),
					Object(preact_min["h"])(
						"div",
						{ className: "label " + (selectedValue === item ? "On" : "") },
						item
					)
				);
			})
		)
	);
};

/* harmony default export */ var components_Dropdown_Dropdown = (Dropdown_Dropdown);
// CONCATENATED MODULE: ./components/Dropzone/Dropzone.js


var Dropzone__ref = Object(preact_min["h"])(
	"div",
	{ className: "Dropzone" },
	Object(preact_min["h"])("input", { type: "file", name: "file", id: "file", className: "inputfile" }),
	Object(preact_min["h"])(
		"label",
		{ htmlFor: "file" },
		"Choose a file"
	)
);

var Dropzone = function Dropzone(props) {
	return Dropzone__ref;
};

/* harmony default export */ var Dropzone_Dropzone = (Dropzone);
// CONCATENATED MODULE: ./components/Input/Input.js

var Input_Input = function Input(props) {
	return Object(preact_min["h"])("input", { className: props.class, type: props.type, placeholder: props.placeholder, value: props.value });
};

/* harmony default export */ var components_Input_Input = (Input_Input);
// CONCATENATED MODULE: ./components/Select/Select.js

var Select_Select = function Select(props) {
	return Object(preact_min["h"])(
		'select',
		{ className: 'select ' + props.class, placeholder: props.placeholder },
		props.options.map(function (option) {
			return Object(preact_min["h"])(
				'option',
				null,
				option
			);
		})
	);
};

/* harmony default export */ var components_Select_Select = (Select_Select);
// CONCATENATED MODULE: ./components/Button/Button.js

//You can provide here callback if it requires
var Button_Button = function Button(props) {
	return Object(preact_min["h"])(
		'button',
		{ className: 'button ' + props.class, type: props.type },
		' ',
		props.value,
		' '
	);
};

/* harmony default export */ var components_Button_Button = (Button_Button);
// CONCATENATED MODULE: ./components/RadioButton/RadioButton.js

var RadioButton_RadioButton = function RadioButton(props) {
	return Object(preact_min["h"])(
		"div",
		{ className: "radioGroup" },
		Object(preact_min["h"])("input", { className: "radioInput", onClick: props.callback, type: "radio", name: props.name, checked: props.checked }),
		Object(preact_min["h"])(
			"label",
			{ className: "label" },
			" ",
			props.label,
			" "
		)
	);
};

/* harmony default export */ var components_RadioButton_RadioButton = (RadioButton_RadioButton);
// CONCATENATED MODULE: ./components/Switch/Switch.js


var Switch__ref = Object(preact_min["h"])(
	"label",
	{ className: "switch" },
	Object(preact_min["h"])("input", { type: "checkbox" }),
	Object(preact_min["h"])("span", { className: "slider round" })
);

var Switch = function Switch(props) {
	return Switch__ref;
};

/* harmony default export */ var Switch_Switch = (Switch);
// CONCATENATED MODULE: ./components/Checkbox/Checkbox.js


var Checkbox__ref = Object(preact_min["h"])("input", { className: "checkbox", type: "checkbox" });

var Checkbox = function Checkbox(props) {
	return Checkbox__ref;
};

/* harmony default export */ var Checkbox_Checkbox = (Checkbox);
// CONCATENATED MODULE: ./components/TextBox/TextBox.js

var TextBox_TextBox = function TextBox(props) {
	return Object(preact_min["h"])("input", { className: "textBox", value: props.value });
};

/* harmony default export */ var components_TextBox_TextBox = (TextBox_TextBox);
// CONCATENATED MODULE: ./components/index.js









// CONCATENATED MODULE: ./containers/Logs/Logs.js


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var Logs__ref = Object(preact_min["h"])(
	'div',
	{ className: 'LogsWrapper' },
	Object(preact_min["h"])(
		'div',
		{ className: 'row head' },
		Object(preact_min["h"])(
			'div',
			{ className: 'title' },
			'Logs'
		),
		Object(preact_min["h"])(
			'div',
			{ className: 'row btnGroup' },
			Object(preact_min["h"])(components_Button_Button, { value: 'Refresh' }),
			Object(preact_min["h"])(components_Button_Button, { value: 'Export to file' }),
			Object(preact_min["h"])(components_Button_Button, { value: 'Clear log', 'class': 'disabled' })
		)
	),
	Object(preact_min["h"])(
		'div',
		{ className: 'column container' },
		Object(preact_min["h"])(
			'div',
			{ className: 'row labels' },
			Object(preact_min["h"])(
				'div',
				{ className: 'fieldMerger' },
				Object(preact_min["h"])(
					'div',
					{ className: 'label' },
					'Time'
				),
				Object(preact_min["h"])(
					'div',
					{ className: 'label' },
					'Type'
				)
			),
			Object(preact_min["h"])(
				'div',
				{ className: 'label' },
				'Message'
			)
		),
		Object(preact_min["h"])(
			'div',
			{ className: 'row' },
			Object(preact_min["h"])(
				'div',
				{ className: 'fieldMerger' },
				Object(preact_min["h"])(
					'div',
					{ className: 'value' },
					'2020-03-09 13:18:45'
				),
				Object(preact_min["h"])(
					'div',
					{ className: 'value' },
					'NOTICE'
				)
			),
			Object(preact_min["h"])(
				'div',
				{ className: 'value message' },
				'Session for user \'demo\' has been terminated (reason: timeout).'
			)
		),
		Object(preact_min["h"])(
			'div',
			{ className: 'row' },
			Object(preact_min["h"])(
				'div',
				{ className: 'fieldMerger' },
				Object(preact_min["h"])(
					'div',
					{ className: 'value' },
					'2020-03-09 13:18:45'
				),
				Object(preact_min["h"])(
					'div',
					{ className: 'value' },
					'NOTICE'
				)
			),
			Object(preact_min["h"])(
				'div',
				{ className: 'value message' },
				'Session for user \'demo\' has been terminated (reason: timeout).'
			)
		),
		Object(preact_min["h"])(
			'div',
			{ className: 'row' },
			Object(preact_min["h"])(
				'div',
				{ className: 'fieldMerger' },
				Object(preact_min["h"])(
					'div',
					{ className: 'value' },
					'2020-03-09 13:18:45'
				),
				Object(preact_min["h"])(
					'div',
					{ className: 'value' },
					'NOTICE'
				)
			),
			Object(preact_min["h"])(
				'div',
				{ className: 'value message' },
				'Session for user \'demo\' has been terminated (reason: timeout).'
			)
		),
		Object(preact_min["h"])(
			'div',
			{ className: 'row' },
			Object(preact_min["h"])(
				'div',
				{ className: 'fieldMerger' },
				Object(preact_min["h"])(
					'div',
					{ className: 'value' },
					'2020-03-09 13:18:45'
				),
				Object(preact_min["h"])(
					'div',
					{ className: 'value' },
					'NOTICE'
				)
			),
			Object(preact_min["h"])(
				'div',
				{ className: 'value message' },
				'Session for user \'demo\' has been terminated (reason: timeout).'
			)
		),
		Object(preact_min["h"])(
			'div',
			{ className: 'row' },
			Object(preact_min["h"])(
				'div',
				{ className: 'fieldMerger' },
				Object(preact_min["h"])(
					'div',
					{ className: 'value' },
					'2020-03-09 13:18:45'
				),
				Object(preact_min["h"])(
					'div',
					{ className: 'value' },
					'NOTICE'
				)
			),
			Object(preact_min["h"])(
				'div',
				{ className: 'value message' },
				'Session for user \'demo\' has been terminated (reason: timeout).'
			)
		),
		Object(preact_min["h"])(
			'div',
			{ className: 'row' },
			Object(preact_min["h"])(
				'div',
				{ className: 'fieldMerger' },
				Object(preact_min["h"])(
					'div',
					{ className: 'value' },
					'2020-03-09 13:18:45'
				),
				Object(preact_min["h"])(
					'div',
					{ className: 'value' },
					'NOTICE'
				)
			),
			Object(preact_min["h"])(
				'div',
				{ className: 'value message' },
				'Session for user \'demo\' has been terminated (reason: timeout).'
			)
		),
		Object(preact_min["h"])(
			'div',
			{ className: 'row' },
			Object(preact_min["h"])(
				'div',
				{ className: 'fieldMerger' },
				Object(preact_min["h"])(
					'div',
					{ className: 'value' },
					'2020-03-09 13:18:45'
				),
				Object(preact_min["h"])(
					'div',
					{ className: 'value' },
					'NOTICE'
				)
			),
			Object(preact_min["h"])(
				'div',
				{ className: 'value message' },
				'Session for user \'demo\' has been terminated (reason: timeout).'
			)
		),
		Object(preact_min["h"])(
			'div',
			{ className: 'row' },
			Object(preact_min["h"])(
				'div',
				{ className: 'fieldMerger' },
				Object(preact_min["h"])(
					'div',
					{ className: 'value' },
					'2020-03-09 13:18:45'
				),
				Object(preact_min["h"])(
					'div',
					{ className: 'value' },
					'NOTICE'
				)
			),
			Object(preact_min["h"])(
				'div',
				{ className: 'value message' },
				'Session for user \'demo\' has been terminated (reason: timeout).'
			)
		),
		Object(preact_min["h"])(
			'div',
			{ className: 'row' },
			Object(preact_min["h"])(
				'div',
				{ className: 'fieldMerger' },
				Object(preact_min["h"])(
					'div',
					{ className: 'value' },
					'2020-03-09 13:18:45'
				),
				Object(preact_min["h"])(
					'div',
					{ className: 'value' },
					'NOTICE'
				)
			),
			Object(preact_min["h"])(
				'div',
				{ className: 'value message' },
				'Session for user \'demo\' has been terminated (reason: timeout).'
			)
		),
		Object(preact_min["h"])(
			'div',
			{ className: 'row' },
			Object(preact_min["h"])(
				'div',
				{ className: 'fieldMerger' },
				Object(preact_min["h"])(
					'div',
					{ className: 'value' },
					'2020-03-09 13:18:45'
				),
				Object(preact_min["h"])(
					'div',
					{ className: 'value' },
					'NOTICE'
				)
			),
			Object(preact_min["h"])(
				'div',
				{ className: 'value message' },
				'Session for user \'demo\' has been terminated (reason: timeout).'
			)
		),
		Object(preact_min["h"])(
			'div',
			{ className: 'row' },
			Object(preact_min["h"])(
				'div',
				{ className: 'fieldMerger' },
				Object(preact_min["h"])(
					'div',
					{ className: 'value' },
					'2020-03-09 13:18:45'
				),
				Object(preact_min["h"])(
					'div',
					{ className: 'value' },
					'NOTICE'
				)
			),
			Object(preact_min["h"])(
				'div',
				{ className: 'value message' },
				'Session for user \'demo\' has been terminated (reason: timeout).'
			)
		),
		Object(preact_min["h"])(
			'div',
			{ className: 'row' },
			Object(preact_min["h"])(
				'div',
				{ className: 'fieldMerger' },
				Object(preact_min["h"])(
					'div',
					{ className: 'value' },
					'2020-03-09 13:18:45'
				),
				Object(preact_min["h"])(
					'div',
					{ className: 'value' },
					'NOTICE'
				)
			),
			Object(preact_min["h"])(
				'div',
				{ className: 'value message' },
				'Session for user \'demo\' has been terminated (reason: timeout).'
			)
		),
		Object(preact_min["h"])(
			'div',
			{ className: 'row' },
			Object(preact_min["h"])(
				'div',
				{ className: 'fieldMerger' },
				Object(preact_min["h"])(
					'div',
					{ className: 'value' },
					'2020-03-09 13:18:45'
				),
				Object(preact_min["h"])(
					'div',
					{ className: 'value' },
					'NOTICE'
				)
			),
			Object(preact_min["h"])(
				'div',
				{ className: 'value message' },
				'Session for user \'demo\' has been terminated (reason: timeout).'
			)
		),
		Object(preact_min["h"])(
			'div',
			{ className: 'row' },
			Object(preact_min["h"])(
				'div',
				{ className: 'fieldMerger' },
				Object(preact_min["h"])(
					'div',
					{ className: 'value' },
					'2020-03-09 13:18:45'
				),
				Object(preact_min["h"])(
					'div',
					{ className: 'value' },
					'NOTICE'
				)
			),
			Object(preact_min["h"])(
				'div',
				{ className: 'value message' },
				'Session for user \'demo\' has been terminated (reason: timeout).'
			)
		),
		Object(preact_min["h"])(
			'div',
			{ className: 'row' },
			Object(preact_min["h"])(
				'div',
				{ className: 'fieldMerger' },
				Object(preact_min["h"])(
					'div',
					{ className: 'value' },
					'2020-03-09 13:18:45'
				),
				Object(preact_min["h"])(
					'div',
					{ className: 'value' },
					'NOTICE'
				)
			),
			Object(preact_min["h"])(
				'div',
				{ className: 'value message' },
				'Session for user \'demo\' has been terminated (reason: timeout).'
			)
		),
		Object(preact_min["h"])(
			'div',
			{ className: 'row' },
			Object(preact_min["h"])(
				'div',
				{ className: 'fieldMerger' },
				Object(preact_min["h"])(
					'div',
					{ className: 'value' },
					'2020-03-09 13:18:45'
				),
				Object(preact_min["h"])(
					'div',
					{ className: 'value' },
					'NOTICE'
				)
			),
			Object(preact_min["h"])(
				'div',
				{ className: 'value message' },
				'Session for user \'demo\' has been terminated (reason: timeout).'
			)
		)
	)
);

var Logs = function (_Component) {
	_inherits(Logs, _Component);

	function Logs() {
		_classCallCheck(this, Logs);

		return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	Logs.prototype.render = function render() {
		return Logs__ref;
	};

	return Logs;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./assets/output.svg




/* harmony default export */ var assets_output = (function (props) {
    var styles = props.styles;
    var rest = Object.assign({}, props);
    delete rest.styles;

    return Object(preact_min["h"])('svg', Object.assign({"width":"40","height":"28","xmlns":"http://www.w3.org/2000/svg"}, rest), ["\r\n\t", Object(preact_min["h"])('undefined', {}, []), "\r\n\r\n\t", Object(preact_min["h"])('g', {}, ["\r\n\t\t", Object(preact_min["h"])('title', {}, ["background"]), "\r\n\t\t", Object(preact_min["h"])('rect', {"x":"-1","y":"-1","width":"6.678363","height":"5.274854","id":"svg-output-1-iZ6Zt","fill":"none"}, []), "\r\n\t\t", Object(preact_min["h"])('g', {"id":"svg-output-1khUMra","display":"none"}, ["\r\n\t\t\t", Object(preact_min["h"])('rect', {"id":"svg-output-UXPEN-J","width":"100%","height":"100%","x":"0","y":"0","stroke-width":"0","fill":"url(#svg-output-3jYJyq5)"}, []), "\r\n\t\t"]), "\r\n\t"]), "\r\n\r\n\t", Object(preact_min["h"])('g', {}, ["\r\n\t\t", Object(preact_min["h"])('title', {}, ["Layer 1"]), "\r\n\r\n\t\t", Object(preact_min["h"])('rect', {"fill":"#545454","class":[styles && styles["color"] || "color"].join(' '),"stroke-width":"0","x":"0.08315","y":"0.044962","width":"39.816329","height":"28","id":"svg-output-2Wfc-S6","rx":"4","stroke":"#000"}, []), "\r\n\t\t", Object(preact_min["h"])('rect', {"fill":"#ffffff","stroke":"#000","stroke-width":"0","stroke-opacity":"null","x":"6.379935","y":"17.877891","width":"8.163265","height":"4.081632","id":"svg-output-24fGYVE"}, []), "\r\n\t\t", Object(preact_min["h"])('rect', {"fill":"#ffffff","stroke":"#000","stroke-width":"0","stroke-opacity":"null","x":"15.909683","y":"5.847819","width":"8.163265","height":"4.081632","id":"svg-output-3cTLecD"}, []), "\r\n\t\t", Object(preact_min["h"])('rect', {"fill":"#ffffff","stroke":"#000","stroke-width":"0","stroke-opacity":"null","x":"25.386672","y":"18.081972","width":"8.163265","height":"4.081632","id":"svg-output-2deBZ5c","transform":"rotate(-180 29.468303680419922,20.1227855682373) "}, []), "\r\n\t"]), "\r\n"]);
});;

        
// CONCATENATED MODULE: ./containers/Outlets/Outlets.js


function Outlets__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Outlets__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function Outlets__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var Outlets__ref2 = Object(preact_min["h"])(
	'div',
	{ className: 'title' },
	Object(preact_min["h"])(
		'p',
		null,
		' Outlets '
	)
);

var _ref3 = Object(preact_min["h"])(
	'div',
	{ className: 'heading' },
	Object(preact_min["h"])(
		'p',
		null,
		'Restore mode'
	)
);

var Outlets__ref4 = Object(preact_min["h"])(
	'p',
	{ className: 'description' },
	'Initially, both flip-flops are reset, and the Q output of the second flip-flop is high, so the 74HC03 pulls the EN line to ground'
);

var _ref5 = Object(preact_min["h"])(
	'p',
	{ className: 'description' },
	'Initially, both flip-flops are reset, and the Q output of the second flip-flop is high, so the 74HC03 pulls the EN line to ground'
);

var _ref6 = Object(preact_min["h"])(
	'p',
	{ className: 'description' },
	'Initially, both flip-flops are reset, and the Q output of the second flip-flop is high, so the 74HC03 pulls the EN line to ground'
);

var _ref7 = Object(preact_min["h"])(
	'p',
	{ className: 'description' },
	'Initially, both flip-flops are reset, and the Q output of the second flip-flop is high, so the 74HC03 pulls the EN line to ground'
);

var _ref8 = Object(preact_min["h"])(
	'p',
	{ className: 'description' },
	'Initially, both flip-flops are reset, and the Q output of the second flip-flop is high, so the 74HC03 pulls the EN line to ground'
);

var _ref9 = Object(preact_min["h"])(
	'p',
	{ className: 'description' },
	'Initially, both flip-flops are reset, and the Q output of the second flip-flop is high, so the 74HC03 pulls the EN line to ground'
);

var _ref10 = Object(preact_min["h"])(
	'div',
	{ className: 'row outputsGrid' },
	Object(preact_min["h"])(
		'div',
		{ className: 'column labels' },
		Object(preact_min["h"])(
			'div',
			{ className: 'label' },
			'Outputs'
		),
		Object(preact_min["h"])(
			'div',
			{ className: 'label' },
			'State'
		),
		Object(preact_min["h"])(
			'div',
			{ className: 'label' },
			'Delay, s (0-255)'
		)
	),
	Object(preact_min["h"])(
		'div',
		{ className: 'row' },
		Object(preact_min["h"])(
			'div',
			{ className: 'column labels' },
			Object(preact_min["h"])(
				'div',
				{ className: 'label' },
				'Outputs'
			),
			Object(preact_min["h"])(
				'div',
				{ className: 'label' },
				'State'
			),
			Object(preact_min["h"])(
				'div',
				{ className: 'label' },
				'Delay, s (0-255)'
			)
		),
		Object(preact_min["h"])(
			'div',
			{ className: 'column' },
			Object(preact_min["h"])(
				'div',
				{ className: 'column Output' },
				Object(preact_min["h"])(assets_output, { className: 'On', alt: 'output' }),
				Object(preact_min["h"])(
					'p',
					{ className: 'outputName' },
					'Output_1'
				)
			),
			Object(preact_min["h"])(
				'div',
				{ className: 'Switch' },
				Object(preact_min["h"])(Switch_Switch, null)
			),
			Object(preact_min["h"])(
				'div',
				{ className: 'TextBox' },
				Object(preact_min["h"])(components_TextBox_TextBox, { value: 110 })
			)
		),
		Object(preact_min["h"])(
			'div',
			{ className: 'column' },
			Object(preact_min["h"])(
				'div',
				{ className: 'column Output' },
				Object(preact_min["h"])(assets_output, { className: 'On', alt: 'output' }),
				Object(preact_min["h"])(
					'p',
					{ className: 'outputName' },
					'Output_2'
				)
			),
			Object(preact_min["h"])(
				'div',
				{ className: 'Switch' },
				Object(preact_min["h"])(Switch_Switch, null)
			),
			Object(preact_min["h"])(
				'div',
				{ className: 'TextBox' },
				Object(preact_min["h"])(components_TextBox_TextBox, { value: 110 })
			)
		),
		Object(preact_min["h"])(
			'div',
			{ className: 'column' },
			Object(preact_min["h"])(
				'div',
				{ className: 'column Output' },
				Object(preact_min["h"])(assets_output, { className: 'On', alt: 'output' }),
				Object(preact_min["h"])(
					'p',
					{ className: 'outputName' },
					'Output_3'
				)
			),
			Object(preact_min["h"])(
				'div',
				{ className: 'Switch' },
				Object(preact_min["h"])(Switch_Switch, null)
			),
			Object(preact_min["h"])(
				'div',
				{ className: 'TextBox' },
				Object(preact_min["h"])(components_TextBox_TextBox, { value: 110 })
			)
		)
	),
	Object(preact_min["h"])(
		'div',
		{ className: 'row' },
		Object(preact_min["h"])(
			'div',
			{ className: 'column labels' },
			Object(preact_min["h"])(
				'div',
				{ className: 'label' },
				'Outputs'
			),
			Object(preact_min["h"])(
				'div',
				{ className: 'label' },
				'State'
			),
			Object(preact_min["h"])(
				'div',
				{ className: 'label' },
				'Delay, s (0-255)'
			)
		),
		Object(preact_min["h"])(
			'div',
			{ className: 'column' },
			Object(preact_min["h"])(
				'div',
				{ className: 'column Output' },
				Object(preact_min["h"])(assets_output, { className: 'On', alt: 'output' }),
				Object(preact_min["h"])(
					'p',
					{ className: 'outputName' },
					'Output_4'
				)
			),
			Object(preact_min["h"])(
				'div',
				{ className: 'Switch' },
				Object(preact_min["h"])(Switch_Switch, null)
			),
			Object(preact_min["h"])(
				'div',
				{ className: 'TextBox' },
				Object(preact_min["h"])(components_TextBox_TextBox, { value: 110 })
			)
		),
		Object(preact_min["h"])(
			'div',
			{ className: 'column' },
			Object(preact_min["h"])(
				'div',
				{ className: 'column Output' },
				Object(preact_min["h"])(assets_output, { className: 'Error', alt: 'output' }),
				Object(preact_min["h"])(
					'p',
					{ className: 'outputName' },
					'Output_5'
				)
			),
			Object(preact_min["h"])(
				'div',
				{ className: 'Switch' },
				Object(preact_min["h"])(Switch_Switch, null)
			),
			Object(preact_min["h"])(
				'div',
				{ className: 'TextBox' },
				Object(preact_min["h"])(components_TextBox_TextBox, { value: 110 })
			)
		),
		Object(preact_min["h"])(
			'div',
			{ className: 'column' },
			Object(preact_min["h"])(
				'div',
				{ className: 'column Output' },
				Object(preact_min["h"])(assets_output, { className: 'Overload', alt: 'output' }),
				Object(preact_min["h"])(
					'p',
					{ className: 'outputName' },
					'Output_6'
				)
			),
			Object(preact_min["h"])(
				'div',
				{ className: 'Switch' },
				Object(preact_min["h"])(Switch_Switch, null)
			),
			Object(preact_min["h"])(
				'div',
				{ className: 'TextBox' },
				Object(preact_min["h"])(components_TextBox_TextBox, { value: 110 })
			)
		)
	),
	Object(preact_min["h"])(
		'div',
		{ className: 'row' },
		Object(preact_min["h"])(
			'div',
			{ className: 'column labels' },
			Object(preact_min["h"])(
				'div',
				{ className: 'label' },
				'Outputs'
			),
			Object(preact_min["h"])(
				'div',
				{ className: 'label' },
				'State'
			),
			Object(preact_min["h"])(
				'div',
				{ className: 'label' },
				'Delay, s (0-255)'
			)
		),
		Object(preact_min["h"])(
			'div',
			{ className: 'column' },
			Object(preact_min["h"])(
				'div',
				{ className: 'column Output' },
				Object(preact_min["h"])(assets_output, { className: 'Off', alt: 'output' }),
				Object(preact_min["h"])(
					'p',
					{ className: 'outputName' },
					'Output_7'
				)
			),
			Object(preact_min["h"])(
				'div',
				{ className: 'Switch' },
				Object(preact_min["h"])(Switch_Switch, null)
			),
			Object(preact_min["h"])(
				'div',
				{ className: 'TextBox' },
				Object(preact_min["h"])(components_TextBox_TextBox, { value: 110 })
			)
		),
		Object(preact_min["h"])(
			'div',
			{ className: 'column' },
			Object(preact_min["h"])(
				'div',
				{ className: 'column Output' },
				Object(preact_min["h"])(assets_output, { className: 'Off', alt: 'output' }),
				Object(preact_min["h"])(
					'p',
					{ className: 'outputName' },
					'Output_8'
				)
			),
			Object(preact_min["h"])(
				'div',
				{ className: 'Switch' },
				Object(preact_min["h"])(Switch_Switch, null)
			),
			Object(preact_min["h"])(
				'div',
				{ className: 'TextBox' },
				Object(preact_min["h"])(components_TextBox_TextBox, { value: 110 })
			)
		),
		Object(preact_min["h"])(
			'div',
			{ className: 'column' },
			Object(preact_min["h"])(
				'div',
				{ className: 'column Output' },
				Object(preact_min["h"])(assets_output, { className: 'Off', alt: 'output' }),
				Object(preact_min["h"])(
					'p',
					{ className: 'outputName' },
					'Output_9'
				)
			),
			Object(preact_min["h"])(
				'div',
				{ className: 'Switch' },
				Object(preact_min["h"])(Switch_Switch, null)
			),
			Object(preact_min["h"])(
				'div',
				{ className: 'TextBox' },
				Object(preact_min["h"])(components_TextBox_TextBox, { value: 110 })
			)
		)
	)
);

var Outlets_Outlets = function (_Component) {
	Outlets__inherits(Outlets, _Component);

	function Outlets() {
		var _temp, _this, _ret;

		Outlets__classCallCheck(this, Outlets);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = Outlets__possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
			restoreModes: ["Latching", "Stay OFF", "Delayed"],
			selectedMode: "Latching"
		}, _this.toggleMode = function (selected) {
			console.log(selected);
			_this.setState({ selectedMode: selected });
		}, _temp), Outlets__possibleConstructorReturn(_this, _ret);
	}

	Outlets.prototype.render = function render(props, _ref) {
		var _this2 = this;

		var restoreModes = _ref.restoreModes,
		    selectedMode = _ref.selectedMode;

		return Object(preact_min["h"])(
			'div',
			{ className: 'OutletsWrapper' },
			Outlets__ref2,
			Object(preact_min["h"])(
				'div',
				{ className: 'container' },
				_ref3,
				Object(preact_min["h"])(
					'div',
					{ className: 'row stateGroup' },
					Object(preact_min["h"])(
						'div',
						{ className: "column " + (selectedMode === restoreModes[0] ? "is-active" : "") },
						Object(preact_min["h"])(components_RadioButton_RadioButton, { callback: function callback() {
								return _this2.toggleMode(restoreModes[0]);
							}, label: restoreModes[0], name: 'state',
							checked: selectedMode === restoreModes[0] }),
						Outlets__ref4
					),
					Object(preact_min["h"])(
						'div',
						{ className: "column " + (selectedMode === restoreModes[1] ? "is-active" : "") },
						Object(preact_min["h"])(components_RadioButton_RadioButton, { callback: function callback() {
								return _this2.toggleMode(restoreModes[1]);
							}, label: restoreModes[1], name: 'state',
							checked: selectedMode === restoreModes[1] }),
						_ref5
					),
					Object(preact_min["h"])(
						'div',
						{ className: "column " + (selectedMode === restoreModes[2] ? "is-active" : "") },
						Object(preact_min["h"])(components_RadioButton_RadioButton, { callback: function callback() {
								return _this2.toggleMode(restoreModes[2]);
							}, label: restoreModes[2], name: 'state',
							checked: selectedMode === restoreModes[2] }),
						_ref6
					)
				),
				Object(preact_min["h"])(
					'div',
					{ className: 'row stateGroupMobile' },
					Object(preact_min["h"])(
						'div',
						{ className: 'column' },
						Object(preact_min["h"])(
							'div',
							{ className: 'row states' },
							Object(preact_min["h"])(
								'div',
								{ className: "mode " + (selectedMode === restoreModes[0] ? "is-active" : ""),
									onClick: function onClick() {
										return _this2.toggleMode(restoreModes[0]);
									} },
								Object(preact_min["h"])(
									'p',
									{ className: 'label' },
									restoreModes[0]
								)
							),
							Object(preact_min["h"])(
								'div',
								{ className: "mode " + (selectedMode === restoreModes[1] ? "is-active" : ""),
									onClick: function onClick() {
										return _this2.toggleMode(restoreModes[1]);
									} },
								Object(preact_min["h"])(
									'p',
									{ className: 'label' },
									restoreModes[1]
								)
							),
							Object(preact_min["h"])(
								'div',
								{ className: "mode " + (selectedMode === restoreModes[2] ? "is-active" : ""),
									onClick: function onClick() {
										return _this2.toggleMode(restoreModes[2]);
									} },
								Object(preact_min["h"])(
									'p',
									{ className: 'label' },
									restoreModes[2]
								)
							)
						),
						Object(preact_min["h"])(
							'div',
							{ className: 'row descriptionWrapper' },
							Object(preact_min["h"])(
								'div',
								{ className: "descriptionContainer " + (selectedMode === restoreModes[0] ? "is-active" : "") },
								_ref7
							),
							Object(preact_min["h"])(
								'div',
								{ className: "descriptionContainer " + (selectedMode === restoreModes[1] ? "is-active" : "") },
								_ref8
							),
							Object(preact_min["h"])(
								'div',
								{ className: "descriptionContainer " + (selectedMode === restoreModes[2] ? "is-active" : "") },
								_ref9
							)
						)
					)
				),
				_ref10
			)
		);
	};

	return Outlets;
}(preact_min["Component"]);


// EXTERNAL MODULE: ./containers/Overview/SystemLayout/SystemLayout.less
var SystemLayout = __webpack_require__("ufd/");
var SystemLayout_default = /*#__PURE__*/__webpack_require__.n(SystemLayout);

// CONCATENATED MODULE: ./containers/Overview/SystemLayout/SystemLayout.js



var SystemLayout__ref = Object(preact_min["h"])(
	"div",
	{ className: "systemDescription" },
	Object(preact_min["h"])(
		"div",
		{ className: "title" },
		" System"
	),
	Object(preact_min["h"])(
		"div",
		{ className: "row container" },
		Object(preact_min["h"])(
			"div",
			{ className: "row" },
			Object(preact_min["h"])(
				"div",
				{ className: "column" },
				Object(preact_min["h"])(
					"div",
					{ className: "heading" },
					"Temperature"
				),
				Object(preact_min["h"])(
					"div",
					{ className: "value" },
					" 63 C\xB0"
				)
			),
			Object(preact_min["h"])(
				"div",
				{ className: "column" },
				Object(preact_min["h"])(
					"div",
					{ className: "heading" },
					"Current Network Status"
				),
				Object(preact_min["h"])(
					"div",
					{ className: "row" },
					Object(preact_min["h"])(
						"div",
						{ className: "label" },
						"MAC address"
					),
					Object(preact_min["h"])(
						"div",
						{ className: "value" },
						"24:A4:2C:39:2E:D4"
					)
				),
				Object(preact_min["h"])(
					"div",
					{ className: "row" },
					Object(preact_min["h"])(
						"div",
						{ className: "label" },
						"IP address"
					),
					Object(preact_min["h"])(
						"div",
						{ className: "value" },
						" 31.7.241.131"
					)
				),
				Object(preact_min["h"])(
					"div",
					{ className: "row" },
					Object(preact_min["h"])(
						"div",
						{ className: "label" },
						"Net mask"
					),
					Object(preact_min["h"])(
						"div",
						{ className: "value" },
						" 255.255.255.240"
					)
				),
				Object(preact_min["h"])(
					"div",
					{ className: "row" },
					Object(preact_min["h"])(
						"div",
						{ className: "label" },
						"Default gateway"
					),
					Object(preact_min["h"])(
						"div",
						{ className: "value" },
						" 31.7.241.129"
					)
				),
				Object(preact_min["h"])(
					"div",
					{ className: "row" },
					Object(preact_min["h"])(
						"div",
						{ className: "label" },
						"DNS server"
					),
					Object(preact_min["h"])(
						"div",
						{ className: "value" },
						" 8.8.8.8"
					)
				),
				Object(preact_min["h"])(
					"div",
					{ className: "row" },
					Object(preact_min["h"])(
						"div",
						{ className: "label" },
						" Network mode"
					),
					Object(preact_min["h"])(
						"div",
						{ className: "value" },
						" DHCP"
					)
				)
			)
		),
		Object(preact_min["h"])(
			"div",
			{ className: "row" },
			Object(preact_min["h"])(
				"div",
				{ className: "column" },
				Object(preact_min["h"])(
					"div",
					{ className: "heading" },
					"Hardware Version"
				),
				Object(preact_min["h"])(
					"div",
					{ className: "row" },
					Object(preact_min["h"])(
						"div",
						{ className: "label" },
						"Controller"
					),
					Object(preact_min["h"])(
						"div",
						{ className: "value" },
						" PDU9"
					)
				),
				Object(preact_min["h"])(
					"div",
					{ className: "row" },
					Object(preact_min["h"])(
						"div",
						{ className: "label" },
						"Peripherials"
					),
					Object(preact_min["h"])(
						"div",
						{ className: "value" },
						"v00.001"
					)
				),
				Object(preact_min["h"])(
					"div",
					{ className: "column Software" },
					Object(preact_min["h"])(
						"div",
						{ className: "heading" },
						"Current Software Version"
					),
					Object(preact_min["h"])(
						"div",
						{ className: "value" },
						" PDUSOFT9"
					)
				)
			),
			Object(preact_min["h"])(
				"div",
				{ className: "column" },
				Object(preact_min["h"])(
					"div",
					{ className: "heading" },
					"Date / Time"
				),
				Object(preact_min["h"])(
					"div",
					{ className: "row" },
					Object(preact_min["h"])(
						"div",
						{ className: "label" },
						"Date"
					),
					Object(preact_min["h"])(
						"div",
						{ className: "value" },
						"11.11.2020"
					)
				),
				Object(preact_min["h"])(
					"div",
					{ className: "row" },
					Object(preact_min["h"])(
						"div",
						{ className: "label" },
						"Time"
					),
					Object(preact_min["h"])(
						"div",
						{ className: "column" },
						Object(preact_min["h"])(
							"div",
							{ className: "value" },
							"10:10:10"
						),
						Object(preact_min["h"])(
							"div",
							{ className: "value" },
							"UTC\u221207:00 (MT) \u2014 Mountain Time zone"
						),
						Object(preact_min["h"])(
							"div",
							{ className: "value" },
							"(NTP not synced yet)"
						)
					)
				)
			)
		)
	)
);

var SystemLayout_SystemLayout = function SystemLayout() {
	return SystemLayout__ref;
};

/* harmony default export */ var Overview_SystemLayout_SystemLayout = (SystemLayout_SystemLayout);
// CONCATENATED MODULE: ./containers/Overview/OutletOverview.js



var OutletOverview__ref2 = Object(preact_min["h"])(
	"div",
	{ className: "label" },
	" Phase"
);

var OutletOverview__ref3 = Object(preact_min["h"])(
	"div",
	{ className: "label" },
	" Voltage"
);

var OutletOverview__ref4 = Object(preact_min["h"])(
	"div",
	{ className: "label" },
	" Current"
);

var OutletOverview__ref5 = Object(preact_min["h"])(
	"div",
	{ className: "label" },
	" Output"
);

var OutletOverview__ref6 = Object(preact_min["h"])(
	"div",
	{ className: "column labelContainer" },
	Object(preact_min["h"])(
		"div",
		{ className: "label" },
		" State"
	),
	Object(preact_min["h"])(
		"div",
		{ className: "label" },
		" Voltage"
	),
	Object(preact_min["h"])(
		"div",
		{ className: "label" },
		" Current"
	),
	Object(preact_min["h"])(
		"div",
		{ className: "label" },
		" Active power"
	)
);

var OutletOverview_OutletOverview = function OutletOverview(_ref) {
	var outlet = _ref.outlet,
	    index = _ref.index;
	return Object(preact_min["h"])(
		"div",
		{ className: "column outletContainer" },
		Object(preact_min["h"])(
			"div",
			{ className: "row phaseContainer" },
			OutletOverview__ref2,
			Object(preact_min["h"])(
				"div",
				{ className: "row underscore" },
				Object(preact_min["h"])(
					"div",
					{ className: "Box" },
					index + 1
				),
				Object(preact_min["h"])(
					"div",
					{ className: "row labelsBlock" },
					Object(preact_min["h"])(
						"div",
						{ className: "column" },
						OutletOverview__ref3,
						Object(preact_min["h"])(
							"div",
							null,
							outlet.Phases.Voltage
						)
					),
					Object(preact_min["h"])(
						"div",
						{ className: "column" },
						OutletOverview__ref4,
						Object(preact_min["h"])(
							"div",
							null,
							" ",
							outlet.Phases.Current
						)
					)
				)
			)
		),
		Object(preact_min["h"])(
			"div",
			{ className: "row outputContainer" },
			OutletOverview__ref5,
			Object(preact_min["h"])(
				"div",
				{ className: "row" },
				outlet.Outputs.map(function (output, i) {
					return Object(preact_min["h"])(
						"div",
						{ className: "column" },
						Object(preact_min["h"])(
							"div",
							{ className: "icon" },
							Object(preact_min["h"])(assets_output, { alt: "output", className: output.State })
						),
						Object(preact_min["h"])(
							"p",
							null,
							'Output_' + i
						)
					);
				})
			)
		),
		Object(preact_min["h"])(
			"div",
			{ className: "row dataContainer" },
			OutletOverview__ref6,
			Object(preact_min["h"])(
				"div",
				{ className: "row" },
				outlet.Outputs.map(function (output) {
					return Object(preact_min["h"])(
						"div",
						{ className: "column" },
						Object.entries(output).map(function (value) {
							return Object(preact_min["h"])(
								"div",
								{ className: "value " + (value[0] === "State" ? value[1] : "") },
								value[1]
							);
						})
					);
				})
			)
		)
	);
};

/* harmony default export */ var Overview_OutletOverview = (OutletOverview_OutletOverview);
// CONCATENATED MODULE: ./assets/ground.svg




/* harmony default export */ var ground = (function (props) {
    var styles = props.styles;
    var rest = Object.assign({}, props);
    delete rest.styles;

    return Object(preact_min["h"])('svg', Object.assign({"width":"36","height":"36","xmlns":"http://www.w3.org/2000/svg"}, rest), ["\r\n ", Object(preact_min["h"])('undefined', {}, []), "\r\n ", Object(preact_min["h"])('g', {}, ["\r\n  ", Object(preact_min["h"])('title', {}, ["Layer 1"]), "\r\n  ", Object(preact_min["h"])('ellipse', {"ry":"16","rx":"16","id":"svg-ground-UXPEN-J","cy":"18","cx":"18","stroke-opacity":"null","stroke":"#000","fill":"none","class":[styles && styles["color"] || "color"].join(' ')}, []), "\r\n  ", Object(preact_min["h"])('line', {"stroke":"#000","stroke-linecap":"null","stroke-linejoin":"null","id":"svg-ground-3cTLecD","y2":"21.145637","x2":"18.000001","y1":"8.42725","x1":"18.000001","stroke-opacity":"null","fill":"none"}, []), "\r\n  ", Object(preact_min["h"])('line', {"stroke-linecap":"null","stroke-linejoin":"null","id":"svg-ground-24fGYVE","y2":"20.897869","x2":"28.891151","y1":"20.897869","x1":"7.10885","stroke-opacity":"null","stroke":"#000","fill":"none"}, []), "\r\n  ", Object(preact_min["h"])('line', {"stroke-linecap":"null","stroke-linejoin":"null","id":"svg-ground-uYgSmRn","y2":"24.871844","x2":"25.706905","y1":"24.871844","x1":"10.293096","stroke-opacity":"null","stroke":"#000","fill":"none"}, []), "\r\n  ", Object(preact_min["h"])('line', {"stroke-linecap":"null","stroke-linejoin":"null","id":"svg-ground-1KeNQlI","y2":"28.855913","x2":"22.302037","y1":"28.855913","x1":"13.697962","stroke-opacity":"null","stroke":"#000","fill":"none"}, []), "\r\n "]), "\r\n"]);
});;

        
// CONCATENATED MODULE: ./containers/Overview/Overview.js


function Overview__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Overview__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function Overview__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var Overview__ref = Object(preact_min["h"])(
	'div',
	{ className: 'title' },
	'Outlets'
);

var Overview__ref2 = Object(preact_min["h"])(
	'div',
	{ className: 'iconContainer' },
	Object(preact_min["h"])(ground, { className: 'icon' })
);

var Overview__ref3 = Object(preact_min["h"])(Overview_SystemLayout_SystemLayout, null);

var Overview_Overview = function (_Component) {
	Overview__inherits(Overview, _Component);

	function Overview() {
		Overview__classCallCheck(this, Overview);

		return Overview__possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	Overview.prototype.render = function render() {
		return Object(preact_min["h"])(
			'div',
			{ className: 'OverviewWrapper' },
			Overview__ref,
			Object(preact_min["h"])(
				'div',
				{ className: 'table' },
				Object(preact_min["h"])(
					'div',
					{ className: 'grid' },
					mockOutlets.data.map(function (outlet, i) {
						return Object(preact_min["h"])(Overview_OutletOverview, { outlet: outlet, index: i });
					})
				),
				Object(preact_min["h"])(
					'div',
					{ className: 'groundContainer groundActive' },
					' ',
					Overview__ref2
				)
			),
			Overview__ref3
		);
	};

	return Overview;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./containers/Protocols/Tabs/SNMPv2.js



var SNMPv2__ref = Object(preact_min["h"])(
	"div",
	{ className: "snmpWrapper" },
	Object(preact_min["h"])(
		"div",
		{ className: "row head" },
		Object(preact_min["h"])(
			"div",
			{ className: "title" },
			"SNMPv2"
		),
		Object(preact_min["h"])(components_Button_Button, { "class": "light", value: "Download MIB file" })
	),
	Object(preact_min["h"])(
		"div",
		{ className: "column container" },
		Object(preact_min["h"])(
			"div",
			{ className: "column blockGroup" },
			Object(preact_min["h"])(
				"div",
				{ className: "row" },
				Object(preact_min["h"])(
					"div",
					null,
					Object(preact_min["h"])(Switch_Switch, null)
				),
				Object(preact_min["h"])(
					"p",
					{ className: "label" },
					"Enable SNMP Read"
				)
			),
			Object(preact_min["h"])(
				"div",
				{ className: "row" },
				Object(preact_min["h"])(
					"p",
					{ className: "label" },
					"Read community"
				),
				Object(preact_min["h"])(
					"div",
					null,
					Object(preact_min["h"])(components_Input_Input, { "class": "formInput", value: "Public" })
				)
			)
		),
		Object(preact_min["h"])(
			"div",
			{ className: "column blockGroup" },
			Object(preact_min["h"])(
				"div",
				{ className: "row" },
				Object(preact_min["h"])(
					"div",
					null,
					Object(preact_min["h"])(Switch_Switch, null)
				),
				Object(preact_min["h"])(
					"p",
					{ className: "label" },
					"Enable SNMP Write"
				)
			),
			Object(preact_min["h"])(
				"div",
				{ className: "row" },
				Object(preact_min["h"])(
					"p",
					{ className: "label" },
					"Write community"
				),
				Object(preact_min["h"])(
					"div",
					null,
					Object(preact_min["h"])(components_Input_Input, { "class": "formInput", value: "Private" })
				)
			)
		),
		Object(preact_min["h"])(
			"div",
			{ className: "row buttonContainer" },
			Object(preact_min["h"])(components_Button_Button, { "class": "small disabled", type: "button", value: "Save Changes" })
		)
	)
);

var SNMPv2 = function SNMPv2() {
	return SNMPv2__ref;
};

/* harmony default export */ var Tabs_SNMPv2 = (SNMPv2);
// CONCATENATED MODULE: ./containers/Protocols/Tabs/MQTT.js



var MQTT__ref = Object(preact_min["h"])(
	"div",
	{ className: "row head" },
	Object(preact_min["h"])(
		"div",
		{ className: "title" },
		"MQTT"
	)
);

var MQTT__ref2 = Object(preact_min["h"])(
	"div",
	{ className: "row switchContainer" },
	Object(preact_min["h"])(
		"div",
		null,
		Object(preact_min["h"])(Switch_Switch, null)
	),
	Object(preact_min["h"])(
		"p",
		{ className: "label" },
		"Enable MQTT"
	)
);

var MQTT__ref3 = Object(preact_min["h"])(
	"p",
	{ className: "label" },
	"MQTT mode"
);

var MQTT__ref4 = Object(preact_min["h"])(
	"div",
	{ className: "row" },
	Object(preact_min["h"])(
		"p",
		{ className: "label" },
		"Broker Host"
	),
	Object(preact_min["h"])(
		"div",
		null,
		Object(preact_min["h"])(components_Input_Input, { "class": "formInput long", value: "example.com" })
	)
);

var MQTT__ref5 = Object(preact_min["h"])(
	"div",
	{ className: "row" },
	Object(preact_min["h"])(
		"p",
		{ className: "label" },
		"Broker Port "
	),
	Object(preact_min["h"])(
		"div",
		{ className: "alignLeft" },
		Object(preact_min["h"])(components_Input_Input, { "class": "formInput short", value: "1883" })
	)
);

var MQTT__ref6 = Object(preact_min["h"])(
	"div",
	{ className: "row checkboxContainer" },
	Object(preact_min["h"])(
		"div",
		null,
		Object(preact_min["h"])(Checkbox_Checkbox, null)
	),
	Object(preact_min["h"])(
		"p",
		{ className: "label" },
		"Use credentials"
	)
);

var MQTT__ref7 = Object(preact_min["h"])(
	"div",
	{ className: "column inputContainer" },
	Object(preact_min["h"])(
		"div",
		{ className: "row" },
		Object(preact_min["h"])(
			"p",
			{ className: "label" },
			"Username"
		),
		Object(preact_min["h"])(
			"div",
			null,
			Object(preact_min["h"])(components_Input_Input, { "class": "formInput long" })
		)
	),
	Object(preact_min["h"])(
		"div",
		{ className: "row" },
		Object(preact_min["h"])(
			"p",
			{ className: "label" },
			"Password"
		),
		Object(preact_min["h"])(
			"div",
			null,
			Object(preact_min["h"])(components_Input_Input, { "class": "formInput long", type: "password" })
		)
	)
);

var MQTT__ref8 = Object(preact_min["h"])(
	"div",
	{ className: "column checkboxContainer" },
	Object(preact_min["h"])(
		"div",
		{ className: "row" },
		Object(preact_min["h"])(
			"div",
			null,
			Object(preact_min["h"])(Checkbox_Checkbox, null)
		),
		Object(preact_min["h"])(
			"p",
			{ className: "label" },
			"Use SSL"
		)
	),
	Object(preact_min["h"])(
		"div",
		{ className: "row" },
		Object(preact_min["h"])(
			"div",
			null,
			Object(preact_min["h"])(Checkbox_Checkbox, null)
		),
		Object(preact_min["h"])(
			"p",
			{ className: "label" },
			"Validate server's SSL certificate"
		)
	)
);

var MQTT__ref9 = Object(preact_min["h"])(
	"div",
	{ className: "inputContainer" },
	Object(preact_min["h"])(
		"div",
		{ className: "row" },
		Object(preact_min["h"])(
			"p",
			{ className: "label" },
			"Client Id"
		),
		Object(preact_min["h"])(
			"div",
			null,
			Object(preact_min["h"])(components_Input_Input, { "class": "formInput long", value: "Example PDU" })
		)
	)
);

var MQTT__ref10 = Object(preact_min["h"])(
	"div",
	{ className: "row buttonContainer" },
	Object(preact_min["h"])(components_Button_Button, { "class": "small disabled", type: "button", value: "Save Changes" })
);

var MQTT_MQTT = function MQTT() {
	return Object(preact_min["h"])(
		"div",
		{ className: "mqttWrapper" },
		MQTT__ref,
		Object(preact_min["h"])(
			"div",
			{ className: "column container" },
			MQTT__ref2,
			Object(preact_min["h"])(
				"div",
				{ className: "column inputContainer" },
				Object(preact_min["h"])(
					"div",
					{ className: "row" },
					MQTT__ref3,
					Object(preact_min["h"])(
						"div",
						null,
						Object(preact_min["h"])(components_Select_Select, { "class": "select long", options: ['Generic', 'MS Azure'] })
					)
				),
				MQTT__ref4,
				MQTT__ref5
			),
			MQTT__ref6,
			MQTT__ref7,
			MQTT__ref8,
			MQTT__ref9,
			MQTT__ref10
		)
	);
};

/* harmony default export */ var Tabs_MQTT = (MQTT_MQTT);
// CONCATENATED MODULE: ./containers/Protocols/Tabs/REST.js


var REST__ref = Object(preact_min["h"])(
	"div",
	{ className: "FormWrapper" },
	Object(preact_min["h"])(
		"div",
		{ className: "title" },
		"Rest"
	)
);

var Rest = function Rest() {
	return REST__ref;
};

/* harmony default export */ var REST = (Rest);
// CONCATENATED MODULE: ./containers/Protocols/Tabs/index.js



// EXTERNAL MODULE: ../node_modules/preact-router/match.js
var preact_router_match = __webpack_require__("sw5u");
var match_default = /*#__PURE__*/__webpack_require__.n(preact_router_match);

// CONCATENATED MODULE: ./containers/Protocols/Protocols.js
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



function Protocols__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Protocols__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function Protocols__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var Protocols__ref = Object(preact_min["h"])(Tabs_SNMPv2, null);

var Protocols__ref2 = Object(preact_min["h"])(Tabs_MQTT, null);

var Protocols__ref3 = Object(preact_min["h"])(REST, null);

var Protocols__ref5 = Object(preact_min["h"])(
	'div',
	{ className: 'title' },
	'API Protocols'
);

var Protocols_Protocols = function (_Component) {
	Protocols__inherits(Protocols, _Component);

	function Protocols() {
		var _temp, _this, _ret;

		Protocols__classCallCheck(this, Protocols);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = Protocols__possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.subRoutes = {
			SNMPv2: 'SNMPv2',
			MQTT: 'MQTT',
			REST: 'REST'
		}, _this.subComponents = {
			SNMPv2: Protocols__ref,
			MQTT: Protocols__ref2,
			REST: Protocols__ref3
		}, _temp), Protocols__possibleConstructorReturn(_this, _ret);
	}

	Protocols.prototype.render = function render(_ref4) {
		var page = _ref4.page;


		return Object(preact_min["h"])(
			'div',
			{ className: 'ProtocolsWrapper' },
			Object(preact_min["h"])(
				'div',
				{ className: 'panel' },
				Protocols__ref5,
				Object(preact_min["h"])(
					'div',
					{ className: 'nav' },
					Object(preact_min["h"])(
						preact_router_match["Link"],
						{ href: '/protocols/' + this.subRoutes.SNMPv2, activeClassName: 'is-active', className: 'tab' },
						'SNMPv2'
					),
					Object(preact_min["h"])(
						preact_router_match["Link"],
						{ href: '/protocols/' + this.subRoutes.MQTT, activeClassName: 'is-active', className: 'tab' },
						'MQTT'
					),
					Object(preact_min["h"])(
						preact_router_match["Link"],
						{ href: '/protocols/' + this.subRoutes.REST, activeClassName: 'is-active', className: 'tab' },
						'REST'
					)
				)
			),
			this.component
		);
	};

	_createClass(Protocols, [{
		key: 'component',
		get: function get() {
			var page = this.props.page;

			return page && page !== ':page' ? this.subComponents[page] : this.subComponents.SNMPv2;
		}
	}]);

	return Protocols;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./containers/Settings/Tabs/NetworkConfig.js



var NetworkConfig__ref = Object(preact_min["h"])(
	"div",
	{ className: "NetworkWrapper" },
	Object(preact_min["h"])(
		"div",
		{ className: "title" },
		"Network Configuration"
	),
	Object(preact_min["h"])(
		"div",
		{ className: "column container" },
		Object(preact_min["h"])(
			"div",
			{ className: "column form" },
			Object(preact_min["h"])(
				"div",
				{ className: "inputContainer" },
				Object(preact_min["h"])(
					"div",
					{ className: "row" },
					Object(preact_min["h"])(
						"p",
						{ className: "label" },
						"MAC address"
					),
					Object(preact_min["h"])(
						"div",
						{ className: "value" },
						"24:A4:2C:39:2E:D4"
					)
				),
				Object(preact_min["h"])(
					"div",
					{ className: "row" },
					Object(preact_min["h"])(
						"p",
						{ className: "label" },
						"Hostname"
					),
					Object(preact_min["h"])(
						"div",
						null,
						Object(preact_min["h"])(components_Input_Input, { "class": "formInput long", value: "My PDU v0.01" })
					)
				)
			),
			Object(preact_min["h"])(
				"div",
				{ className: "column radioContainer" },
				Object(preact_min["h"])(
					"div",
					{ className: "row" },
					Object(preact_min["h"])(
						"p",
						null,
						Object(preact_min["h"])(components_RadioButton_RadioButton, { label: "Use DHCP", name: "adresses" })
					)
				),
				Object(preact_min["h"])(
					"div",
					{ className: "row" },
					Object(preact_min["h"])(
						"p",
						null,
						Object(preact_min["h"])(components_RadioButton_RadioButton, { label: "Set static IP address", name: "adresses" })
					)
				)
			),
			Object(preact_min["h"])(
				"div",
				{ className: "inputContainer nested" },
				Object(preact_min["h"])(
					"div",
					{ className: "row" },
					Object(preact_min["h"])(
						"p",
						{ className: "label" },
						"IP address"
					),
					Object(preact_min["h"])(
						"div",
						null,
						Object(preact_min["h"])(components_Input_Input, { "class": "formInput long", value: "31.7.241.131" })
					)
				),
				Object(preact_min["h"])(
					"div",
					{ className: "row" },
					Object(preact_min["h"])(
						"p",
						{ className: "label" },
						"Net mask"
					),
					Object(preact_min["h"])(
						"div",
						null,
						Object(preact_min["h"])(components_Input_Input, { "class": "formInput long", value: "255.255.255.240" })
					)
				),
				Object(preact_min["h"])(
					"div",
					{ className: "row" },
					Object(preact_min["h"])(
						"p",
						{ className: "label" },
						"Default gateway"
					),
					Object(preact_min["h"])(
						"div",
						null,
						Object(preact_min["h"])(components_Input_Input, { "class": "formInput long", value: "31.7.241.129" })
					)
				),
				Object(preact_min["h"])(
					"div",
					{ className: "row" },
					Object(preact_min["h"])(
						"p",
						{ className: "label" },
						"DNS server"
					),
					Object(preact_min["h"])(
						"div",
						null,
						Object(preact_min["h"])(components_Input_Input, { "class": "formInput long", value: "8.8.8.8" })
					)
				)
			),
			Object(preact_min["h"])(
				"div",
				{ className: "row buttonContainer" },
				Object(preact_min["h"])(
					"div",
					null,
					Object(preact_min["h"])(components_Button_Button, { "class": "small light", value: "Save Changes" })
				)
			)
		),
		Object(preact_min["h"])(
			"div",
			{ className: "column footer" },
			Object(preact_min["h"])(
				"div",
				{ className: "row" },
				Object(preact_min["h"])(
					"div",
					null,
					Object(preact_min["h"])(components_Button_Button, { "class": "light", value: "locale" })
				),
				Object(preact_min["h"])(
					"div",
					{ className: "label" },
					"Blink with status LEDs for 1 minute."
				)
			),
			Object(preact_min["h"])(
				"div",
				{ className: "row warning" },
				Object(preact_min["h"])(
					"p",
					null,
					Object(preact_min["h"])(
						"b",
						null,
						"Warning"
					),
					": Changes to network settings may result in PowerPDU 4C becoming unavailable at the current address. See the PowerPDU 4C User Manual for ways to find the PowerPDU 4C at its new address."
				)
			)
		)
	)
);

function NetworkConfig() {
	return NetworkConfig__ref;
}

/* harmony default export */ var Tabs_NetworkConfig = (NetworkConfig);
// CONCATENATED MODULE: ./containers/Settings/Tabs/Date.js



var Date__ref = Object(preact_min["h"])(
	"div",
	{ className: "title" },
	"Date/Time"
);

var Date__ref2 = Object(preact_min["h"])(
	"div",
	{ className: "row" },
	Object(preact_min["h"])(
		"p",
		{ className: "label" },
		"NTP server address"
	),
	Object(preact_min["h"])(
		"div",
		null,
		Object(preact_min["h"])(components_Input_Input, { "class": "formInput long", value: "pool.ntp.org" })
	)
);

var Date__ref3 = Object(preact_min["h"])(
	"p",
	{ className: "label" },
	"Timezone"
);

var Date__ref4 = Object(preact_min["h"])(
	"div",
	{ className: "row buttonContainer" },
	Object(preact_min["h"])(components_Button_Button, { "class": "light small", value: "Save Changes" })
);

function Date_Date() {
	return Object(preact_min["h"])(
		"div",
		{ className: "DateWrapper" },
		Date__ref,
		Object(preact_min["h"])(
			"div",
			{ className: "column container" },
			Object(preact_min["h"])(
				"div",
				{ className: "inputGroup" },
				Date__ref2,
				Object(preact_min["h"])(
					"div",
					{ className: "row" },
					Date__ref3,
					Object(preact_min["h"])(
						"div",
						null,
						Object(preact_min["h"])(components_Select_Select, { "class": "long", options: ['UTC-07:00 (MT) - Mountain Time zone'] })
					)
				)
			),
			Date__ref4
		)
	);
}

/* harmony default export */ var Tabs_Date = (Date_Date);
// CONCATENATED MODULE: ./containers/Settings/Tabs/Firmware.js



var Firmware__ref = Object(preact_min["h"])(
	"div",
	{ className: "FirmwareWrapper" },
	Object(preact_min["h"])(
		"div",
		{ className: "title" },
		"Firmware"
	),
	Object(preact_min["h"])(
		"div",
		{ className: "column container" },
		Object(preact_min["h"])(
			"div",
			{ className: "row" },
			Object(preact_min["h"])(
				"p",
				{ className: "label" },
				"Firmware version"
			),
			Object(preact_min["h"])(
				"div",
				{ className: "value" },
				"PDUSOFT9"
			)
		),
		Object(preact_min["h"])(
			"div",
			{ className: "row" },
			Object(preact_min["h"])(
				"div",
				{ className: "label" },
				Object(preact_min["h"])(
					"p",
					null,
					"Firmware package"
				)
			),
			Object(preact_min["h"])(
				"div",
				{ className: "value Dropzone" },
				Object(preact_min["h"])(Dropzone_Dropzone, null)
			)
		),
		Object(preact_min["h"])(
			"div",
			{ className: "row buttonContainer" },
			Object(preact_min["h"])(components_Button_Button, { "class": "light small", value: "Install Firmware" })
		)
	)
);

function Firmware() {
	return Firmware__ref;
}

/* harmony default export */ var Tabs_Firmware = (Firmware);
// CONCATENATED MODULE: ./containers/Settings/Tabs/index.js



// CONCATENATED MODULE: ./containers/Settings/Settings.js
var Settings__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



function Settings__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Settings__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function Settings__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var Settings__ref = Object(preact_min["h"])(Tabs_NetworkConfig, null);

var Settings__ref2 = Object(preact_min["h"])(Tabs_Date, null);

var Settings__ref3 = Object(preact_min["h"])(Tabs_Firmware, null);

var Settings__ref5 = Object(preact_min["h"])(
	'div',
	{ className: 'title' },
	'Settings'
);

var Settings_Settings = function (_Component) {
	Settings__inherits(Settings, _Component);

	function Settings() {
		var _temp, _this, _ret;

		Settings__classCallCheck(this, Settings);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = Settings__possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.subRoutes = {
			Network: 'Network',
			Date: 'Date',
			Firmware: 'Firmware'
		}, _this.subComponents = {
			Network: Settings__ref,
			Date: Settings__ref2,
			Firmware: Settings__ref3
		}, _temp), Settings__possibleConstructorReturn(_this, _ret);
	}

	Settings.prototype.render = function render(_ref4) {
		var page = _ref4.page;


		return Object(preact_min["h"])(
			'div',
			{ className: 'SettingsWrapper' },
			Object(preact_min["h"])(
				'div',
				{ className: 'panel' },
				Settings__ref5,
				Object(preact_min["h"])(
					'div',
					{ className: 'nav' },
					Object(preact_min["h"])(
						preact_router_match["Link"],
						{ href: '/settings/' + this.subRoutes.Network, activeClassName: 'is-active', className: 'tab' },
						'Network Configuration'
					),
					Object(preact_min["h"])(
						preact_router_match["Link"],
						{ href: '/settings/' + this.subRoutes.Date, activeClassName: 'is-active', className: 'tab' },
						'Date/Time'
					),
					Object(preact_min["h"])(
						preact_router_match["Link"],
						{ href: '/settings/' + this.subRoutes.Firmware, activeClassName: 'is-active', className: 'tab' },
						'Firmware'
					)
				)
			),
			this.component
		);
	};

	Settings__createClass(Settings, [{
		key: 'component',
		get: function get() {
			var page = this.props.page;

			return page && page !== ':page' ? this.subComponents[page] : this.subComponents.Network;
		}
	}]);

	return Settings;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./assets/round-close.svg




/* harmony default export */ var round_close = (function (props) {
    var styles = props.styles;
    var rest = Object.assign({}, props);
    delete rest.styles;

    return Object(preact_min["h"])('svg', Object.assign({"xmlns":"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","width":"24","height":"24","preserveAspectRatio":"xMidYMid meet","viewBox":"0 0 24 24","style":"-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);"}, rest), ["\r\n\t", Object(preact_min["h"])('path', {"d":"M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z","fill":"#bfc4c6"}, []), "\r\n\t", Object(preact_min["h"])('rect', {"x":"0","y":"0","width":"24","height":"24","fill":"rgba(0, 0, 0, 0)"}, []), "\r\n"]);
});;

        
// CONCATENATED MODULE: ./assets/baseline-arrow-back.svg




/* harmony default export */ var baseline_arrow_back = (function (props) {
    var styles = props.styles;
    var rest = Object.assign({}, props);
    delete rest.styles;

    return Object(preact_min["h"])('svg', Object.assign({"xmlns":"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","width":"24","height":"24","preserveAspectRatio":"xMidYMid meet","viewBox":"0 0 24 24","style":"-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);"}, rest), ["\r\n\t", Object(preact_min["h"])('path', {"d":"M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20v-2z","fill":"#626262"}, []), "\r\n\t", Object(preact_min["h"])('rect', {"x":"0","y":"0","width":"24","height":"24","fill":"rgba(0, 0, 0, 0)"}, []), "\r\n"]);
});;

        
// CONCATENATED MODULE: ./containers/Users/Admin.js




var Admin__ref2 = Object(preact_min["h"])(
	"div",
	{ className: "title" },
	"User Settings"
);

var Admin__ref3 = Object(preact_min["h"])(
	"div",
	{ className: "column container" },
	Object(preact_min["h"])(
		"div",
		{ className: "inputContainer" },
		Object(preact_min["h"])(
			"div",
			{ className: "row" },
			Object(preact_min["h"])(
				"div",
				{ className: "label" },
				Object(preact_min["h"])(
					"p",
					null,
					"Username"
				)
			),
			Object(preact_min["h"])(
				"div",
				null,
				Object(preact_min["h"])(components_Input_Input, { "class": "formInput middle", value: "Admin" })
			)
		),
		Object(preact_min["h"])(
			"div",
			{ className: "row" },
			Object(preact_min["h"])(
				"div",
				{ className: "label" },
				Object(preact_min["h"])(
					"p",
					null,
					"Password"
				)
			),
			Object(preact_min["h"])(
				"div",
				null,
				Object(preact_min["h"])(components_Input_Input, { "class": "formInput middle" })
			)
		),
		Object(preact_min["h"])(
			"div",
			{ className: "row" },
			Object(preact_min["h"])(
				"div",
				{ className: "label" },
				Object(preact_min["h"])(
					"p",
					null,
					"Confirm Password"
				)
			),
			Object(preact_min["h"])(
				"div",
				null,
				Object(preact_min["h"])(components_Input_Input, { "class": " formInput middle" })
			)
		)
	),
	Object(preact_min["h"])(
		"div",
		{ className: "switchContainer" },
		Object(preact_min["h"])(
			"div",
			{ className: "row" },
			Object(preact_min["h"])(
				"div",
				null,
				Object(preact_min["h"])(Switch_Switch, null)
			),
			Object(preact_min["h"])(
				"div",
				{ className: "label" },
				Object(preact_min["h"])(
					"p",
					null,
					"Outlets configuration"
				)
			)
		),
		Object(preact_min["h"])(
			"div",
			{ className: "row" },
			Object(preact_min["h"])(
				"div",
				null,
				Object(preact_min["h"])(Switch_Switch, null)
			),
			Object(preact_min["h"])(
				"div",
				{ className: "label" },
				Object(preact_min["h"])(
					"p",
					null,
					"API configuration"
				)
			)
		),
		Object(preact_min["h"])(
			"div",
			{ className: "row" },
			Object(preact_min["h"])(
				"div",
				null,
				Object(preact_min["h"])(Switch_Switch, null)
			),
			Object(preact_min["h"])(
				"div",
				{ className: "label" },
				Object(preact_min["h"])(
					"p",
					null,
					"Manage users"
				)
			)
		),
		Object(preact_min["h"])(
			"div",
			{ className: "row" },
			Object(preact_min["h"])(
				"div",
				null,
				Object(preact_min["h"])(Switch_Switch, null)
			),
			Object(preact_min["h"])(
				"div",
				{ className: "label" },
				Object(preact_min["h"])(
					"p",
					null,
					"Settings management"
				)
			)
		)
	),
	Object(preact_min["h"])(
		"div",
		{ className: "row buttonContainer" },
		Object(preact_min["h"])(
			"div",
			null,
			Object(preact_min["h"])(components_Button_Button, { "class": "small disabled", value: "Save Changes" })
		)
	)
);

var Admin_Admin = function Admin(_ref) {
	var turnBack = _ref.turnBack;

	return Object(preact_min["h"])(
		"div",
		{ className: "AdminWrapper" },
		Object(preact_min["h"])(
			"div",
			{ className: "row head" },
			Object(preact_min["h"])(baseline_arrow_back, { onClick: turnBack, className: "icon" }),
			Admin__ref2
		),
		Admin__ref3
	);
};

/* harmony default export */ var Users_Admin = (Admin_Admin);
// CONCATENATED MODULE: ./containers/Users/Users.js
var Users__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



function Users__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Users__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function Users__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var Users__ref2 = Object(preact_min["h"])(
	'div',
	{ className: 'title' },
	'Users'
);

var Users__ref3 = Object(preact_min["h"])(
	preact_router_match["Link"],
	{ activeClassName: 'is-active', className: 'tab' },
	'Guest',
	Object(preact_min["h"])(round_close, { className: 'crossIcon' })
);

var Users__ref4 = Object(preact_min["h"])(
	'div',
	{ className: 'tabBtn' },
	Object(preact_min["h"])(components_Button_Button, { 'class': 'middle disabled', value: 'Create user' })
);

var Users_Users = function (_Component) {
	Users__inherits(Users, _Component);

	function Users() {
		var _temp, _this, _ret;

		Users__classCallCheck(this, Users);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = Users__possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.componentRef = Object(preact_min["createRef"])(), _this.panelRef = Object(preact_min["createRef"])(), _this.toggleMobilePanel = function () {
			_this.panelRef.current.classList.toggle('is-hidden');
			_this.componentRef.current.classList.toggle('is-hidden');
		}, _this.subRoutes = {
			Admin: 'Admin'
		}, _this.subComponents = {
			Admin: Object(preact_min["h"])(Users_Admin, { turnBack: _this.toggleMobilePanel })
		}, _temp), Users__possibleConstructorReturn(_this, _ret);
	}

	Users.prototype.componentDidMount = function componentDidMount() {
		if (this.props.isItMobile) {
			this.componentRef.current.classList.toggle('is-hidden');
		}
	};

	Users.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
		if (this.props.isItMobile && this.props.page !== ":page") {
			this.toggleMobilePanel();
		}
	};

	Users.prototype.render = function render(_ref) {
		var page = _ref.page;


		return Object(preact_min["h"])(
			'div',
			{ className: 'UsersWrapper' },
			Object(preact_min["h"])(
				'div',
				{ ref: this.panelRef, className: 'panel' },
				Users__ref2,
				Object(preact_min["h"])(
					'div',
					{ className: 'nav' },
					Object(preact_min["h"])(
						preact_router_match["Link"],
						{ href: '/users/' + this.subRoutes.Admin, activeClassName: 'is-active', className: 'tab' },
						'Admin'
					),
					Users__ref3,
					Users__ref4
				)
			),
			Object(preact_min["h"])(
				'div',
				{ ref: this.componentRef, className: 'component' },
				'  ',
				this.component,
				' '
			)
		);
	};

	Users__createClass(Users, [{
		key: 'component',
		get: function get() {
			var _props = this.props,
			    page = _props.page,
			    isItMobile = _props.isItMobile;
			//If we have a page and this is exact path so we render this path, otherwise if its desktop (only) we render Admin as default path

			return page && page !== ':page' ? this.subComponents[page] : !isItMobile && this.subComponents.Admin;
		}
	}]);

	return Users;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./containers/Auth/Auth.js



var Auth__ref = Object(preact_min["h"])(
	"div",
	{ className: "AuthWrapper" },
	Object(preact_min["h"])(
		"form",
		{ className: "loginForm" },
		Object(preact_min["h"])(
			"div",
			{ className: "column" },
			Object(preact_min["h"])(
				"div",
				{ className: "logoContainer" },
				Object(preact_min["h"])("img", { src: "../../assets/logoBlack.png", className: "logo", alt: "logo" })
			),
			Object(preact_min["h"])(
				"div",
				{ className: "fields" },
				Object(preact_min["h"])(
					"p",
					{ className: "title" },
					"Login Now"
				),
				Object(preact_min["h"])(components_Input_Input, { "class": "authInput long", placeholder: "User Name", type: "text" }),
				Object(preact_min["h"])(components_Input_Input, { "class": "authInput long", placeholder: "Password", type: "password" }),
				Object(preact_min["h"])(components_Button_Button, { "class": "button small", type: "submit", value: "Login" })
			)
		)
	)
);

function Auth(props) {
	return Auth__ref;
}
// CONCATENATED MODULE: ./assets/bx-log-out-circle.svg




/* harmony default export */ var bx_log_out_circle = (function (props) {
    var styles = props.styles;
    var rest = Object.assign({}, props);
    delete rest.styles;

    return Object(preact_min["h"])('svg', Object.assign({"xmlns":"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","width":"24","height":"24","preserveAspectRatio":"xMidYMid meet","viewBox":"0 0 24 24","style":"-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);"}, rest), ["\r\n\t", Object(preact_min["h"])('path', {"d":"M2 12l5 4v-3h9v-2H7V8z","class":[styles && styles["color"] || "color"].join(' '),"fill":"#fff"}, []), "\r\n\t", Object(preact_min["h"])('path', {"d":"M13.001 2.999a8.938 8.938 0 0 0-6.364 2.637L8.051 7.05c1.322-1.322 3.08-2.051 4.95-2.051s3.628.729 4.95 2.051s2.051 3.08 2.051 4.95s-.729 3.628-2.051 4.95s-3.08 2.051-4.95 2.051s-3.628-.729-4.95-2.051l-1.414 1.414c1.699 1.7 3.959 2.637 6.364 2.637s4.665-.937 6.364-2.637c1.7-1.699 2.637-3.959 2.637-6.364s-.937-4.665-2.637-6.364a8.938 8.938 0 0 0-6.364-2.637z","class":[styles && styles["color"] || "color"].join(' '),"fill":"#fff"}, []), "\r\n\t", Object(preact_min["h"])('rect', {"x":"0","y":"0","width":"24","height":"24","fill":"rgba(0, 0, 0, 0)"}, []), "\r\n"]);
});;

        
// CONCATENATED MODULE: ./containers/Profile/Profile.js






var Profile__ref = Object(preact_min["h"])(
	"div",
	{ className: "title" },
	"Profile Settings"
);

var Profile__ref2 = Object(preact_min["h"])(
	"div",
	{ className: "iconContainer" },
	Object(preact_min["h"])(bx_log_out_circle, { className: "icon" })
);

var Profile__ref3 = Object(preact_min["h"])(
	"p",
	{ className: "label" },
	" Sign Out"
);

var Profile__ref4 = Object(preact_min["h"])(
	"div",
	{ className: "column container" },
	Object(preact_min["h"])(
		"div",
		{ className: "inputContainer" },
		Object(preact_min["h"])(
			"div",
			{ className: "row" },
			Object(preact_min["h"])(
				"div",
				{ className: "label" },
				Object(preact_min["h"])(
					"p",
					null,
					"Username"
				)
			),
			Object(preact_min["h"])(
				"div",
				null,
				Object(preact_min["h"])(components_Input_Input, { "class": "formInput middle" })
			)
		)
	),
	Object(preact_min["h"])(
		"div",
		{ className: "row label" },
		Object(preact_min["h"])(
			"p",
			null,
			"Change password"
		)
	),
	Object(preact_min["h"])(
		"div",
		{ className: "inputContainer" },
		Object(preact_min["h"])(
			"div",
			{ className: "row" },
			Object(preact_min["h"])(
				"div",
				{ className: "label" },
				Object(preact_min["h"])(
					"p",
					null,
					"New password"
				)
			),
			Object(preact_min["h"])(
				"div",
				null,
				Object(preact_min["h"])(components_Input_Input, { "class": "formInput middle" })
			)
		),
		Object(preact_min["h"])(
			"div",
			{ className: "row" },
			Object(preact_min["h"])(
				"div",
				{ className: "label" },
				Object(preact_min["h"])(
					"p",
					null,
					"Confirm password"
				)
			),
			Object(preact_min["h"])(
				"div",
				null,
				Object(preact_min["h"])(components_Input_Input, { "class": "formInput middle" })
			)
		)
	),
	Object(preact_min["h"])(
		"div",
		{ className: "row buttonContainer" },
		Object(preact_min["h"])(
			"div",
			null,
			Object(preact_min["h"])(components_Button_Button, { "class": "small disabled", value: "Save Changes" })
		)
	)
);

var Profile_Profile = function Profile() {
	return Object(preact_min["h"])(
		"div",
		{ className: "profileWrapper" },
		Object(preact_min["h"])(
			"div",
			{ className: "row head" },
			Profile__ref,
			Object(preact_min["h"])(
				"div",
				{ className: "signOut" },
				Object(preact_min["h"])(
					preact_router_match["Link"],
					{ className: "row route", href: Routes.LOGIN },
					Profile__ref2,
					Profile__ref3
				)
			)
		),
		Profile__ref4
	);
};

/* harmony default export */ var containers_Profile_Profile = (Profile_Profile);
// CONCATENATED MODULE: ./containers/Languages/Languages.js



var Languages__ref2 = Object(preact_min["h"])(
	"div",
	{ className: "row head" },
	Object(preact_min["h"])(
		"div",
		{ className: "title" },
		"Languages"
	)
);

var Languages__ref3 = Object(preact_min["h"])(
	"div",
	{ className: "row buttonContainer" },
	Object(preact_min["h"])(components_Button_Button, { "class": "small disabled", type: "button", value: "Save Changes" })
);

var Languages_Languages = function Languages(_ref) {
	var languages = _ref.languages;
	return Object(preact_min["h"])(
		"div",
		{ className: "langWrapper" },
		Languages__ref2,
		Object(preact_min["h"])(
			"div",
			{ className: "column container" },
			Object(preact_min["h"])(
				"div",
				{ className: "column radioContainer" },
				languages.map(function (lang) {
					return Object(preact_min["h"])(
						"div",
						{ className: "row" },
						Object(preact_min["h"])(components_RadioButton_RadioButton, { label: lang, name: "language" })
					);
				})
			),
			Languages__ref3
		)
	);
};

/* harmony default export */ var containers_Languages_Languages = (Languages_Languages);
// CONCATENATED MODULE: ./assets/round-menu.svg




/* harmony default export */ var round_menu = (function (props) {
    var styles = props.styles;
    var rest = Object.assign({}, props);
    delete rest.styles;

    return Object(preact_min["h"])('svg', Object.assign({"xmlns":"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","width":"24","height":"24","preserveAspectRatio":"xMidYMid meet","viewBox":"0 0 24 24","style":"-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);"}, rest), ["\r\n\t", Object(preact_min["h"])('path', {"d":"M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z","fill":"#bfc4c6"}, []), "\r\n\t", Object(preact_min["h"])('rect', {"x":"0","y":"0","width":"24","height":"24","fill":"rgba(0, 0, 0, 0)"}, []), "\r\n"]);
});;

        
// CONCATENATED MODULE: ./assets/outline-account-circle.svg




/* harmony default export */ var outline_account_circle = (function (props) {
    var styles = props.styles;
    var rest = Object.assign({}, props);
    delete rest.styles;

    return Object(preact_min["h"])('svg', Object.assign({"xmlns":"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","width":"24","height":"24","preserveAspectRatio":"xMidYMid meet","viewBox":"0 0 24 24","style":"-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);"}, rest), ["\r\n\t", Object(preact_min["h"])('path', {"d":"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33A7.95 7.95 0 0 1 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z","fill":"#fff","class":[styles && styles["color"] || "color"].join(' ')}, []), "\r\n\t", Object(preact_min["h"])('rect', {"x":"0","y":"0","width":"24","height":"24","fill":"rgba(0, 0, 0, 0)"}, []), "\r\n"]);
});;

        
// CONCATENATED MODULE: ./containers/Header/Header.js










var Header__ref2 = Object(preact_min["h"])(round_close, { className: 'icon' });

var Header__ref3 = Object(preact_min["h"])(round_menu, { className: 'icon' });

var Header__ref4 = Object(preact_min["h"])(
	'div',
	{ className: 'logoContainer' },
	Object(preact_min["h"])('img', { src: '../../assets/logo.png', className: 'logo', alt: 'logo' })
);

var Header__ref5 = Object(preact_min["h"])(
	'div',
	{ className: 'iconContainer' },
	Object(preact_min["h"])(outline_account_circle, { className: 'icon' })
);

var Header__ref6 = Object(preact_min["h"])(
	'p',
	{ className: 'label' },
	' UserName '
);

var Header__ref7 = Object(preact_min["h"])(
	'div',
	{ className: 'iconContainer' },
	Object(preact_min["h"])(bx_log_out_circle, { className: 'icon' })
);

var Header__ref8 = Object(preact_min["h"])(
	'p',
	{ className: 'label' },
	' Sign Out'
);

var Header__ref9 = Object(preact_min["h"])(outline_account_circle, { className: 'icon' });

var Header_Header = function Header(_ref) {
	var isSidebarOpened = _ref.isSidebarOpened,
	    isUserMenuOpened = _ref.isUserMenuOpened,
	    toggleSidebar = _ref.toggleSidebar,
	    toggleUserProfile = _ref.toggleUserProfile,
	    languages = _ref.languages;
	return Object(preact_min["h"])(
		'div',
		{ className: 'header' },
		Object(preact_min["h"])(
			'div',
			{ className: "hamburger iconContainer " + (isSidebarOpened ? "cross" : ""), onClick: toggleSidebar },
			isSidebarOpened ? Header__ref2 : Header__ref3
		),
		Header__ref4,
		Object(preact_min["h"])(
			'div',
			{ className: 'userMenu' },
			Object(preact_min["h"])(
				'div',
				{ className: 'element' },
				Object(preact_min["h"])(components_Dropdown_Dropdown, {
					iconUrl: '../../assets/earth-outline.svg',
					list: languages })
			),
			Object(preact_min["h"])(
				preact_router_match["Link"],
				{ className: 'element', href: Routes.PROFILE },
				Header__ref5,
				Header__ref6
			),
			Object(preact_min["h"])(
				preact_router_match["Link"],
				{ className: 'element', href: Routes.LOGIN },
				Header__ref7,
				Header__ref8
			)
		),
		Object(preact_min["h"])(
			'div',
			{ className: "hamburger iconContainer " + (isUserMenuOpened ? "cross" : ""), name: 'user_menu' },
			isUserMenuOpened ? Object(preact_min["h"])(round_close, { onClick: toggleUserProfile, className: 'icon' }) : Object(preact_min["h"])(
				preact_router_match["Link"],
				{ onClick: toggleUserProfile, href: Routes.PROFILE },
				Header__ref9
			)
		)
	);
};

/* harmony default export */ var containers_Header_Header = (Header_Header);
// CONCATENATED MODULE: ./assets/earth-outline.svg




/* harmony default export */ var earth_outline = (function (props) {
    var styles = props.styles;
    var rest = Object.assign({}, props);
    delete rest.styles;

    return Object(preact_min["h"])('svg', Object.assign({"xmlns":"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","width":"512","height":"512","preserveAspectRatio":"xMidYMid meet","viewBox":"0 0 512 512","style":"-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);"}, rest), ["\r\n\t", Object(preact_min["h"])('path', {"d":"M464 256c0-114.87-93.13-208-208-208S48 141.13 48 256s93.13 208 208 208s208-93.13 208-208z","fill":"none","class":[styles && styles["outline"] || "outline"].join(' '),"stroke":"#fff","stroke-miterlimit":"10","stroke-width":"32"}, []), "\r\n\t", Object(preact_min["h"])('path', {"d":"M445.57 172.14c-16.06.1-14.48 29.73-34.49 15.75c-7.43-5.18-12-12.71-21.33-15c-8.15-2-16.5.08-24.55 1.47c-9.15 1.58-20 2.29-26.94 9.22c-6.71 6.67-10.26 15.62-17.4 22.33c-13.81 13-19.64 27.19-10.7 45.57c8.6 17.67 26.59 27.26 46 26c19.07-1.27 38.88-12.33 38.33 15.38c-.2 9.8 1.85 16.6 4.86 25.71c2.79 8.4 2.6 16.54 3.24 25.21c1.18 16.2 4.16 34.36 12.2 48.67l15-21.16c1.85-2.62 5.72-6.29 6.64-9.38c1.63-5.47-1.58-14.87-1.95-21s-.19-12.34-1.13-18.47c-1.32-8.59-6.4-16.64-7.1-25.13c-1.29-15.81 1.6-28.43-10.58-41.65c-11.76-12.75-29-15.81-45.47-13.22c-8.3 1.3-41.71 6.64-28.3-12.33c2.65-3.73 7.28-6.79 10.26-10.34c2.59-3.09 4.84-8.77 7.88-11.18s17-5.18 21-3.95s8.17 7 11.64 9.56a49.89 49.89 0 0 0 21.81 9.36c13.66 2 42.22-5.94 42-23.46c-.04-8.4-7.84-20.1-10.92-27.96z","fill":"#fff","class":[styles && styles["color"] || "color"].join(' ')}, []), "\r\n\t", Object(preact_min["h"])('path', {"d":"M287.45 316.3c-5.33-22.44-35.82-29.94-52.26-42.11c-9.45-7-17.86-17.81-30.27-18.69c-5.72-.41-10.51.83-16.18-.64c-5.2-1.34-9.28-4.14-14.82-3.41c-10.35 1.36-16.88 12.42-28 10.92c-10.55-1.42-21.42-13.76-23.82-23.81c-3.08-12.92 7.14-17.11 18.09-18.26c4.57-.48 9.7-1 14.09.67c5.78 2.15 8.51 7.81 13.7 10.67c9.73 5.33 11.7-3.19 10.21-11.83c-2.23-12.94-4.83-18.22 6.71-27.12c8-6.14 14.84-10.58 13.56-21.61c-.76-6.48-4.31-9.41-1-15.86c2.51-4.91 9.4-9.34 13.89-12.27c11.59-7.56 49.65-7 34.1-28.16c-4.57-6.21-13-17.31-21-18.83c-10-1.89-14.44 9.27-21.41 14.19c-7.2 5.09-21.22 10.87-28.43 3c-9.7-10.59 6.43-14.07 10-21.46s-8.27-21.36-14.61-24.9l-29.81 33.43a41.52 41.52 0 0 0 8.34 31.86c5.93 7.63 15.37 10.08 15.8 20.5c.42 10-1.14 15.12-7.68 22.15c-2.83 3-4.83 7.26-7.71 10.07c-3.53 3.43-2.22 2.38-7.73 3.32c-10.36 1.75-19.18 4.45-29.19 7.21C95.34 199.94 93.8 172.69 86.2 162l-25 20.19c-.27 3.31 4.1 9.4 5.29 13c6.83 20.57 20.61 36.48 29.51 56.16c9.37 20.84 34.53 15.06 45.64 33.32c9.86 16.2-.67 36.71 6.71 53.67c5.36 12.31 18 15 26.72 24c8.91 9.09 8.72 21.53 10.08 33.36a305.22 305.22 0 0 0 7.45 41.28c1.21 4.69 2.32 10.89 5.53 14.76c2.2 2.66 9.75 4.95 6.7 5.83c4.26.7 11.85 4.68 15.4 1.76c4.68-3.84 3.43-15.66 4.24-21c2.43-15.9 10.39-31.45 21.13-43.35c10.61-11.74 25.15-19.69 34.11-33c8.73-12.98 11.36-30.49 7.74-45.68zm-33.39 26.32c-6 10.71-19.36 17.88-27.95 26.39c-2.33 2.31-7.29 10.31-10.21 8.58c-2.09-1.24-2.8-11.62-3.57-14a61.17 61.17 0 0 0-21.71-29.95c-3.13-2.37-10.89-5.45-12.68-8.7c-2-3.53-.2-11.86-.13-15.7c.11-5.6-2.44-14.91-1.06-20c1.6-5.87-1.48-2.33 3.77-3.49c2.77-.62 14.21 1.39 17.66 2.11c5.48 1.14 8.5 4.55 12.82 8c11.36 9.11 23.87 16.16 36.6 23.14c9.86 5.46 12.76 12.37 6.46 23.62z","fill":"#fff","class":[styles && styles["color"] || "color"].join(' ')}, []), "\r\n\t", Object(preact_min["h"])('path', {"d":"M184.46 67.09c4.74 4.63 9.2 10.11 16.27 10.57c6.69.45 13-3.17 18.84 1.38c6.48 5 11.15 11.33 19.75 12.89c8.32 1.51 17.13-3.35 19.19-11.86c2-8.11-2.31-16.93-2.57-25.07c0-1.13.61-6.15-.17-7c-.58-.64-5.42.08-6.16.1q-8.13.24-16.22 1.12a207.1 207.1 0 0 0-57.18 14.65c2.43 1.68 5.48 2.35 8.25 3.22z","fill":"#fff","class":[styles && styles["color"] || "color"].join(' ')}, []), "\r\n\t", Object(preact_min["h"])('path', {"d":"M356.4 123.27c8.49 0 17.11-3.8 14.37-13.62c-2.3-8.23-6.22-17.16-15.76-12.72c-6.07 2.82-14.67 10-15.38 17.12c-.81 8.08 11.11 9.22 16.77 9.22z","fill":"#fff","class":[styles && styles["color"] || "color"].join(' ')}, []), "\r\n\t", Object(preact_min["h"])('path', {"d":"M349.62 166.24c8.67 5.19 21.53 2.75 28.07-4.66c5.11-5.8 8.12-15.87 17.31-15.86a15.4 15.4 0 0 1 10.82 4.41c3.8 3.93 3.05 7.62 3.86 12.54c1.81 11.05 13.66.63 16.75-3.65c2-2.79 4.71-6.93 3.8-10.56c-.84-3.39-4.8-7-6.56-10.11c-5.14-9-9.37-19.47-17.07-26.74c-7.41-7-16.52-6.19-23.55 1.08c-5.76 6-12.45 10.75-16.39 18.05c-2.78 5.13-5.91 7.58-11.54 8.91c-3.1.73-6.64 1-9.24 3.08c-7.24 5.7-3.12 19.39 3.74 23.51z","fill":"#fff","class":[styles && styles["color"] || "color"].join(' ')}, []), "\r\n\t", Object(preact_min["h"])('rect', {"x":"0","y":"0","width":"512","height":"512","fill":"rgba(0, 0, 0, 0)"}, []), "\r\n"]);
});;

        
// CONCATENATED MODULE: ./containers/Sidebar/Sidebar.js





var Sidebar__ref2 = Object(preact_min["h"])(
	'div',
	{ className: 'contextContainer' },
	Object(preact_min["h"])(
		'div',
		{ className: 'iconContainer' },
		Object(preact_min["h"])('img', { className: 'icon', src: '../../assets/dashboard-outlined.svg', alt: 'dashboard-outlined' })
	),
	Object(preact_min["h"])(
		'p',
		{ className: 'label' },
		'Overview'
	)
);

var Sidebar__ref3 = Object(preact_min["h"])(
	'div',
	{ className: 'contextContainer' },
	Object(preact_min["h"])(
		'div',
		{ className: 'iconContainer' },
		Object(preact_min["h"])('img', { className: 'icon', src: '../../assets/outlets.svg', alt: 'outlets' })
	),
	Object(preact_min["h"])(
		'p',
		{ className: 'label' },
		'Outlets'
	)
);

var Sidebar__ref4 = Object(preact_min["h"])(
	'div',
	{ className: 'contextContainer' },
	Object(preact_min["h"])(
		'div',
		{ className: 'iconContainer' },
		Object(preact_min["h"])('img', { className: 'icon', src: '../../assets/api-outlined.svg', alt: 'api-outlined' })
	),
	Object(preact_min["h"])(
		'p',
		{ className: 'label' },
		'API Protocols'
	)
);

var Sidebar__ref5 = Object(preact_min["h"])(
	'div',
	{ className: 'contextContainer' },
	Object(preact_min["h"])(
		'div',
		{ className: 'iconContainer' },
		Object(preact_min["h"])('img', { className: 'icon', src: '../../assets/document-text-outline.svg', alt: 'document-text-outline' })
	),
	Object(preact_min["h"])(
		'p',
		{ className: 'label' },
		'Logs'
	)
);

var Sidebar__ref6 = Object(preact_min["h"])(
	'div',
	{ className: 'contextContainer' },
	Object(preact_min["h"])(
		'div',
		{ className: 'iconContainer' },
		Object(preact_min["h"])('img', { className: 'icon', src: '../../assets/user-outlined.svg', alt: 'user-outlined' })
	),
	Object(preact_min["h"])(
		'p',
		{ className: 'label' },
		'Users'
	)
);

var Sidebar__ref7 = Object(preact_min["h"])(
	'div',
	{ className: 'contextContainer' },
	Object(preact_min["h"])(
		'div',
		{ className: 'iconContainer' },
		Object(preact_min["h"])('img', { className: 'icon', src: '../../assets/settings.svg', alt: 'settings' })
	),
	Object(preact_min["h"])(
		'p',
		{ className: 'label' },
		'Settings'
	)
);

var Sidebar__ref8 = Object(preact_min["h"])(
	'div',
	{ className: 'contextContainer' },
	Object(preact_min["h"])(
		'div',
		{ className: 'iconContainer' },
		Object(preact_min["h"])(earth_outline, { className: 'icon' })
	),
	Object(preact_min["h"])(
		'p',
		{ className: 'label' },
		'Languages'
	)
);

var Sidebar_Sidebar = function Sidebar(_ref) {
	var toggleSidebar = _ref.toggleSidebar,
	    sidebarRef = _ref.sidebarRef,
	    isItMobile = _ref.isItMobile;

	return Object(preact_min["h"])(
		'div',
		{ ref: sidebarRef, className: 'sidebar' },
		Object(preact_min["h"])(
			'nav',
			{ className: 'navList' },
			Object(preact_min["h"])(
				preact_router_match["Link"],
				{ onClick: toggleSidebar, activeClassName: 'is-active', className: 'navLink', href: Routes.OVERVIEW },
				Sidebar__ref2
			),
			Object(preact_min["h"])(
				preact_router_match["Link"],
				{ onClick: toggleSidebar, activeClassName: 'is-active', className: 'navLink', href: Routes.OUTLETS },
				Sidebar__ref3
			),
			Object(preact_min["h"])(
				preact_router_match["Link"],
				{ onClick: toggleSidebar, activeClassName: 'is-active', className: 'navLink', href: Routes.PROTOCOLS },
				Sidebar__ref4
			),
			Object(preact_min["h"])(
				preact_router_match["Link"],
				{ onClick: toggleSidebar, activeClassName: 'is-active', className: 'navLink', href: Routes.LOGS },
				Sidebar__ref5
			),
			Object(preact_min["h"])(
				preact_router_match["Link"],
				{ onClick: toggleSidebar, activeClassName: 'is-active', className: 'navLink', href: Routes.USERS },
				Sidebar__ref6
			),
			Object(preact_min["h"])(
				preact_router_match["Link"],
				{ onClick: toggleSidebar, activeClassName: 'is-active', className: 'navLink', href: Routes.SETTINGS },
				Sidebar__ref7
			),
			isItMobile && Object(preact_min["h"])(
				preact_router_match["Link"],
				{ onClick: toggleSidebar, activeClassName: 'is-active', className: 'navLink languages', href: Routes.LANGUAGES },
				Sidebar__ref8
			)
		)
	);
};

/* harmony default export */ var containers_Sidebar_Sidebar = (Sidebar_Sidebar);
// CONCATENATED MODULE: ./containers/index.js












// CONCATENATED MODULE: ../node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js
/**
 * A collection of shims that provide minimal functionality of the ES6 collections.
 *
 * These implementations are not meant to be used outside of the ResizeObserver
 * modules as they cover only a limited range of use cases.
 */
/* eslint-disable require-jsdoc, valid-jsdoc */
var MapShim = function () {
    if (typeof Map !== 'undefined') {
        return Map;
    }
    /**
     * Returns index in provided array that matches the specified key.
     *
     * @param {Array<Array>} arr
     * @param {*} key
     * @returns {number}
     */
    function getIndex(arr, key) {
        var result = -1;
        arr.some(function (entry, index) {
            if (entry[0] === key) {
                result = index;
                return true;
            }
            return false;
        });
        return result;
    }
    return (/** @class */function () {
            function class_1() {
                this.__entries__ = [];
            }
            Object.defineProperty(class_1.prototype, "size", {
                /**
                 * @returns {boolean}
                 */
                get: function get() {
                    return this.__entries__.length;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * @param {*} key
             * @returns {*}
             */
            class_1.prototype.get = function (key) {
                var index = getIndex(this.__entries__, key);
                var entry = this.__entries__[index];
                return entry && entry[1];
            };
            /**
             * @param {*} key
             * @param {*} value
             * @returns {void}
             */
            class_1.prototype.set = function (key, value) {
                var index = getIndex(this.__entries__, key);
                if (~index) {
                    this.__entries__[index][1] = value;
                } else {
                    this.__entries__.push([key, value]);
                }
            };
            /**
             * @param {*} key
             * @returns {void}
             */
            class_1.prototype.delete = function (key) {
                var entries = this.__entries__;
                var index = getIndex(entries, key);
                if (~index) {
                    entries.splice(index, 1);
                }
            };
            /**
             * @param {*} key
             * @returns {void}
             */
            class_1.prototype.has = function (key) {
                return !!~getIndex(this.__entries__, key);
            };
            /**
             * @returns {void}
             */
            class_1.prototype.clear = function () {
                this.__entries__.splice(0);
            };
            /**
             * @param {Function} callback
             * @param {*} [ctx=null]
             * @returns {void}
             */
            class_1.prototype.forEach = function (callback, ctx) {
                if (ctx === void 0) {
                    ctx = null;
                }
                for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
                    var entry = _a[_i];
                    callback.call(ctx, entry[1], entry[0]);
                }
            };
            return class_1;
        }()
    );
}();

/**
 * Detects whether window and document objects are available in current environment.
 */
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && window.document === document;

// Returns global object of a current environment.
var global$1 = function () {
    if (typeof global !== 'undefined' && global.Math === Math) {
        return global;
    }
    if (typeof self !== 'undefined' && self.Math === Math) {
        return self;
    }
    if (typeof window !== 'undefined' && window.Math === Math) {
        return window;
    }
    // eslint-disable-next-line no-new-func
    return Function('return this')();
}();

/**
 * A shim for the requestAnimationFrame which falls back to the setTimeout if
 * first one is not supported.
 *
 * @returns {number} Requests' identifier.
 */
var requestAnimationFrame$1 = function () {
    if (typeof requestAnimationFrame === 'function') {
        // It's required to use a bounded function because IE sometimes throws
        // an "Invalid calling object" error if rAF is invoked without the global
        // object on the left hand side.
        return requestAnimationFrame.bind(global$1);
    }
    return function (callback) {
        return setTimeout(function () {
            return callback(Date.now());
        }, 1000 / 60);
    };
}();

// Defines minimum timeout before adding a trailing call.
var trailingTimeout = 2;
/**
 * Creates a wrapper function which ensures that provided callback will be
 * invoked only once during the specified delay period.
 *
 * @param {Function} callback - Function to be invoked after the delay period.
 * @param {number} delay - Delay after which to invoke callback.
 * @returns {Function}
 */
function throttle(callback, delay) {
    var leadingCall = false,
        trailingCall = false,
        lastCallTime = 0;
    /**
     * Invokes the original callback function and schedules new invocation if
     * the "proxy" was called during current request.
     *
     * @returns {void}
     */
    function resolvePending() {
        if (leadingCall) {
            leadingCall = false;
            callback();
        }
        if (trailingCall) {
            proxy();
        }
    }
    /**
     * Callback invoked after the specified delay. It will further postpone
     * invocation of the original function delegating it to the
     * requestAnimationFrame.
     *
     * @returns {void}
     */
    function timeoutCallback() {
        requestAnimationFrame$1(resolvePending);
    }
    /**
     * Schedules invocation of the original function.
     *
     * @returns {void}
     */
    function proxy() {
        var timeStamp = Date.now();
        if (leadingCall) {
            // Reject immediately following calls.
            if (timeStamp - lastCallTime < trailingTimeout) {
                return;
            }
            // Schedule new call to be in invoked when the pending one is resolved.
            // This is important for "transitions" which never actually start
            // immediately so there is a chance that we might miss one if change
            // happens amids the pending invocation.
            trailingCall = true;
        } else {
            leadingCall = true;
            trailingCall = false;
            setTimeout(timeoutCallback, delay);
        }
        lastCallTime = timeStamp;
    }
    return proxy;
}

// Minimum delay before invoking the update of observers.
var REFRESH_DELAY = 20;
// A list of substrings of CSS properties used to find transition events that
// might affect dimensions of observed elements.
var transitionKeys = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight'];
// Check if MutationObserver is available.
var mutationObserverSupported = typeof MutationObserver !== 'undefined';
/**
 * Singleton controller class which handles updates of ResizeObserver instances.
 */
var ResizeObserverController = /** @class */function () {
    /**
     * Creates a new instance of ResizeObserverController.
     *
     * @private
     */
    function ResizeObserverController() {
        /**
         * Indicates whether DOM listeners have been added.
         *
         * @private {boolean}
         */
        this.connected_ = false;
        /**
         * Tells that controller has subscribed for Mutation Events.
         *
         * @private {boolean}
         */
        this.mutationEventsAdded_ = false;
        /**
         * Keeps reference to the instance of MutationObserver.
         *
         * @private {MutationObserver}
         */
        this.mutationsObserver_ = null;
        /**
         * A list of connected observers.
         *
         * @private {Array<ResizeObserverSPI>}
         */
        this.observers_ = [];
        this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
        this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
    }
    /**
     * Adds observer to observers list.
     *
     * @param {ResizeObserverSPI} observer - Observer to be added.
     * @returns {void}
     */
    ResizeObserverController.prototype.addObserver = function (observer) {
        if (!~this.observers_.indexOf(observer)) {
            this.observers_.push(observer);
        }
        // Add listeners if they haven't been added yet.
        if (!this.connected_) {
            this.connect_();
        }
    };
    /**
     * Removes observer from observers list.
     *
     * @param {ResizeObserverSPI} observer - Observer to be removed.
     * @returns {void}
     */
    ResizeObserverController.prototype.removeObserver = function (observer) {
        var observers = this.observers_;
        var index = observers.indexOf(observer);
        // Remove observer if it's present in registry.
        if (~index) {
            observers.splice(index, 1);
        }
        // Remove listeners if controller has no connected observers.
        if (!observers.length && this.connected_) {
            this.disconnect_();
        }
    };
    /**
     * Invokes the update of observers. It will continue running updates insofar
     * it detects changes.
     *
     * @returns {void}
     */
    ResizeObserverController.prototype.refresh = function () {
        var changesDetected = this.updateObservers_();
        // Continue running updates if changes have been detected as there might
        // be future ones caused by CSS transitions.
        if (changesDetected) {
            this.refresh();
        }
    };
    /**
     * Updates every observer from observers list and notifies them of queued
     * entries.
     *
     * @private
     * @returns {boolean} Returns "true" if any observer has detected changes in
     *      dimensions of it's elements.
     */
    ResizeObserverController.prototype.updateObservers_ = function () {
        // Collect observers that have active observations.
        var activeObservers = this.observers_.filter(function (observer) {
            return observer.gatherActive(), observer.hasActive();
        });
        // Deliver notifications in a separate cycle in order to avoid any
        // collisions between observers, e.g. when multiple instances of
        // ResizeObserver are tracking the same element and the callback of one
        // of them changes content dimensions of the observed target. Sometimes
        // this may result in notifications being blocked for the rest of observers.
        activeObservers.forEach(function (observer) {
            return observer.broadcastActive();
        });
        return activeObservers.length > 0;
    };
    /**
     * Initializes DOM listeners.
     *
     * @private
     * @returns {void}
     */
    ResizeObserverController.prototype.connect_ = function () {
        // Do nothing if running in a non-browser environment or if listeners
        // have been already added.
        if (!isBrowser || this.connected_) {
            return;
        }
        // Subscription to the "Transitionend" event is used as a workaround for
        // delayed transitions. This way it's possible to capture at least the
        // final state of an element.
        document.addEventListener('transitionend', this.onTransitionEnd_);
        window.addEventListener('resize', this.refresh);
        if (mutationObserverSupported) {
            this.mutationsObserver_ = new MutationObserver(this.refresh);
            this.mutationsObserver_.observe(document, {
                attributes: true,
                childList: true,
                characterData: true,
                subtree: true
            });
        } else {
            document.addEventListener('DOMSubtreeModified', this.refresh);
            this.mutationEventsAdded_ = true;
        }
        this.connected_ = true;
    };
    /**
     * Removes DOM listeners.
     *
     * @private
     * @returns {void}
     */
    ResizeObserverController.prototype.disconnect_ = function () {
        // Do nothing if running in a non-browser environment or if listeners
        // have been already removed.
        if (!isBrowser || !this.connected_) {
            return;
        }
        document.removeEventListener('transitionend', this.onTransitionEnd_);
        window.removeEventListener('resize', this.refresh);
        if (this.mutationsObserver_) {
            this.mutationsObserver_.disconnect();
        }
        if (this.mutationEventsAdded_) {
            document.removeEventListener('DOMSubtreeModified', this.refresh);
        }
        this.mutationsObserver_ = null;
        this.mutationEventsAdded_ = false;
        this.connected_ = false;
    };
    /**
     * "Transitionend" event handler.
     *
     * @private
     * @param {TransitionEvent} event
     * @returns {void}
     */
    ResizeObserverController.prototype.onTransitionEnd_ = function (_a) {
        var _b = _a.propertyName,
            propertyName = _b === void 0 ? '' : _b;
        // Detect whether transition may affect dimensions of an element.
        var isReflowProperty = transitionKeys.some(function (key) {
            return !!~propertyName.indexOf(key);
        });
        if (isReflowProperty) {
            this.refresh();
        }
    };
    /**
     * Returns instance of the ResizeObserverController.
     *
     * @returns {ResizeObserverController}
     */
    ResizeObserverController.getInstance = function () {
        if (!this.instance_) {
            this.instance_ = new ResizeObserverController();
        }
        return this.instance_;
    };
    /**
     * Holds reference to the controller's instance.
     *
     * @private {ResizeObserverController}
     */
    ResizeObserverController.instance_ = null;
    return ResizeObserverController;
}();

/**
 * Defines non-writable/enumerable properties of the provided target object.
 *
 * @param {Object} target - Object for which to define properties.
 * @param {Object} props - Properties to be defined.
 * @returns {Object} Target object.
 */
var defineConfigurable = function defineConfigurable(target, props) {
    for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
        var key = _a[_i];
        Object.defineProperty(target, key, {
            value: props[key],
            enumerable: false,
            writable: false,
            configurable: true
        });
    }
    return target;
};

/**
 * Returns the global object associated with provided element.
 *
 * @param {Object} target
 * @returns {Object}
 */
var getWindowOf = function getWindowOf(target) {
    // Assume that the element is an instance of Node, which means that it
    // has the "ownerDocument" property from which we can retrieve a
    // corresponding global object.
    var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;
    // Return the local global object if it's not possible extract one from
    // provided element.
    return ownerGlobal || global$1;
};

// Placeholder of an empty content rectangle.
var emptyRect = createRectInit(0, 0, 0, 0);
/**
 * Converts provided string to a number.
 *
 * @param {number|string} value
 * @returns {number}
 */
function toFloat(value) {
    return parseFloat(value) || 0;
}
/**
 * Extracts borders size from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @param {...string} positions - Borders positions (top, right, ...)
 * @returns {number}
 */
function getBordersSize(styles) {
    var positions = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        positions[_i - 1] = arguments[_i];
    }
    return positions.reduce(function (size, position) {
        var value = styles['border-' + position + '-width'];
        return size + toFloat(value);
    }, 0);
}
/**
 * Extracts paddings sizes from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @returns {Object} Paddings box.
 */
function getPaddings(styles) {
    var positions = ['top', 'right', 'bottom', 'left'];
    var paddings = {};
    for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
        var position = positions_1[_i];
        var value = styles['padding-' + position];
        paddings[position] = toFloat(value);
    }
    return paddings;
}
/**
 * Calculates content rectangle of provided SVG element.
 *
 * @param {SVGGraphicsElement} target - Element content rectangle of which needs
 *      to be calculated.
 * @returns {DOMRectInit}
 */
function getSVGContentRect(target) {
    var bbox = target.getBBox();
    return createRectInit(0, 0, bbox.width, bbox.height);
}
/**
 * Calculates content rectangle of provided HTMLElement.
 *
 * @param {HTMLElement} target - Element for which to calculate the content rectangle.
 * @returns {DOMRectInit}
 */
function getHTMLElementContentRect(target) {
    // Client width & height properties can't be
    // used exclusively as they provide rounded values.
    var clientWidth = target.clientWidth,
        clientHeight = target.clientHeight;
    // By this condition we can catch all non-replaced inline, hidden and
    // detached elements. Though elements with width & height properties less
    // than 0.5 will be discarded as well.
    //
    // Without it we would need to implement separate methods for each of
    // those cases and it's not possible to perform a precise and performance
    // effective test for hidden elements. E.g. even jQuery's ':visible' filter
    // gives wrong results for elements with width & height less than 0.5.
    if (!clientWidth && !clientHeight) {
        return emptyRect;
    }
    var styles = getWindowOf(target).getComputedStyle(target);
    var paddings = getPaddings(styles);
    var horizPad = paddings.left + paddings.right;
    var vertPad = paddings.top + paddings.bottom;
    // Computed styles of width & height are being used because they are the
    // only dimensions available to JS that contain non-rounded values. It could
    // be possible to utilize the getBoundingClientRect if only it's data wasn't
    // affected by CSS transformations let alone paddings, borders and scroll bars.
    var width = toFloat(styles.width),
        height = toFloat(styles.height);
    // Width & height include paddings and borders when the 'border-box' box
    // model is applied (except for IE).
    if (styles.boxSizing === 'border-box') {
        // Following conditions are required to handle Internet Explorer which
        // doesn't include paddings and borders to computed CSS dimensions.
        //
        // We can say that if CSS dimensions + paddings are equal to the "client"
        // properties then it's either IE, and thus we don't need to subtract
        // anything, or an element merely doesn't have paddings/borders styles.
        if (Math.round(width + horizPad) !== clientWidth) {
            width -= getBordersSize(styles, 'left', 'right') + horizPad;
        }
        if (Math.round(height + vertPad) !== clientHeight) {
            height -= getBordersSize(styles, 'top', 'bottom') + vertPad;
        }
    }
    // Following steps can't be applied to the document's root element as its
    // client[Width/Height] properties represent viewport area of the window.
    // Besides, it's as well not necessary as the <html> itself neither has
    // rendered scroll bars nor it can be clipped.
    if (!isDocumentElement(target)) {
        // In some browsers (only in Firefox, actually) CSS width & height
        // include scroll bars size which can be removed at this step as scroll
        // bars are the only difference between rounded dimensions + paddings
        // and "client" properties, though that is not always true in Chrome.
        var vertScrollbar = Math.round(width + horizPad) - clientWidth;
        var horizScrollbar = Math.round(height + vertPad) - clientHeight;
        // Chrome has a rather weird rounding of "client" properties.
        // E.g. for an element with content width of 314.2px it sometimes gives
        // the client width of 315px and for the width of 314.7px it may give
        // 314px. And it doesn't happen all the time. So just ignore this delta
        // as a non-relevant.
        if (Math.abs(vertScrollbar) !== 1) {
            width -= vertScrollbar;
        }
        if (Math.abs(horizScrollbar) !== 1) {
            height -= horizScrollbar;
        }
    }
    return createRectInit(paddings.left, paddings.top, width, height);
}
/**
 * Checks whether provided element is an instance of the SVGGraphicsElement.
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
var isSVGGraphicsElement = function () {
    // Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
    // interface.
    if (typeof SVGGraphicsElement !== 'undefined') {
        return function (target) {
            return target instanceof getWindowOf(target).SVGGraphicsElement;
        };
    }
    // If it's so, then check that element is at least an instance of the
    // SVGElement and that it has the "getBBox" method.
    // eslint-disable-next-line no-extra-parens
    return function (target) {
        return target instanceof getWindowOf(target).SVGElement && typeof target.getBBox === 'function';
    };
}();
/**
 * Checks whether provided element is a document element (<html>).
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
function isDocumentElement(target) {
    return target === getWindowOf(target).document.documentElement;
}
/**
 * Calculates an appropriate content rectangle for provided html or svg element.
 *
 * @param {Element} target - Element content rectangle of which needs to be calculated.
 * @returns {DOMRectInit}
 */
function getContentRect(target) {
    if (!isBrowser) {
        return emptyRect;
    }
    if (isSVGGraphicsElement(target)) {
        return getSVGContentRect(target);
    }
    return getHTMLElementContentRect(target);
}
/**
 * Creates rectangle with an interface of the DOMRectReadOnly.
 * Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
 *
 * @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
 * @returns {DOMRectReadOnly}
 */
function createReadOnlyRect(_a) {
    var x = _a.x,
        y = _a.y,
        width = _a.width,
        height = _a.height;
    // If DOMRectReadOnly is available use it as a prototype for the rectangle.
    var Constr = typeof DOMRectReadOnly !== 'undefined' ? DOMRectReadOnly : Object;
    var rect = Object.create(Constr.prototype);
    // Rectangle's properties are not writable and non-enumerable.
    defineConfigurable(rect, {
        x: x, y: y, width: width, height: height,
        top: y,
        right: x + width,
        bottom: height + y,
        left: x
    });
    return rect;
}
/**
 * Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
 * Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
 *
 * @param {number} x - X coordinate.
 * @param {number} y - Y coordinate.
 * @param {number} width - Rectangle's width.
 * @param {number} height - Rectangle's height.
 * @returns {DOMRectInit}
 */
function createRectInit(x, y, width, height) {
    return { x: x, y: y, width: width, height: height };
}

/**
 * Class that is responsible for computations of the content rectangle of
 * provided DOM element and for keeping track of it's changes.
 */
var ResizeObservation = /** @class */function () {
    /**
     * Creates an instance of ResizeObservation.
     *
     * @param {Element} target - Element to be observed.
     */
    function ResizeObservation(target) {
        /**
         * Broadcasted width of content rectangle.
         *
         * @type {number}
         */
        this.broadcastWidth = 0;
        /**
         * Broadcasted height of content rectangle.
         *
         * @type {number}
         */
        this.broadcastHeight = 0;
        /**
         * Reference to the last observed content rectangle.
         *
         * @private {DOMRectInit}
         */
        this.contentRect_ = createRectInit(0, 0, 0, 0);
        this.target = target;
    }
    /**
     * Updates content rectangle and tells whether it's width or height properties
     * have changed since the last broadcast.
     *
     * @returns {boolean}
     */
    ResizeObservation.prototype.isActive = function () {
        var rect = getContentRect(this.target);
        this.contentRect_ = rect;
        return rect.width !== this.broadcastWidth || rect.height !== this.broadcastHeight;
    };
    /**
     * Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
     * from the corresponding properties of the last observed content rectangle.
     *
     * @returns {DOMRectInit} Last observed content rectangle.
     */
    ResizeObservation.prototype.broadcastRect = function () {
        var rect = this.contentRect_;
        this.broadcastWidth = rect.width;
        this.broadcastHeight = rect.height;
        return rect;
    };
    return ResizeObservation;
}();

var ResizeObserverEntry = /** @class */function () {
    /**
     * Creates an instance of ResizeObserverEntry.
     *
     * @param {Element} target - Element that is being observed.
     * @param {DOMRectInit} rectInit - Data of the element's content rectangle.
     */
    function ResizeObserverEntry(target, rectInit) {
        var contentRect = createReadOnlyRect(rectInit);
        // According to the specification following properties are not writable
        // and are also not enumerable in the native implementation.
        //
        // Property accessors are not being used as they'd require to define a
        // private WeakMap storage which may cause memory leaks in browsers that
        // don't support this type of collections.
        defineConfigurable(this, { target: target, contentRect: contentRect });
    }
    return ResizeObserverEntry;
}();

var ResizeObserverSPI = /** @class */function () {
    /**
     * Creates a new instance of ResizeObserver.
     *
     * @param {ResizeObserverCallback} callback - Callback function that is invoked
     *      when one of the observed elements changes it's content dimensions.
     * @param {ResizeObserverController} controller - Controller instance which
     *      is responsible for the updates of observer.
     * @param {ResizeObserver} callbackCtx - Reference to the public
     *      ResizeObserver instance which will be passed to callback function.
     */
    function ResizeObserverSPI(callback, controller, callbackCtx) {
        /**
         * Collection of resize observations that have detected changes in dimensions
         * of elements.
         *
         * @private {Array<ResizeObservation>}
         */
        this.activeObservations_ = [];
        /**
         * Registry of the ResizeObservation instances.
         *
         * @private {Map<Element, ResizeObservation>}
         */
        this.observations_ = new MapShim();
        if (typeof callback !== 'function') {
            throw new TypeError('The callback provided as parameter 1 is not a function.');
        }
        this.callback_ = callback;
        this.controller_ = controller;
        this.callbackCtx_ = callbackCtx;
    }
    /**
     * Starts observing provided element.
     *
     * @param {Element} target - Element to be observed.
     * @returns {void}
     */
    ResizeObserverSPI.prototype.observe = function (target) {
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        // Do nothing if current environment doesn't have the Element interface.
        if (typeof Element === 'undefined' || !(Element instanceof Object)) {
            return;
        }
        if (!(target instanceof getWindowOf(target).Element)) {
            throw new TypeError('parameter 1 is not of type "Element".');
        }
        var observations = this.observations_;
        // Do nothing if element is already being observed.
        if (observations.has(target)) {
            return;
        }
        observations.set(target, new ResizeObservation(target));
        this.controller_.addObserver(this);
        // Force the update of observations.
        this.controller_.refresh();
    };
    /**
     * Stops observing provided element.
     *
     * @param {Element} target - Element to stop observing.
     * @returns {void}
     */
    ResizeObserverSPI.prototype.unobserve = function (target) {
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        // Do nothing if current environment doesn't have the Element interface.
        if (typeof Element === 'undefined' || !(Element instanceof Object)) {
            return;
        }
        if (!(target instanceof getWindowOf(target).Element)) {
            throw new TypeError('parameter 1 is not of type "Element".');
        }
        var observations = this.observations_;
        // Do nothing if element is not being observed.
        if (!observations.has(target)) {
            return;
        }
        observations.delete(target);
        if (!observations.size) {
            this.controller_.removeObserver(this);
        }
    };
    /**
     * Stops observing all elements.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.disconnect = function () {
        this.clearActive();
        this.observations_.clear();
        this.controller_.removeObserver(this);
    };
    /**
     * Collects observation instances the associated element of which has changed
     * it's content rectangle.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.gatherActive = function () {
        var _this = this;
        this.clearActive();
        this.observations_.forEach(function (observation) {
            if (observation.isActive()) {
                _this.activeObservations_.push(observation);
            }
        });
    };
    /**
     * Invokes initial callback function with a list of ResizeObserverEntry
     * instances collected from active resize observations.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.broadcastActive = function () {
        // Do nothing if observer doesn't have active observations.
        if (!this.hasActive()) {
            return;
        }
        var ctx = this.callbackCtx_;
        // Create ResizeObserverEntry instance for every active observation.
        var entries = this.activeObservations_.map(function (observation) {
            return new ResizeObserverEntry(observation.target, observation.broadcastRect());
        });
        this.callback_.call(ctx, entries, ctx);
        this.clearActive();
    };
    /**
     * Clears the collection of active observations.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.clearActive = function () {
        this.activeObservations_.splice(0);
    };
    /**
     * Tells whether observer has active observations.
     *
     * @returns {boolean}
     */
    ResizeObserverSPI.prototype.hasActive = function () {
        return this.activeObservations_.length > 0;
    };
    return ResizeObserverSPI;
}();

// Registry of internal observers. If WeakMap is not available use current shim
// for the Map collection as it has all required methods and because WeakMap
// can't be fully polyfilled anyway.
var observers = typeof WeakMap !== 'undefined' ? new WeakMap() : new MapShim();
/**
 * ResizeObserver API. Encapsulates the ResizeObserver SPI implementation
 * exposing only those methods and properties that are defined in the spec.
 */
var ResizeObserver = /** @class */function () {
    /**
     * Creates a new instance of ResizeObserver.
     *
     * @param {ResizeObserverCallback} callback - Callback that is invoked when
     *      dimensions of the observed elements change.
     */
    function ResizeObserver(callback) {
        if (!(this instanceof ResizeObserver)) {
            throw new TypeError('Cannot call a class as a function.');
        }
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        var controller = ResizeObserverController.getInstance();
        var observer = new ResizeObserverSPI(callback, controller, this);
        observers.set(this, observer);
    }
    return ResizeObserver;
}();
// Expose public methods of ResizeObserver.
['observe', 'unobserve', 'disconnect'].forEach(function (method) {
    ResizeObserver.prototype[method] = function () {
        var _a;
        return (_a = observers.get(this))[method].apply(_a, arguments);
    };
});

var ResizeObserver_es_index = function () {
    // Export existing implementation if available.
    if (typeof global$1.ResizeObserver !== 'undefined') {
        return global$1.ResizeObserver;
    }
    return ResizeObserver;
}();

/* harmony default export */ var ResizeObserver_es = (ResizeObserver_es_index);
// EXTERNAL MODULE: ../node_modules/preact-resize-observer/node_modules/prop-types/index.js
var prop_types = __webpack_require__("gCqW");
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// CONCATENATED MODULE: ../node_modules/preact-resize-observer/dist/esm/PreactResizeObserver.js
var PreactResizeObserver___extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __assign = this && this.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
    }
    return t;
};
var PreactResizeObserver___rest = this && this.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};



var PreactResizeObserver_PreactResizeObserver = /** @class */function (_super) {
    PreactResizeObserver___extends(PreactResizeObserver, _super);
    function PreactResizeObserver(props) {
        var _this = _super.call(this, props) || this;
        _this.suppressResizeEvent = false;
        _this.onResize = function (resizeEntries) {
            var resizeCallback = _this.props.onResize;
            if (_this.suppressResizeEvent) {
                _this.suppressResizeEvent = false;
                return;
            }
            if (typeof resizeCallback !== 'function') {
                return;
            }
            resizeEntries.forEach(function (entry) {
                var _a = entry.contentRect,
                    width = _a.width,
                    height = _a.height;
                var resized = false;
                if (_this.props.horizontal && _this.currentWidth !== width) {
                    resized = true;
                    _this.currentWidth = width;
                }
                if (_this.props.vertical && _this.currentHeight !== height) {
                    resized = true;
                    _this.currentHeight = height;
                }
                if (resized) {
                    resizeCallback(width, height);
                }
            });
        };
        _this.handleRef = function (el) {
            var innerRef = _this.props.innerRef;
            _this.element = el;
            if (_this.element && innerRef && typeof innerRef === 'function') {
                innerRef(_this.element);
            }
        };
        _this.observer = new ResizeObserver_es(_this.onResize);
        return _this;
    }
    PreactResizeObserver.prototype.componentDidMount = function () {
        var observedElement;
        if (this.props.element) {
            observedElement = this.props.element;
        } else if (this.element) {
            observedElement = this.element;
        }
        if (observedElement) {
            this.observeElement(observedElement);
        }
    };
    PreactResizeObserver.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.element) {
            // Custom element was provided when we didn't have one before
            if (nextProps.element !== this.props.element) {
                this.observeElement(nextProps.element);
            }
        } else if (this.props.element) {
            // No custom element provided but we had one previously
            this.observeElement(this.element);
        }
    };
    PreactResizeObserver.prototype.observeElement = function (element) {
        if (element) {
            this.suppressResizeEvent = !this.props.initial;
            this.observer.disconnect();
            this.observer.observe(element);
        }
    };
    PreactResizeObserver.prototype.render = function () {
        var _a = this.props,
            onResize = _a.onResize,
            innerRef = _a.innerRef,
            horizontal = _a.horizontal,
            vertical = _a.vertical,
            initial = _a.initial,
            element = _a.element,
            tag = _a.tag,
            children = _a.children,
            rest = PreactResizeObserver___rest(_a, ["onResize", "innerRef", "horizontal", "vertical", "initial", "element", "tag", "children"]);
        return Object(preact_min["h"])(tag, __assign({ ref: this.handleRef }, rest), children);
    };
    PreactResizeObserver.propTypes = {
        onResize: prop_types["func"].isRequired,
        horizontal: prop_types["bool"],
        vertical: prop_types["bool"],
        initial: prop_types["bool"],
        element: prop_types["element"],
        tag: prop_types["string"]
    };
    PreactResizeObserver.defaultProps = {
        initial: true,
        horizontal: true,
        vertical: true,
        tag: 'div'
    };
    return PreactResizeObserver;
}(preact_min["Component"]);
/* harmony default export */ var esm_PreactResizeObserver = (PreactResizeObserver_PreactResizeObserver);
// CONCATENATED MODULE: ../node_modules/preact-resize-observer/dist/esm/index.js

/* harmony default export */ var esm = (esm_PreactResizeObserver);
// CONCATENATED MODULE: ./index.js


function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function index__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function index__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function index__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }














var index_Main = function (_Component) {
	index__inherits(Main, _Component);

	function Main(props) {
		index__classCallCheck(this, Main);

		var _this = index__possibleConstructorReturn(this, _Component.call(this, props));

		_this.sidebarRef = Object(preact_min["createRef"])();

		_this.handleResize = function (width) {
			var isItMobile = _this.state.isItMobile;

			//If we go from mobile to pc.

			if (width > 767 && isItMobile) {
				_this.setState({
					isItMobile: !isItMobile
				});
				//Then from pc to mobile
			} else if (width <= 767 && !isItMobile) {
				_this.setState({
					isItMobile: !isItMobile,
					isSidebarOpened: false
				});
				//If Sidebar was opened, let him be closed...
				if (_this.sidebarRef.current.classList.value.includes('sidebarVisible')) {
					_this.sidebarRef.current.classList.toggle('sidebarVisible');
				}
			}
		};

		_this.toggleSidebar = function () {
			_this.sidebarRef.current.classList.toggle('sidebarVisible');
			_this.setState({ isSidebarOpened: !_this.state.isSidebarOpened });
		};

		_this.toggleUserProfile = function () {
			_this.setState({ isUserMenuOpened: !_this.state.isUserMenuOpened });
		};

		_this.state = {
			isSidebarOpened: false,
			isUserMenuOpened: false,
			isItMobile: window.innerWidth <= 767,
			languages: ['English', 'Turkish', 'Ukrainian']
		};
		return _this;
	}

	/*This feature fixes simple adaptive issues,
 it was in Sidebar, but then i thought it could be helpful for you*/

	//Auth router must be outside of Header and Sidebar! Rrr
	Main.prototype.render = function render(_ref, _ref2) {
		var isSidebarOpened = _ref2.isSidebarOpened,
		    isUserMenuOpened = _ref2.isUserMenuOpened,
		    isItMobile = _ref2.isItMobile,
		    languages = _ref2.languages;

		_objectDestructuringEmpty(_ref);

		return Object(preact_min["h"])(
			esm,
			{ 'class': 'fluid-content', onResize: this.handleResize },
			Object(preact_min["h"])(
				'div',
				{ className: 'Wrapper' },
				Object(preact_min["h"])(containers_Header_Header, { isSidebarOpened: isSidebarOpened, isUserMenuOpened: isUserMenuOpened,
					toggleSidebar: this.toggleSidebar, toggleUserProfile: this.toggleUserProfile,
					languages: languages }),
				Object(preact_min["h"])(
					'div',
					{ className: 'Components' },
					Object(preact_min["h"])(containers_Sidebar_Sidebar, { isItMobile: isItMobile, sidebarRef: this.sidebarRef, toggleSidebar: this.toggleSidebar }),
					Object(preact_min["h"])(
						'div',
						{ className: 'pageScroll' },
						Object(preact_min["h"])(
							'div',
							{ className: 'page' },
							Object(preact_min["h"])(
								preact_redux_esm_Provider,
								{ store: store },
								Object(preact_min["h"])(
									preact_router_es["Router"],
									null,
									Object(preact_min["h"])(Auth, { path: Routes.LOGIN }),
									Object(preact_min["h"])(containers_Profile_Profile, { path: Routes.PROFILE }),
									Object(preact_min["h"])(containers_Languages_Languages, { languages: languages, path: Routes.LANGUAGES }),
									Object(preact_min["h"])(Outlets_Outlets, { path: Routes.OUTLETS, 'default': true }),
									Object(preact_min["h"])(Overview_Overview, { path: Routes.OVERVIEW }),
									Object(preact_min["h"])(Protocols_Protocols, { path: Routes.PROTOCOLS }),
									Object(preact_min["h"])(Settings_Settings, { path: Routes.SETTINGS }),
									Object(preact_min["h"])(Users_Users, { isItMobile: isItMobile, path: Routes.USERS }),
									Object(preact_min["h"])(Logs, { path: Routes.LOGS })
								)
							)
						)
					)
				)
			)
		);
	};

	return Main;
}(preact_min["Component"]);

Object(preact_min["render"])(Object(preact_min["h"])(index_Main, null), document.body);

/***/ }),

/***/ "LkZ7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ponyfill_js__ = __webpack_require__("JZ8d");
/* global window */


var root;

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (true) {
  root = module;
} else {
  root = Function('return this')();
}

var result = Object(__WEBPACK_IMPORTED_MODULE_0__ponyfill_js__["a" /* default */])(root);
/* harmony default export */ __webpack_exports__["a"] = (result);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("pv+l")(module)))

/***/ }),

/***/ "WMsV":
/***/ (function(module, exports, __webpack_require__) {

!function () {
  "use strict";
  function e(e, t) {
    var n,
        o,
        r,
        i,
        l = W;for (i = arguments.length; i-- > 2;) {
      P.push(arguments[i]);
    }t && null != t.children && (P.length || P.push(t.children), delete t.children);while (P.length) {
      if ((o = P.pop()) && void 0 !== o.pop) for (i = o.length; i--;) {
        P.push(o[i]);
      } else "boolean" == typeof o && (o = null), (r = "function" != typeof e) && (null == o ? o = "" : "number" == typeof o ? o += "" : "string" != typeof o && (r = !1)), r && n ? l[l.length - 1] += o : l === W ? l = [o] : l.push(o), n = r;
    }var a = new T();return a.nodeName = e, a.children = l, a.attributes = null == t ? void 0 : t, a.key = null == t ? void 0 : t.key, void 0 !== M.vnode && M.vnode(a), a;
  }function t(e, t) {
    for (var n in t) {
      e[n] = t[n];
    }return e;
  }function n(e, t) {
    e && ("function" == typeof e ? e(t) : e.current = t);
  }function o(n, o) {
    return e(n.nodeName, t(t({}, n.attributes), o), arguments.length > 2 ? [].slice.call(arguments, 2) : n.children);
  }function r(e) {
    !e.__d && (e.__d = !0) && 1 == V.push(e) && (M.debounceRendering || D)(i);
  }function i() {
    var e;while (e = V.pop()) {
      e.__d && x(e);
    }
  }function l(e, t, n) {
    return "string" == typeof t || "number" == typeof t ? void 0 !== e.splitText : "string" == typeof t.nodeName ? !e._componentConstructor && a(e, t.nodeName) : n || e._componentConstructor === t.nodeName;
  }function a(e, t) {
    return e.__n === t || e.nodeName.toLowerCase() === t.toLowerCase();
  }function u(e) {
    var n = t({}, e.attributes);n.children = e.children;var o = e.nodeName.defaultProps;if (void 0 !== o) for (var r in o) {
      void 0 === n[r] && (n[r] = o[r]);
    }return n;
  }function c(e, t) {
    var n = t ? document.createElementNS("http://www.w3.org/2000/svg", e) : document.createElement(e);return n.__n = e, n;
  }function p(e) {
    var t = e.parentNode;t && t.removeChild(e);
  }function s(e, t, o, r, i) {
    if ("className" === t && (t = "class"), "key" === t) ;else if ("ref" === t) n(o, null), n(r, e);else if ("class" !== t || i) {
      if ("style" === t) {
        if (r && "string" != typeof r && "string" != typeof o || (e.style.cssText = r || ""), r && "object" == typeof r) {
          if ("string" != typeof o) for (var l in o) {
            l in r || (e.style[l] = "");
          }for (var l in r) {
            e.style[l] = "number" == typeof r[l] && !1 === E.test(l) ? r[l] + "px" : r[l];
          }
        }
      } else if ("dangerouslySetInnerHTML" === t) r && (e.innerHTML = r.__html || "");else if ("o" == t[0] && "n" == t[1]) {
        var a = t !== (t = t.replace(/Capture$/, ""));t = t.toLowerCase().substring(2), r ? o || e.addEventListener(t, _, a) : e.removeEventListener(t, _, a), (e.__l || (e.__l = {}))[t] = r;
      } else if ("list" !== t && "type" !== t && !i && t in e) {
        try {
          e[t] = null == r ? "" : r;
        } catch (e) {}null != r && !1 !== r || "spellcheck" == t || e.removeAttribute(t);
      } else {
        var u = i && t !== (t = t.replace(/^xlink:?/, ""));null == r || !1 === r ? u ? e.removeAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase()) : e.removeAttribute(t) : "function" != typeof r && (u ? e.setAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase(), r) : e.setAttribute(t, r));
      }
    } else e.className = r || "";
  }function _(e) {
    return this.__l[e.type](M.event && M.event(e) || e);
  }function f() {
    var e;while (e = A.shift()) {
      M.afterMount && M.afterMount(e), e.componentDidMount && e.componentDidMount();
    }
  }function d(e, t, n, o, r, i) {
    H++ || (R = null != r && void 0 !== r.ownerSVGElement, B = null != e && !("__preactattr_" in e));var l = h(e, t, n, o, i);return r && l.parentNode !== r && r.appendChild(l), --H || (B = !1, i || f()), l;
  }function h(e, t, n, o, r) {
    var i = e,
        l = R;if (null != t && "boolean" != typeof t || (t = ""), "string" == typeof t || "number" == typeof t) return e && void 0 !== e.splitText && e.parentNode && (!e._component || r) ? e.nodeValue != t && (e.nodeValue = t) : (i = document.createTextNode(t), e && (e.parentNode && e.parentNode.replaceChild(i, e), v(e, !0))), i.__preactattr_ = !0, i;var u = t.nodeName;if ("function" == typeof u) return N(e, t, n, o);if (R = "svg" === u || "foreignObject" !== u && R, u += "", (!e || !a(e, u)) && (i = c(u, R), e)) {
      while (e.firstChild) {
        i.appendChild(e.firstChild);
      }e.parentNode && e.parentNode.replaceChild(i, e), v(e, !0);
    }var p = i.firstChild,
        s = i.__preactattr_,
        _ = t.children;if (null == s) {
      s = i.__preactattr_ = {};for (var f = i.attributes, d = f.length; d--;) {
        s[f[d].name] = f[d].value;
      }
    }return !B && _ && 1 === _.length && "string" == typeof _[0] && null != p && void 0 !== p.splitText && null == p.nextSibling ? p.nodeValue != _[0] && (p.nodeValue = _[0]) : (_ && _.length || null != p) && m(i, _, n, o, B || null != s.dangerouslySetInnerHTML), y(i, t.attributes, s), R = l, i;
  }function m(e, t, n, o, r) {
    var i,
        a,
        u,
        c,
        s,
        _ = e.childNodes,
        f = [],
        d = {},
        m = 0,
        b = 0,
        y = _.length,
        g = 0,
        w = t ? t.length : 0;if (0 !== y) for (var C = 0; C < y; C++) {
      var x = _[C],
          N = x.__preactattr_,
          k = w && N ? x._component ? x._component.__k : N.key : null;null != k ? (m++, d[k] = x) : (N || (void 0 !== x.splitText ? !r || x.nodeValue.trim() : r)) && (f[g++] = x);
    }if (0 !== w) for (var C = 0; C < w; C++) {
      c = t[C], s = null;var k = c.key;if (null != k) m && void 0 !== d[k] && (s = d[k], d[k] = void 0, m--);else if (b < g) for (i = b; i < g; i++) {
        if (void 0 !== f[i] && l(a = f[i], c, r)) {
          s = a, f[i] = void 0, i === g - 1 && g--, i === b && b++;break;
        }
      }s = h(s, c, n, o), u = _[C], s && s !== e && s !== u && (null == u ? e.appendChild(s) : s === u.nextSibling ? p(u) : e.insertBefore(s, u));
    }if (m) for (var C in d) {
      void 0 !== d[C] && v(d[C], !1);
    }while (b <= g) {
      void 0 !== (s = f[g--]) && v(s, !1);
    }
  }function v(e, t) {
    var o = e._component;o ? k(o) : (null != e.__preactattr_ && n(e.__preactattr_.ref, null), !1 !== t && null != e.__preactattr_ || p(e), b(e));
  }function b(e) {
    e = e.lastChild;while (e) {
      var t = e.previousSibling;v(e, !0), e = t;
    }
  }function y(e, t, n) {
    var o;for (o in n) {
      t && null != t[o] || null == n[o] || s(e, o, n[o], n[o] = void 0, R);
    }for (o in t) {
      "children" === o || "innerHTML" === o || o in n && t[o] === ("value" === o || "checked" === o ? e[o] : n[o]) || s(e, o, n[o], n[o] = t[o], R);
    }
  }function g(e, t, n) {
    var o,
        r = F.length;e.prototype && e.prototype.render ? (o = new e(t, n), U.call(o, t, n)) : (o = new U(t, n), o.constructor = e, o.render = w);while (r--) {
      if (F[r].constructor === e) return o.__b = F[r].__b, F.splice(r, 1), o;
    }return o;
  }function w(e, t, n) {
    return this.constructor(e, n);
  }function C(e, t, o, i, l) {
    e.__x || (e.__x = !0, e.__r = t.ref, e.__k = t.key, delete t.ref, delete t.key, void 0 === e.constructor.getDerivedStateFromProps && (!e.base || l ? e.componentWillMount && e.componentWillMount() : e.componentWillReceiveProps && e.componentWillReceiveProps(t, i)), i && i !== e.context && (e.__c || (e.__c = e.context), e.context = i), e.__p || (e.__p = e.props), e.props = t, e.__x = !1, 0 !== o && (1 !== o && !1 === M.syncComponentUpdates && e.base ? r(e) : x(e, 1, l)), n(e.__r, e));
  }function x(e, n, o, r) {
    if (!e.__x) {
      var i,
          l,
          a,
          c = e.props,
          p = e.state,
          s = e.context,
          _ = e.__p || c,
          h = e.__s || p,
          m = e.__c || s,
          b = e.base,
          y = e.__b,
          w = b || y,
          N = e._component,
          U = !1,
          S = m;if (e.constructor.getDerivedStateFromProps && (p = t(t({}, p), e.constructor.getDerivedStateFromProps(c, p)), e.state = p), b && (e.props = _, e.state = h, e.context = m, 2 !== n && e.shouldComponentUpdate && !1 === e.shouldComponentUpdate(c, p, s) ? U = !0 : e.componentWillUpdate && e.componentWillUpdate(c, p, s), e.props = c, e.state = p, e.context = s), e.__p = e.__s = e.__c = e.__b = null, e.__d = !1, !U) {
        i = e.render(c, p, s), e.getChildContext && (s = t(t({}, s), e.getChildContext())), b && e.getSnapshotBeforeUpdate && (S = e.getSnapshotBeforeUpdate(_, h));var L,
            T,
            P = i && i.nodeName;if ("function" == typeof P) {
          var W = u(i);l = N, l && l.constructor === P && W.key == l.__k ? C(l, W, 1, s, !1) : (L = l, e._component = l = g(P, W, s), l.__b = l.__b || y, l.__u = e, C(l, W, 0, s, !1), x(l, 1, o, !0)), T = l.base;
        } else a = w, L = N, L && (a = e._component = null), (w || 1 === n) && (a && (a._component = null), T = d(a, i, s, o || !b, w && w.parentNode, !0));if (w && T !== w && l !== N) {
          var D = w.parentNode;D && T !== D && (D.replaceChild(T, w), L || (w._component = null, v(w, !1)));
        }if (L && k(L), e.base = T, T && !r) {
          var E = e,
              V = e;while (V = V.__u) {
            (E = V).base = T;
          }T._component = E, T._componentConstructor = E.constructor;
        }
      }!b || o ? A.push(e) : U || (e.componentDidUpdate && e.componentDidUpdate(_, h, S), M.afterUpdate && M.afterUpdate(e));while (e.__h.length) {
        e.__h.pop().call(e);
      }H || r || f();
    }
  }function N(e, t, n, o) {
    var r = e && e._component,
        i = r,
        l = e,
        a = r && e._componentConstructor === t.nodeName,
        c = a,
        p = u(t);while (r && !c && (r = r.__u)) {
      c = r.constructor === t.nodeName;
    }return r && c && (!o || r._component) ? (C(r, p, 3, n, o), e = r.base) : (i && !a && (k(i), e = l = null), r = g(t.nodeName, p, n), e && !r.__b && (r.__b = e, l = null), C(r, p, 1, n, o), e = r.base, l && e !== l && (l._component = null, v(l, !1))), e;
  }function k(e) {
    M.beforeUnmount && M.beforeUnmount(e);var t = e.base;e.__x = !0, e.componentWillUnmount && e.componentWillUnmount(), e.base = null;var o = e._component;o ? k(o) : t && (null != t.__preactattr_ && n(t.__preactattr_.ref, null), e.__b = t, p(t), F.push(e), b(t)), n(e.__r, null);
  }function U(e, t) {
    this.__d = !0, this.context = t, this.props = e, this.state = this.state || {}, this.__h = [];
  }function S(e, t, n) {
    return d(n, e, {}, !1, t, !1);
  }function L() {
    return {};
  }var T = function T() {},
      M = {},
      P = [],
      W = [],
      D = "function" == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout,
      E = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
      V = [],
      A = [],
      H = 0,
      R = !1,
      B = !1,
      F = [];t(U.prototype, { setState: function setState(e, n) {
      this.__s || (this.__s = this.state), this.state = t(t({}, this.state), "function" == typeof e ? e(this.state, this.props) : e), n && this.__h.push(n), r(this);
    }, forceUpdate: function forceUpdate(e) {
      e && this.__h.push(e), x(this, 2);
    }, render: function render() {} });var j = { h: e, createElement: e, cloneElement: o, createRef: L, Component: U, render: S, rerender: i, options: M }; true ? module.exports = j : self.preact = j;
}();
//# sourceMappingURL=preact.min.js.map

/***/ }),

/***/ "bLDg":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = __webpack_require__("qw1H");

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

module.exports = function () {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
    err.name = 'Invariant Violation';
    throw err;
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bigint: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/***/ }),

/***/ "gCqW":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) {
  var ReactIs = require('react-is');

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = require('./factoryWithTypeCheckers')(ReactIs.isElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__("bLDg")();
}

/***/ }),

/***/ "pv+l":
/***/ (function(module, exports) {

module.exports = function (originalModule) {
	if (!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),

/***/ "qw1H":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

/***/ }),

/***/ "sw5u":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Link = exports.Match = undefined;

var _extends = Object.assign || function (target) {
	for (var i = 1; i < arguments.length; i++) {
		var source = arguments[i];for (var key in source) {
			if (Object.prototype.hasOwnProperty.call(source, key)) {
				target[key] = source[key];
			}
		}
	}return target;
};

var _preact = __webpack_require__("WMsV");

var _preactRouter = __webpack_require__("/QC5");

function _objectWithoutProperties(obj, keys) {
	var target = {};for (var i in obj) {
		if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
	}return target;
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Match = exports.Match = function (_Component) {
	_inherits(Match, _Component);

	function Match() {
		var _temp, _this, _ret;

		_classCallCheck(this, Match);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.update = function (url) {
			_this.nextUrl = url;
			_this.setState({});
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	Match.prototype.componentDidMount = function componentDidMount() {
		_preactRouter.subscribers.push(this.update);
	};

	Match.prototype.componentWillUnmount = function componentWillUnmount() {
		_preactRouter.subscribers.splice(_preactRouter.subscribers.indexOf(this.update) >>> 0, 1);
	};

	Match.prototype.render = function render(props) {
		var url = this.nextUrl || (0, _preactRouter.getCurrentUrl)(),
		    path = url.replace(/\?.+$/, '');
		this.nextUrl = null;
		return props.children({
			url: url,
			path: path,
			matches: (0, _preactRouter.exec)(path, props.path, {}) !== false
		});
	};

	return Match;
}(_preact.Component);

var Link = function Link(_ref) {
	var activeClassName = _ref.activeClassName,
	    path = _ref.path,
	    props = _objectWithoutProperties(_ref, ['activeClassName', 'path']);

	return (0, _preact.h)(Match, { path: path || props.href }, function (_ref2) {
		var matches = _ref2.matches;
		return (0, _preact.h)(_preactRouter.Link, _extends({}, props, { 'class': [props.class || props.className, matches && activeClassName].filter(Boolean).join(' ') }));
	});
};

exports.Link = Link;
exports.default = Match;

Match.Link = Link;

/***/ }),

/***/ "ufd/":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

/******/ });
//# sourceMappingURL=ssr-bundle.js.map