
// source ./RootModule.js
(function(){
	
	var _node_modules_alot_lib_alot = {};
var _node_modules_memd_lib_memd = {};
var _src_Channel = {};
var _src_ChannelClient = {};
var _src_ChannelHost = {};
var _src_IpcClient = {};
var _src_IpcHost = {};
var _src_IpcPipe = {};
var _src_MemSync = {};
var _src_SharedObject = {};
var _src_interface_EIpcMessageType = {};
var _src_log_Logger = {};
var _src_util_array = {};
var _src_util_patch = {};

// source ./ModuleSimplified.js
var _src_Channel;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Channel = void 0;
var atma_utils_1 = require("atma-utils");
var Channel = /** @class */ (function (_super) {
    __extends(Channel, _super);
    function Channel(shared) {
        var _this = _super.call(this) || this;
        _this.shared = shared;
        _this.localVersion = 0;
        _this.netVersion = 0;
        _this.id = Math.round(Math.random() * Math.pow(10, 10));
        _this.patches = [];
        _this.pending = [];
        _this.isReady = true;
        return _this;
    }
    Channel.prototype.onOpen = function () {
        this.isReady = true;
    };
    return Channel;
}(atma_utils_1.class_EventEmitter));
exports.Channel = Channel;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_Channel) && isObject(module.exports)) {
		Object.assign(_src_Channel, module.exports);
		return;
	}
	_src_Channel = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _node_modules_memd_lib_memd;
(function () {
	var exports = {};
	var module = { exports: exports };
	
// source ./UMD.js
(function (factory) {

    var _name = 'memd',
        _global = typeof window === 'undefined' ? global : window,
        _module = {
            exports: {}
        };

    factory(_module, _module.exports, _global);

    if (typeof module === 'object' && module.exports) {
        module.exports = _module.exports;
    }

    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return _module.exports;
        });
        return;
    }
    
    if (_name) {
        _global[_name] = _module.exports;
    }

}(function (module, exports, global) {

    var _src_Cache = {};
var _src_deco_debounce = {};
var _src_deco_memoize = {};
var _src_deco_queued = {};
var _src_deco_throttle = {};
var _src_fn_Args = {};
var _src_fn_memoize = {};
var _src_model_Deferred = {};
var _src_persistance_FsTransport = {};
var _src_persistance_LocalStorageTransport = {};
var _src_persistance_TransportWorker = {};
var _src_workers_CachedWorker = {};

// source ./ModuleSimplified.js
var _src_fn_Args;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Args;
(function (Args) {
    function getKey(args) {
        var key = '';
        for (var i = 0; i < args.length; i++) {
            key += '.' + getKeySingle(args[i]);
        }
        return key;
    }
    Args.getKey = getKey;
    function getKeySingle(misc) {
        if (misc == null) {
            return '';
        }
        if (typeof misc !== 'object') {
            return misc;
        }
        if (misc instanceof Date) {
            return misc.getTime();
        }
        if (misc instanceof Array) {
            return getKey(misc);
        }
        var str = '';
        for (var key in misc) {
            str += '.' + getKeySingle(misc[key]);
        }
        return str;
    }
})(Args = exports.Args || (exports.Args = {}));
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_fn_Args) && isObject(module.exports)) {
		Object.assign(_src_fn_Args, module.exports);
		return;
	}
	_src_fn_Args = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_persistance_TransportWorker;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var TransportWorker = /** @class */ (function () {
    function TransportWorker(cache, transport) {
        var _this = this;
        var _a;
        this.cache = cache;
        this.transport = transport;
        this.isReady = false;
        this.isAsync = false;
        this.lastModified = null;
        this.restorePromise = null;
        this.isAsync = Boolean(this.transport.isAsync);
        this.flushRunner = new AsyncRunner(function () { return _this.flushInner(); }, (_a = this.transport.debounceMs, (_a !== null && _a !== void 0 ? _a : 500)));
    }
    TransportWorker.prototype.restore = function () {
        if (this.isReady) {
            return;
        }
        if (this.isAsync) {
            throw new Error('Transport is Async');
        }
        var coll = this.transport.restore();
        this.cache.setCollection(coll);
        this.isReady = true;
    };
    TransportWorker.prototype.restoreAsync = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_b) {
                return [2 /*return*/, (_a = this.restorePromise, (_a !== null && _a !== void 0 ? _a : (this.restorePromise = (function () { return __awaiter(_this, void 0, void 0, function () {
                        var coll;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (this.isReady) {
                                        return [2 /*return*/];
                                    }
                                    if (this.isAsync === false) {
                                        this.restore();
                                        return [2 /*return*/];
                                    }
                                    return [4 /*yield*/, this.transport.restoreAsync()];
                                case 1:
                                    coll = _a.sent();
                                    if (this.isReady) {
                                        return [2 /*return*/];
                                    }
                                    this.cache.setCollection(coll);
                                    this.isReady = true;
                                    return [2 /*return*/];
                            }
                        });
                    }); })())))];
            });
        });
    };
    TransportWorker.prototype.flush = function (coll) {
        this.isReady = true;
        this.lastModified = new Date();
        this.coll = coll;
        if (this.transport.debounceMs === 0) {
            this.transport.flush(coll);
            return;
        }
        this.flushRunner.run();
    };
    TransportWorker.prototype.flushAsync = function (coll) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.isReady = true;
                this.lastModified = new Date();
                this.coll = coll;
                return [2 /*return*/, this.flushRunner.run()];
            });
        });
    };
    TransportWorker.prototype.flushInner = function () {
        if (this.transport.isAsync) {
            return this.transport.flushAsync(this.coll);
        }
        this.transport.flush(this.coll);
    };
    return TransportWorker;
}());
exports.TransportWorker = TransportWorker;
var AsyncRunner = /** @class */ (function () {
    function AsyncRunner(fn, debounce) {
        this.fn = fn;
        this.debounce = debounce;
        this.isWaiting = false;
        this.isBusy = false;
        this.timeout = null;
        this.shouldRunNext = false;
    }
    AsyncRunner.prototype.run = function () {
        var _this = this;
        if (this.isWaiting && !this.isBusy) {
            this.reset();
            return this.run();
        }
        if (this.isBusy) {
            this.shouldRunNext = true;
            return this.dfr.promise;
        }
        this.isWaiting = true;
        this.isBusy = false;
        this.dfr = new Deferred;
        this.timeout = setTimeout(function () { return _this.runInner(); }, this.debounce);
        return this.dfr.promise;
    };
    AsyncRunner.prototype.reset = function () {
        clearTimeout(this.timeout);
        this.isWaiting = false;
        this.isBusy = false;
        this.shouldRunNext = false;
    };
    AsyncRunner.prototype.runInner = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1, runNext;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isWaiting = false;
                        this.isBusy = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, this.fn()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Transport error', error_1);
                        return [3 /*break*/, 5];
                    case 4:
                        runNext = this.shouldRunNext;
                        this.dfr.resolve();
                        this.reset();
                        if (runNext) {
                            this.run();
                        }
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return AsyncRunner;
}());
var Deferred = /** @class */ (function () {
    function Deferred() {
        var _this = this;
        this.promise = new Promise(function (resolve, reject) {
            _this.resolve = resolve;
            _this.reject = reject;
        });
    }
    return Deferred;
}());
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_persistance_TransportWorker) && isObject(module.exports)) {
		Object.assign(_src_persistance_TransportWorker, module.exports);
		return;
	}
	_src_persistance_TransportWorker = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Cache;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Args_1 = _src_fn_Args;
var TransportWorker_1 = _src_persistance_TransportWorker;
var Cache = /** @class */ (function () {
    function Cache(options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        this.options = options;
        this._cache = {};
        if (this.options.monitors) {
            this.onChanged = this.onChanged.bind(this);
            options.monitors.forEach(function (x) { return x.on('change', _this.onChanged); });
        }
        if (this.options.persistance) {
            this._transport = new TransportWorker_1.TransportWorker(this, this.options.persistance);
        }
    }
    Cache.prototype.resolveKey = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _a, _b, _c;
        var key = (_c = (_a = this.options) === null || _a === void 0 ? void 0 : (_b = _a).keyResolver) === null || _c === void 0 ? void 0 : _c.call.apply(_c, __spreadArrays([_b], args));
        return (key !== null && key !== void 0 ? key : Args_1.Args.getKey(args));
    };
    Cache.prototype.get = function (key) {
        if (this._transport != null && this._transport.isReady === false) {
            this._transport.restore();
        }
        var entry = this._cache[key];
        if (entry == null) {
            return null;
        }
        if (this.options.maxAge != null && ((Date.now() - entry.timestamp) / 1000) > this.options.maxAge) {
            this.clear(key);
            return null;
        }
        return entry.value;
    };
    Cache.prototype.getAsync = function (key) {
        return __awaiter(this, void 0, Promise, function () {
            var entry;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this._transport != null && this._transport.isReady === false)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._transport.restoreAsync()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        entry = this._cache[key];
                        if (entry == null) {
                            return [2 /*return*/, null];
                        }
                        if (!(this.options.maxAge != null && ((Date.now() - entry.timestamp) / 1000) > this.options.maxAge)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.clearAsync(key)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/, entry.value];
                }
            });
        });
    };
    Cache.prototype.set = function (key, val) {
        var _a;
        this._cache[key] = {
            timestamp: Date.now(),
            value: val
        };
        (_a = this._transport) === null || _a === void 0 ? void 0 : _a.flush(this._cache);
        return val;
    };
    Cache.prototype.setAsync = function (key, val) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this._cache[key] = {
                            timestamp: Date.now(),
                            value: val
                        };
                        return [4 /*yield*/, ((_a = this._transport) === null || _a === void 0 ? void 0 : _a.flushAsync(this._cache))];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, val];
                }
            });
        });
    };
    Cache.prototype.setCollection = function (coll) {
        this._cache = (coll !== null && coll !== void 0 ? coll : {});
    };
    Cache.prototype.clear = function (key) {
        var _a;
        if (typeof key === 'string') {
            this._cache[key] = null;
        }
        else {
            this._cache = {};
        }
        (_a = this._transport) === null || _a === void 0 ? void 0 : _a.flush(this._cache);
    };
    Cache.prototype.clearAsync = function (key) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (typeof key === 'string') {
                            this._cache[key] = null;
                        }
                        else {
                            this._cache = {};
                        }
                        return [4 /*yield*/, ((_a = this._transport) === null || _a === void 0 ? void 0 : _a.flushAsync(this._cache))];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Cache.prototype.destroy = function () {
        var _this = this;
        var _a;
        this.clear();
        (_a = this.options.monitors) === null || _a === void 0 ? void 0 : _a.forEach(function (x) { return x.off('change', _this.onChanged); });
    };
    Cache.prototype.onChanged = function (key) {
        this.clear(key);
    };
    return Cache;
}());
exports.Cache = Cache;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_Cache) && isObject(module.exports)) {
		Object.assign(_src_Cache, module.exports);
		return;
	}
	_src_Cache = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_fn_memoize;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Cache_1 = _src_Cache;
function fn_memoize(fn, opts, key) {
    if (opts === void 0) { opts = {}; }
    var _a, _b, _c, _d, _e, _f;
    var _perInstance = (_b = (_a = opts) === null || _a === void 0 ? void 0 : _a.perInstance, (_b !== null && _b !== void 0 ? _b : false));
    var _clearOnReject = (_d = (_c = opts) === null || _c === void 0 ? void 0 : _c.clearOnReject, (_d !== null && _d !== void 0 ? _d : false));
    var _clearOn = (_f = (_e = opts) === null || _e === void 0 ? void 0 : _e.clearOn, (_f !== null && _f !== void 0 ? _f : null));
    var _cache = new Cache_1.Cache(opts);
    var _caches = [];
    var Wrapper = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var cache = _cache;
        if (_perInstance === true) {
            var prop = "__$mem_" + key;
            cache = this[prop];
            if (cache == null) {
                cache = new Cache_1.Cache(opts);
                Object.defineProperty(this, prop, {
                    value: cache,
                    enumerable: false
                });
                _caches.push(cache);
            }
        }
        var id = cache.resolveKey.apply(cache, args);
        var cached = cache.get(id);
        if (cached != null) {
            return cached;
        }
        var isPromise = null;
        var val = fn.apply(this, args);
        if (_clearOnReject === true) {
            isPromise = val != null && typeof val === 'object' && typeof val.then === 'function';
            if (isPromise) {
                val = val.then(null, function (err) {
                    cache.clear(id);
                    return Promise.reject(err);
                });
            }
        }
        if (_clearOn != null) {
            isPromise = (isPromise !== null && isPromise !== void 0 ? isPromise : (val != null && typeof val === 'object' && typeof val.then === 'function'));
            if (isPromise) {
                val = val.then(function (result) {
                    if (_clearOn(result)) {
                        cache.clear(id);
                    }
                    return result;
                });
            }
            else if (_clearOn(val)) {
                // don't even set to cache
                return val;
            }
        }
        return cache.set(id, val);
    };
    Wrapper.clearArgs = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var id = _cache.resolveKey.apply(_cache, args);
        _cache.clear(id);
        _caches.forEach(function (x) { return x.clear(id); });
    };
    Wrapper.clearAll = function () {
        _cache.clear();
        _caches.forEach(function (x) { return x.clear(); });
    };
    return Wrapper;
}
exports.fn_memoize = fn_memoize;
;
function fn_clearMemoized(fn) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var _a, _b, _c, _d, _e, _f;
    if (args.length === 0) {
        (_c = (_a = fn) === null || _a === void 0 ? void 0 : (_b = _a).clearAll) === null || _c === void 0 ? void 0 : _c.call(_b);
        return;
    }
    (_f = (_d = fn) === null || _d === void 0 ? void 0 : (_e = _d).clearArgs) === null || _f === void 0 ? void 0 : _f.call.apply(_f, __spreadArrays([_e], args));
    return;
}
exports.fn_clearMemoized = fn_clearMemoized;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_fn_memoize) && isObject(module.exports)) {
		Object.assign(_src_fn_memoize, module.exports);
		return;
	}
	_src_fn_memoize = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_deco_memoize;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var memoize_1 = _src_fn_memoize;
function deco_memoize(opts) {
    return function (target, propertyKey, descriptor) {
        var viaProperty = descriptor == null;
        var fn = memoize_1.fn_memoize(viaProperty ? target[propertyKey] : descriptor.value, opts, propertyKey);
        if (viaProperty) {
            target[propertyKey] = fn;
            return;
        }
        descriptor.value = fn;
        return descriptor;
    };
}
exports.deco_memoize = deco_memoize;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_deco_memoize) && isObject(module.exports)) {
		Object.assign(_src_deco_memoize, module.exports);
		return;
	}
	_src_deco_memoize = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_deco_debounce;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var requestFn = typeof requestAnimationFrame === 'undefined' ? setImmediate : requestAnimationFrame;
var clearRequest = typeof requestAnimationFrame === 'undefined' ? clearImmediate : cancelAnimationFrame;
/**
 *
 * @param timeoutMs ms to wait before calling inner fn
 */
function deco_debounce(timeoutMs) {
    return function (target, propertyKey, descriptor) {
        var viaProperty = descriptor == null;
        if (viaProperty) {
            descriptor = {
                configurable: true,
                value: target[propertyKey]
            };
        }
        var fn = descriptor.value;
        if (timeoutMs == null || timeoutMs === 0) {
            var frame_1 = 0;
            descriptor.value = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var self = this;
                if (frame_1 !== 0) {
                    clearRequest(frame_1);
                }
                frame_1 = requestFn(function () {
                    frame_1 = 0;
                    fn.apply(self, args);
                });
            };
        }
        else {
            var timer_1 = 0;
            descriptor.value = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var self = this;
                clearTimeout(timer_1);
                timer_1 = setTimeout(function () {
                    fn.apply(self, args);
                }, timeoutMs);
            };
        }
        if (viaProperty) {
            target[propertyKey] = descriptor.value;
            return;
        }
        return descriptor;
    };
}
exports.deco_debounce = deco_debounce;
;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_deco_debounce) && isObject(module.exports)) {
		Object.assign(_src_deco_debounce, module.exports);
		return;
	}
	_src_deco_debounce = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_deco_throttle;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Calls function maximal each time window frame
 * @param timeWindow how often, in ms, should the function be called
 * @param shouldCallLater start calling fn on frame start
 */
function deco_throttle(timeWindow, shouldCallLater) {
    return function (target, propertyKey, descriptor) {
        var viaProperty = descriptor == null;
        var fn = viaProperty ? target[propertyKey] : descriptor.value;
        var timer = 0;
        var latestArgs = null;
        var latestCall = 0;
        var resultFn = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var self = this;
            var now = Date.now();
            var diff = now - latestCall;
            if (diff >= timeWindow) {
                latestCall = now;
                if (shouldCallLater !== true) {
                    fn.apply(self, args);
                    return;
                }
            }
            latestArgs = args;
            if (timer === 0) {
                timer = setTimeout(function () {
                    latestCall = Date.now();
                    timer = 0;
                    fn.apply(self, latestArgs);
                }, diff >= timeWindow ? timeWindow : timeWindow - diff);
            }
        };
        if (viaProperty) {
            target[propertyKey] = resultFn;
            return;
        }
        descriptor.value = resultFn;
        return descriptor;
    };
}
exports.deco_throttle = deco_throttle;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_deco_throttle) && isObject(module.exports)) {
		Object.assign(_src_deco_throttle, module.exports);
		return;
	}
	_src_deco_throttle = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_model_Deferred;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Deferred = /** @class */ (function () {
    function Deferred() {
        var _this = this;
        this.isResolved = false;
        this.isRejected = false;
        this.promise = new Promise(function (resolve, reject) {
            _this.resolveFn = resolve;
            _this.rejectFn = reject;
            if (_this.isResolved === true) {
                resolve(_this.resolvedArg);
            }
            if (_this.isRejected === true) {
                reject(_this.rejectedArg);
            }
        });
    }
    Deferred.prototype.resolve = function (arg) {
        if (this.resolveFn) {
            this.resolveFn(arg);
            return;
        }
        this.isResolved = true;
        this.resolvedArg = arg;
    };
    Deferred.prototype.reject = function (arg) {
        if (this.rejectFn) {
            this.rejectFn(arg);
            return;
        }
        this.isRejected = true;
        this.rejectedArg = arg;
    };
    Deferred.prototype.then = function (fnA, fnB) {
        this.promise.then(fnA, fnB);
    };
    return Deferred;
}());
exports.Deferred = Deferred;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_model_Deferred) && isObject(module.exports)) {
		Object.assign(_src_model_Deferred, module.exports);
		return;
	}
	_src_model_Deferred = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_deco_queued;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Deferred_1 = _src_model_Deferred;
function deco_queued(opts) {
    if (opts === void 0) { opts = null; }
    return function (target, propertyKey, descriptor) {
        var viaProperty = descriptor == null;
        var fn = viaProperty ? target[propertyKey] : descriptor.value;
        var queue = [];
        var busy = false;
        var resultFn = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var wrapped = Queued.prepair(fn, this, args, opts);
            if (opts != null && opts.trimQueue && queue.length > 0) {
                queue.splice(0);
            }
            queue.push(wrapped);
            if (busy === false) {
                busy = true;
                tick();
            }
            return wrapped.promise;
        };
        var tick = function () {
            var x = queue.shift();
            if (x == null) {
                busy = false;
                return;
            }
            x.always(tick);
            x.run();
        };
        if (viaProperty) {
            target[propertyKey] = resultFn;
            return;
        }
        descriptor.value = resultFn;
        return descriptor;
    };
}
exports.deco_queued = deco_queued;
var Queued = {
    prepair: function (innerFn, ctx, args, opts) {
        var dfr = new Deferred_1.Deferred;
        var completed = false;
        var timeout = null;
        return {
            promise: dfr,
            run: function () {
                var _a;
                var result = innerFn.apply(ctx, args);
                if ('then' in result === false) {
                    dfr.resolve(result);
                }
                else {
                    if (((_a = opts) === null || _a === void 0 ? void 0 : _a.timeout) > 0) {
                        timeout = setTimeout(function () {
                            if (completed) {
                                return;
                            }
                            dfr.reject(new Error("Queue Worker: the inner function " + innerFn.name + " timeouted: " + opts.timeout));
                        }, opts.timeout);
                    }
                    result.then(function (_result) {
                        if (timeout != null) {
                            clearTimeout(timeout);
                        }
                        if (completed) {
                            return;
                        }
                        completed = true;
                        dfr.resolve(_result);
                    }, function (_error) {
                        if (timeout != null) {
                            clearTimeout(timeout);
                        }
                        if (completed) {
                            return;
                        }
                        completed = true;
                        dfr.reject(_error);
                    });
                }
                return result;
            },
            always: function (fn) {
                dfr.then(fn, fn);
            }
        };
    }
};
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_deco_queued) && isObject(module.exports)) {
		Object.assign(_src_deco_queued, module.exports);
		return;
	}
	_src_deco_queued = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_persistance_FsTransport;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var FsTransport = /** @class */ (function () {
    function FsTransport(opts) {
        this.opts = opts;
        this.File = null;
        this.isAsync = true;
        if (typeof process === 'undefined' || typeof process.exit !== 'function') {
            throw new Error('NodeJS expected');
        }
        var r = require;
        var module = 'atma-io';
        this.File = r(module).File;
    }
    FsTransport.prototype.restoreAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.File.existsAsync(this.opts.path)];
                    case 1:
                        if ((_a.sent()) === false) {
                            return [2 /*return*/, {}];
                        }
                        return [2 /*return*/, this.File.readAsync(this.opts.path)];
                }
            });
        });
    };
    FsTransport.prototype.flushAsync = function (coll) {
        return this.File.writeAsync(this.opts.path, coll);
    };
    return FsTransport;
}());
exports.FsTransport = FsTransport;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_persistance_FsTransport) && isObject(module.exports)) {
		Object.assign(_src_persistance_FsTransport, module.exports);
		return;
	}
	_src_persistance_FsTransport = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_persistance_LocalStorageTransport;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LocalStorageTransport = /** @class */ (function () {
    function LocalStorageTransport(opts) {
        this.opts = opts;
        this.isAsync = false;
        if (typeof localStorage === 'undefined' || typeof localStorage.setItem !== 'function') {
            throw new Error('Browser expected');
        }
    }
    LocalStorageTransport.prototype.restore = function () {
        try {
            return JSON.parse(localStorage.getItem(this.opts.key));
        }
        catch (error) {
        }
    };
    LocalStorageTransport.prototype.flush = function (coll) {
        try {
            localStorage.getItem(JSON.stringify(this.opts.key));
        }
        catch (error) {
        }
    };
    return LocalStorageTransport;
}());
exports.LocalStorageTransport = LocalStorageTransport;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_persistance_LocalStorageTransport) && isObject(module.exports)) {
		Object.assign(_src_persistance_LocalStorageTransport, module.exports);
		return;
	}
	_src_persistance_LocalStorageTransport = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_workers_CachedWorker;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var FsTransport_1 = _src_persistance_FsTransport;
var LocalStorageTransport_1 = _src_persistance_LocalStorageTransport;
var Cache_1 = _src_Cache;
var CachedWorker = /** @class */ (function () {
    function CachedWorker(opts) {
        var _a;
        this.opts = opts;
        var persistance = (_a = opts.persistance, (_a !== null && _a !== void 0 ? _a : this.getTransport()));
        if (persistance) {
            persistance.debounceMs = 0;
        }
        this.cache = new Cache_1.Cache({
            persistance: persistance,
            maxAge: opts.maxAge,
            monitors: opts.monitors,
        });
        this.worker = opts.worker;
    }
    CachedWorker.prototype.getTransport = function () {
        var t = this.opts.transport;
        if (t == null) {
            return null;
        }
        if ('path' in t) {
            return new FsTransport_1.FsTransport(t);
        }
        if ('key' in t) {
            return new LocalStorageTransport_1.LocalStorageTransport(t);
        }
        throw new Error('Invalid transport options');
    };
    CachedWorker.prototype.run = function () {
        var result = this.cache.get('result');
        if (result != null) {
            return result;
        }
        result = this.worker();
        this.cache.set('result', result);
        return result;
    };
    CachedWorker.prototype.runAsync = function () {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_b) {
                return [2 /*return*/, (_a = this.workerDfr, (_a !== null && _a !== void 0 ? _a : (this.workerDfr = (function () { return __awaiter(_this, void 0, void 0, function () {
                        var result;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.cache.getAsync('result')];
                                case 1:
                                    result = _a.sent();
                                    if (result) {
                                        return [2 /*return*/, result];
                                    }
                                    return [4 /*yield*/, this.opts.worker()];
                                case 2:
                                    result = _a.sent();
                                    return [4 /*yield*/, this.cache.setAsync('result', result)];
                                case 3:
                                    _a.sent();
                                    return [2 /*return*/, result];
                            }
                        });
                    }); })())))];
            });
        });
    };
    CachedWorker.run = function (opts) {
        return new CachedWorker(opts).run();
    };
    CachedWorker.runAsync = function (opts) {
        return new CachedWorker(opts).runAsync();
    };
    return CachedWorker;
}());
exports.CachedWorker = CachedWorker;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_workers_CachedWorker) && isObject(module.exports)) {
		Object.assign(_src_workers_CachedWorker, module.exports);
		return;
	}
	_src_workers_CachedWorker = module.exports;
}());
// end:source ./ModuleSimplified.js

"use strict";
var memoize_1 = _src_deco_memoize;
var debounce_1 = _src_deco_debounce;
var throttle_1 = _src_deco_throttle;
var queued_1 = _src_deco_queued;
var memoize_2 = _src_fn_memoize;
var Cache_1 = _src_Cache;
var FsTransport_1 = _src_persistance_FsTransport;
var LocalStorageTransport_1 = _src_persistance_LocalStorageTransport;
var CachedWorker_1 = _src_workers_CachedWorker;
var Memd = /** @class */ (function () {
    function Memd() {
    }
    Memd.Cache = Cache_1.Cache;
    Memd.fn = {
        memoize: memoize_2.fn_memoize,
        clearMemoized: memoize_2.fn_clearMemoized
    };
    Memd.deco = {
        memoize: memoize_1.deco_memoize,
        throttle: throttle_1.deco_throttle,
        debounce: debounce_1.deco_debounce,
        queued: queued_1.deco_queued
    };
    Memd.FsTransport = FsTransport_1.FsTransport;
    Memd.LocalStorageTransport = LocalStorageTransport_1.LocalStorageTransport;
    Memd.CachedWorker = CachedWorker_1.CachedWorker;
    return Memd;
}());
Memd.default = Memd;
module.exports = Memd;


}));

// end:source ./UMD.js
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_node_modules_memd_lib_memd) && isObject(module.exports)) {
		Object.assign(_node_modules_memd_lib_memd, module.exports);
		return;
	}
	_node_modules_memd_lib_memd = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_interface_EIpcMessageType;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EIpcMessageType = void 0;
var EIpcMessageType;
(function (EIpcMessageType) {
    EIpcMessageType["Rpc"] = "rpc";
    EIpcMessageType["PatchMessage"] = "patchMessage";
})(EIpcMessageType = exports.EIpcMessageType || (exports.EIpcMessageType = {}));
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_interface_EIpcMessageType) && isObject(module.exports)) {
		Object.assign(_src_interface_EIpcMessageType, module.exports);
		return;
	}
	_src_interface_EIpcMessageType = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_IpcClient;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpcClient = void 0;
var atma_utils_1 = require("atma-utils");
var memd_1 = _node_modules_memd_lib_memd;
var ipc = require("node-ipc");
var EIpcMessageType_1 = _src_interface_EIpcMessageType;
var IpcClient = /** @class */ (function (_super) {
    __extends(IpcClient, _super);
    function IpcClient(pipeName, clientId, clientOptions) {
        var _this = _super.call(this) || this;
        _this.pipeName = pipeName;
        _this.clientId = clientId;
        _this.clientOptions = clientOptions;
        _this.isConnected = false;
        _this.disposed = false;
        _this.rpcId = 0;
        _this.rpcListeners = new Map();
        _this.channelName = "memsync_".concat(pipeName);
        return _this;
    }
    IpcClient.prototype.sendPatch = function (patch) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.send(EIpcMessageType_1.EIpcMessageType.PatchMessage, patch)];
            });
        });
    };
    IpcClient.prototype.callRpc = function (method) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, Promise, function () {
            var dfr, id, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.disposed) {
                            return [2 /*return*/, Promise.reject(new Error("IpcClient was disposed"))];
                        }
                        dfr = new atma_utils_1.class_Dfr();
                        id = ++this.rpcId;
                        this.rpcListeners.set(id, dfr);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.sendRpc(id, method, args)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        this.rpcListeners.delete(id);
                        dfr.reject(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, dfr];
                }
            });
        });
    };
    IpcClient.prototype.send = function (type, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.isConnected === false)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.connect()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        ipc.of[this.channelName].emit('message', {
                            type: type,
                            data: data
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    IpcClient.prototype.sendRpc = function (id, method, args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.isConnected === false)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.connect()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        ipc.of[this.channelName].emit('message', {
                            type: EIpcMessageType_1.EIpcMessageType.Rpc,
                            id: id,
                            method: method,
                            data: args
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    IpcClient.prototype.stop = function () {
        return __awaiter(this, void 0, void 0, function () {
            var name;
            var _this = this;
            return __generator(this, function (_a) {
                name = this.channelName;
                this.disposed = true;
                ipc.config.stopRetrying = true;
                if (ipc.of[name] != null) {
                    ipc.of[name]
                        .off('error', '*')
                        .off('connect', '*')
                        .off('disconnect', '*')
                        .off('message', '*')
                        .off('onPatchMessage', '*');
                    this.socket = ipc.of[name].socket;
                }
                ipc.disconnect(name);
                this.connect.clearAll();
                setImmediate(function () {
                    _this
                        .rpcListeners
                        .forEach(function (x) { return x.reject(new Error("IpcClient is disposed")); });
                });
                return [2 /*return*/];
            });
        });
    };
    IpcClient.prototype.connect = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var _a;
            var name = _this.channelName;
            ipc.config.id = "client_".concat(_this.clientId);
            ipc.config.silent = true;
            if (((_a = _this.clientOptions) === null || _a === void 0 ? void 0 : _a.clientOnly) !== true) {
                ipc.config.maxRetries = 1;
            }
            ipc.connectTo(name, function () {
                ipc.of[name].on('connect', function () {
                    _this.isConnected = true;
                    resolve(null);
                });
                ipc.of[name].on('destroy', function () {
                    _this.isConnected = false;
                    _this.emit('disconnect');
                });
                ipc.of[name].on('message', function (data) {
                    _this.onMessage(data);
                });
                ipc.of[name].on('onPatchMessage', function (data) {
                    _this.emit('onPatchMessage', data);
                });
                ipc.of[name].on('error', function (err) {
                    reject(err);
                });
            });
        });
    };
    IpcClient.prototype.onMessage = function (data) {
        if (data.id) {
            var dfr = this.rpcListeners.get(data.id);
            if (dfr) {
                this.rpcListeners.delete(data.id);
                if (data.error) {
                    dfr.reject(data.error);
                }
                else {
                    dfr.resolve(data.result);
                }
            }
        }
    };
    __decorate([
        memd_1.default.deco.memoize()
    ], IpcClient.prototype, "connect", null);
    return IpcClient;
}(atma_utils_1.class_EventEmitter));
exports.IpcClient = IpcClient;
function wait(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_IpcClient) && isObject(module.exports)) {
		Object.assign(_src_IpcClient, module.exports);
		return;
	}
	_src_IpcClient = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_ChannelClient;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelClient = void 0;
var Channel_1 = _src_Channel;
var IpcClient_1 = _src_IpcClient;
var ChannelClient = /** @class */ (function (_super) {
    __extends(ChannelClient, _super);
    function ChannelClient(pipeName, shared, options) {
        var _this = _super.call(this, shared) || this;
        _this.pipeName = pipeName;
        _this.shared = shared;
        _this.options = options;
        _this.name = 'client';
        _this.client = new IpcClient_1.IpcClient(_this.pipeName, _this.id, _this.options);
        _this.client.on('disconnect', function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return _this.emit('disconnect');
        });
        return _this;
    }
    ChannelClient.prototype.send = function (patches) {
        return __awaiter(this, void 0, Promise, function () {
            var _a, prevPatches, netVersion;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.client.callRpc('patch', {
                            senderId: this.id,
                            netVersion: this.netVersion,
                            patches: patches,
                        })];
                    case 1:
                        _a = _b.sent(), prevPatches = _a.prevPatches, netVersion = _a.netVersion;
                        if (prevPatches) {
                            prevPatches.forEach(function (patch) {
                                _this.shared.patch(patch);
                            });
                        }
                        if (netVersion) {
                            this.netVersion = netVersion;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ChannelClient.prototype.open = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.onJoined()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ChannelClient.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.stop()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ChannelClient.prototype.getStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.callRpc('getStatus')];
                    case 1:
                        status = _a.sent();
                        return [2 /*return*/, status];
                }
            });
        });
    };
    ChannelClient.prototype.onServerCreated = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    ChannelClient.prototype.onJoined = function () {
        return __awaiter(this, void 0, void 0, function () {
            var remote;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.callRpc('sync', this.shared.toJson())];
                    case 1:
                        remote = _a.sent();
                        if (remote == null) {
                            return [2 /*return*/];
                        }
                        if (remote.timestamp > this.shared.timestamp) {
                            this.shared.setData(remote.data, remote.timestamp, remote.version);
                        }
                        this.client.on('onPatchMessage', function (message) {
                            var _a;
                            if (message.senderId === _this.id) {
                                return;
                            }
                            (_a = message.patches) === null || _a === void 0 ? void 0 : _a.forEach(function (patch) {
                                _this.shared.patch(patch.patch);
                            });
                            _this.netVersion = message.netVersion;
                            _this.shared.timestamp = message.timestamp;
                            _this.emit('receivedPatches', message.patches);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    return ChannelClient;
}(Channel_1.Channel));
exports.ChannelClient = ChannelClient;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_ChannelClient) && isObject(module.exports)) {
		Object.assign(_src_ChannelClient, module.exports);
		return;
	}
	_src_ChannelClient = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _node_modules_alot_lib_alot;
(function () {
	var exports = {};
	var module = { exports: exports };
	
// source ./UMD.js
(function(factory){
	
	var _name = 'alot',
		_global = typeof window === 'undefined' ? global : window,
		_module = {
			exports: {}
		};

	factory(_module, _module.exports, _global);

	if (typeof define === 'function' && define.amd) {
        define([], function () {
        	return _module.exports;
        });
        return;
    } 
    if (typeof module === 'object' && module.exports) {
    	module.exports = _module.exports;
    	return;
    }

	if (_name) {
		_global[_name] = _module.exports;
	}

}(function(module, exports, global){
	var _node_modules_atma_utils_lib_utils = {};
var _src_AlotProto = {};
var _src_alot = {};
var _src_async_Deferred = {};
var _src_async_Pool = {};
var _src_streams_DistinctStream = {};
var _src_streams_FilterStream = {};
var _src_streams_ForEachStream = {};
var _src_streams_ForkStream = {};
var _src_streams_GroupStream = {};
var _src_streams_IAlotStream = {};
var _src_streams_JoinStream = {};
var _src_streams_MapStream = {};
var _src_streams_SkipStream = {};
var _src_streams_SortedStream = {};
var _src_streams_TakeStream = {};
var _src_streams_exports = {};
var _src_utils_Aggregation = {};
var _src_utils_arr = {};
var _src_utils_classify = {};
var _src_utils_deco = {};
var _src_utils_obj = {};
var _src_utils_r = {};

// source ./ModuleSimplified.js
var _src_streams_IAlotStream;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_streams_IAlotStream) && isObject(module.exports)) {
		Object.assign(_src_streams_IAlotStream, module.exports);
		return;
	}
	_src_streams_IAlotStream = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _node_modules_atma_utils_lib_utils;
(function () {
	var exports = {};
	var module = { exports: exports };
	(function(factory){

	var owner, property;
	if (typeof module !== 'undefined' && module.exports) {
		owner = module;
		property = 'exports';
	}
	else {
		owner = window;
		property = 'Utils';
	}

	factory(owner, property);

}(function(owner, property){

    	var _Array_slice,
	    _Object_getOwnProp,
	    _Object_defineProperty,
	    _Array_slice,
	    _Object_getOwnProp,
	    _Object_defineProperty,
	    _Array_slice,
	    _Object_getOwnProp,
	    _Object_defineProperty,
	    _Array_slice,
	    _Object_getOwnProp,
	    _Object_defineProperty;
	var obj_getProperty,
	    obj_setProperty,
	    obj_hasProperty,
	    obj_defineProperty,
	    obj_extend,
	    obj_extendDefaults,
	    obj_extendProperties,
	    obj_extendPropertiesDefaults,
	    obj_extendMany,
	    obj_create;
	(function(){
		(function(){
			_Array_slice = Array.prototype.slice;
			var _Array_splice = Array.prototype.splice;
			var _Array_indexOf = Array.prototype.indexOf;
			var _Object_hasOwnProp = Object.hasOwnProperty;
			_Object_getOwnProp = Object.getOwnPropertyDescriptor;
			_Object_defineProperty = Object.defineProperty;
			var _global = typeof global !== 'undefined'
			    ? global
			    : window;
			var _document = typeof window !== 'undefined' && window.document != null
			    ? window.document
			    : null;
			
		}());
		obj_getProperty = function (obj_, path) {
		    if (path.indexOf('.') === -1) {
		        return obj_[path];
		    }
		    var obj = obj_, chain = path.split('.'), imax = chain.length, i = -1;
		    while (obj != null && ++i < imax) {
		        var key = chain[i];
		        if (key.charCodeAt(key.length - 1) === 63 /*?*/) {
		            key = key.slice(0, -1);
		        }
		        obj = obj[key];
		    }
		    return obj;
		}
		;
		obj_setProperty = function (obj_, path, val) {
		    if (path.indexOf('.') === -1) {
		        obj_[path] = val;
		        return;
		    }
		    var obj = obj_, chain = path.split('.'), imax = chain.length - 1, i = -1, key;
		    while (++i < imax) {
		        key = chain[i];
		        if (key.charCodeAt(key.length - 1) === 63 /*?*/) {
		            key = key.slice(0, -1);
		        }
		        var x = obj[key];
		        if (x == null) {
		            x = obj[key] = {};
		        }
		        obj = x;
		    }
		    obj[chain[i]] = val;
		}
		;
		obj_hasProperty = function (obj, path) {
		    var x = obj_getProperty(obj, path);
		    return x !== void 0;
		}
		;
		obj_defineProperty = function (obj, path, dscr) {
		    var x = obj, chain = path.split('.'), imax = chain.length - 1, i = -1, key;
		    while (++i < imax) {
		        key = chain[i];
		        if (x[key] == null)
		            x[key] = {};
		        x = x[key];
		    }
		    key = chain[imax];
		    if (_Object_defineProperty) {
		        if (dscr.writable === void 0)
		            dscr.writable = true;
		        if (dscr.configurable === void 0)
		            dscr.configurable = true;
		        if (dscr.enumerable === void 0)
		            dscr.enumerable = true;
		        _Object_defineProperty(x, key, dscr);
		        return;
		    }
		    x[key] = dscr.value === void 0
		        ? dscr.value
		        : (dscr.get && dscr.get());
		}
		;
		obj_extend = function (a, b) {
		    if (b == null)
		        return a || {};
		    if (a == null)
		        return obj_create(b);
		    for (var key in b) {
		        a[key] = b[key];
		    }
		    return a;
		}
		;
		obj_extendDefaults = function (a, b) {
		    if (b == null)
		        return a || {};
		    if (a == null)
		        return obj_create(b);
		    for (var key in b) {
		        if (a[key] == null) {
		            a[key] = b[key];
		            continue;
		        }
		        if (key === 'toString' && a[key] === Object.prototype.toString) {
		            a[key] = b[key];
		        }
		    }
		    return a;
		}
		var extendPropertiesFactory = function (overwriteProps) {
		    if (_Object_getOwnProp == null)
		        return overwriteProps ? obj_extend : obj_extendDefaults;
		    return function (a, b) {
		        if (b == null)
		            return a || {};
		        if (a == null)
		            return obj_create(b);
		        var key, descr, ownDescr;
		        for (key in b) {
		            descr = _Object_getOwnProp(b, key);
		            if (descr == null)
		                continue;
		            if (overwriteProps !== true) {
		                ownDescr = _Object_getOwnProp(a, key);
		                if (ownDescr != null) {
		                    continue;
		                }
		            }
		            if (descr.hasOwnProperty('value')) {
		                a[key] = descr.value;
		                continue;
		            }
		            _Object_defineProperty(a, key, descr);
		        }
		        return a;
		    };
		};
		obj_extendProperties = extendPropertiesFactory(true);
		obj_extendPropertiesDefaults = extendPropertiesFactory(false);
		obj_extendMany = function (a, arg1, arg2, arg3, arg4, arg5, arg6) {
		    var imax = arguments.length, i = 1;
		    for (; i < imax; i++) {
		        a = obj_extend(a, arguments[i]);
		    }
		    return a;
		}
		;
		function obj_toFastProps(obj) {
		    /*jshint -W027*/
		    function F() { }
		    F.prototype = obj;
		    new F();
		    return;
		    eval(obj);
		}
		;
		var _Object_create = Object.create || function (x) {
		    var Ctor = function () { };
		    Ctor.prototype = x;
		    return new Ctor;
		};
		obj_create = _Object_create;
		
	}());
	var class_create,
	    class_createEx;
	(function(){
		;
		/**
		 * create([...Base], Proto)
		 * Base: Function | Object
		 * Proto: Object {
		 *    constructor: ?Function
		 *    ...
		 */
		class_create = createClassFactory(obj_extendDefaults);
		// with property accessor functions support
		class_createEx = createClassFactory(obj_extendPropertiesDefaults);
		function createClassFactory(extendDefaultsFn) {
		    return function (a, b, c, d, e, f, g, h) {
		        var args = _Array_slice.call(arguments), Proto = args.pop();
		        if (Proto == null)
		            Proto = {};
		        var Ctor;
		        if (Proto.hasOwnProperty('constructor')) {
		            Ctor = Proto.constructor;
		            if (Ctor.prototype === void 0) {
		                var es6Method = Ctor;
		                Ctor = function ClassCtor() {
		                    var imax = arguments.length, i = -1, args = new Array(imax);
		                    while (++i < imax)
		                        args[i] = arguments[i];
		                    return es6Method.apply(this, args);
		                };
		            }
		        }
		        else {
		            Ctor = function ClassCtor() { };
		        }
		        var i = args.length, BaseCtor, x;
		        while (--i > -1) {
		            x = args[i];
		            if (typeof x === 'function') {
		                BaseCtor = wrapFn(x, BaseCtor);
		                x = x.prototype;
		            }
		            extendDefaultsFn(Proto, x);
		        }
		        return createClass(wrapFn(BaseCtor, Ctor), Proto);
		    };
		}
		function createClass(Ctor, Proto) {
		    Proto.constructor = Ctor;
		    Ctor.prototype = Proto;
		    return Ctor;
		}
		function wrapFn(fnA, fnB) {
		    if (fnA == null) {
		        return fnB;
		    }
		    if (fnB == null) {
		        return fnA;
		    }
		    return function () {
		        var args = _Array_slice.call(arguments);
		        var x = fnA.apply(this, args);
		        if (x !== void 0)
		            return x;
		        return fnB.apply(this, args);
		    };
		}
		
	}());
	var arr_remove,
	    arr_each,
	    arr_indexOf,
	    arr_contains,
	    arr_pushMany;
	(function(){
		arr_remove = function (array, x) {
		    var i = array.indexOf(x);
		    if (i === -1)
		        return false;
		    array.splice(i, 1);
		    return true;
		}
		;
		arr_each = function (arr, fn, ctx) {
		    arr.forEach(fn, ctx);
		}
		;
		arr_indexOf = function (arr, x) {
		    return arr.indexOf(x);
		}
		;
		arr_contains = function (arr, x) {
		    return arr.indexOf(x) !== -1;
		}
		;
		arr_pushMany = function (arr, arrSource) {
		    if (arrSource == null || arr == null || arr === arrSource)
		        return;
		    var il = arr.length, jl = arrSource.length, j = -1;
		    while (++j < jl) {
		        arr[il + j] = arrSource[j];
		    }
		}
		;
		function arr_distinct(arr, compareFn) {
		    var out = [];
		    var hash = compareFn == null ? obj_create(null) : null;
		    outer: for (var i = 0; i < arr.length; i++) {
		        var x = arr[i];
		        if (compareFn == null) {
		            if (hash[x] === 1) {
		                continue;
		            }
		            hash[x] = 1;
		        }
		        else {
		            for (var j = i - 1; j > -1; j--) {
		                var prev = arr[j];
		                if (compareFn(x, prev)) {
		                    continue outer;
		                }
		            }
		        }
		        out.push(x);
		    }
		    return out;
		}
		
	}());
	var is_Function,
	    is_Object,
	    is_Array,
	    is_ArrayLike,
	    is_String,
	    is_notEmptyString,
	    is_rawObject,
	    is_Date,
	    is_DOM,
	    is_NODE;
	(function(){
		is_Function = function (x) {
		    return typeof x === 'function';
		}
		is_Object = function (x) {
		    return x != null && typeof x === 'object';
		}
		is_Array = function (arr) {
		    return (arr != null &&
		        typeof arr === 'object' &&
		        typeof arr.length === 'number' &&
		        typeof arr.slice === 'function');
		}
		is_ArrayLike = is_Array;
		is_String = function (x) {
		    return typeof x === 'string';
		}
		is_notEmptyString = function (x) {
		    return typeof x === 'string' && x !== '';
		}
		is_rawObject = function (x) {
		    return x != null && typeof x === 'object' && x.constructor === Object;
		}
		is_Date = function (x) {
		    if (x == null || typeof x !== 'object') {
		        return false;
		    }
		    if (x.getFullYear != null && isNaN(x) === false) {
		        return true;
		    }
		    return false;
		}
		function is_PromiseLike(x) {
		    return x != null && typeof x === 'object' && typeof x.then === 'function';
		}
		function is_Observable(x) {
		    return x != null && typeof x === 'object' && typeof x.subscribe === 'function';
		}
		is_DOM = typeof window !== 'undefined' && window.navigator != null;
		is_NODE = !is_DOM;
		
	}());
	var str_format,
	    str_dedent;
	(function(){
		str_format = function (str_, a, b, c, d) {
		    var str = str_, imax = arguments.length, i = 0, x;
		    while (++i < imax) {
		        x = arguments[i];
		        if (is_Object(x) && x.toJSON) {
		            x = x.toJSON();
		        }
		        str_ = str_.replace(rgxNum(i - 1), String(x));
		    }
		    return str_;
		}
		;
		str_dedent = function (str) {
		    var rgx = /^[\t ]*\S/gm, match = rgx.exec(str), count = -1;
		    while (match != null) {
		        var x = match[0].length;
		        if (count === -1 || x < count)
		            count = x;
		        match = rgx.exec(str);
		    }
		    if (--count < 1)
		        return str;
		    var replacer = new RegExp('^[\\t ]{1,' + count + '}', 'gm');
		    return str
		        .replace(replacer, '')
		        .replace(/^[\t ]*\r?\n/, '')
		        .replace(/\r?\n[\t ]*$/, '');
		}
		;
		var rgxNum;
		(function () {
		    rgxNum = function (num) {
		        return cache_[num] || (cache_[num] = new RegExp('\\{' + num + '\\}', 'g'));
		    };
		    var cache_ = {};
		}());
		
	}());
	var error_createClass;
	(function(){
		error_createClass = function (name, Proto, stackSliceFrom) {
		    var Ctor = _createCtor(Proto, stackSliceFrom);
		    Ctor.prototype = new Error;
		    Proto.constructor = Error;
		    Proto.name = name;
		    obj_extend(Ctor.prototype, Proto);
		    return Ctor;
		}
		;
		function error_formatSource(source, index, filename) {
		    var cursor = error_cursor(source, index), lines = cursor[0], lineNum = cursor[1], rowNum = cursor[2], str = '';
		    if (filename != null) {
		        str += str_format(' at {0}:{1}:{2}\n', filename, lineNum, rowNum);
		    }
		    return str + error_formatCursor(lines, lineNum, rowNum);
		}
		;
		/**
		 * @returns [ lines, lineNum, rowNum ]
		 */
		function error_cursor(str, index) {
		    var lines = str.substring(0, index).split('\n'), line = lines.length, row = index + 1 - lines.slice(0, line - 1).join('\n').length;
		    if (line > 1) {
		        // remove trailing newline
		        row -= 1;
		    }
		    return [str.split('\n'), line, row];
		}
		;
		function error_formatCursor(lines, lineNum, rowNum) {
		    var BEFORE = 3, AFTER = 2, i = lineNum - BEFORE, imax = i + BEFORE + AFTER, str = '';
		    if (i < 0)
		        i = 0;
		    if (imax > lines.length)
		        imax = lines.length;
		    var lineNumberLength = String(imax).length, lineNumber;
		    for (; i < imax; i++) {
		        if (str)
		            str += '\n';
		        lineNumber = ensureLength(i + 1, lineNumberLength);
		        str += lineNumber + '|' + lines[i];
		        if (i + 1 === lineNum) {
		            str += '\n' + repeat(' ', lineNumberLength + 1);
		            str += lines[i].substring(0, rowNum - 1).replace(/[^\s]/g, ' ');
		            str += '^';
		        }
		    }
		    return str;
		}
		;
		function ensureLength(num, count) {
		    var str = String(num);
		    while (str.length < count) {
		        str += ' ';
		    }
		    return str;
		}
		function repeat(char_, count) {
		    var str = '';
		    while (--count > -1) {
		        str += char_;
		    }
		    return str;
		}
		function _createCtor(Proto, stackFrom) {
		    var Ctor = Proto.hasOwnProperty('constructor')
		        ? Proto.constructor
		        : null;
		    return function () {
		        var args = [];
		        for (var _i = 0; _i < arguments.length; _i++) {
		            args[_i] = arguments[_i];
		        }
		        obj_defineProperty(this, 'stack', {
		            value: _prepairStack(stackFrom || 3)
		        });
		        obj_defineProperty(this, 'message', {
		            value: str_format.apply(this, arguments)
		        });
		        if (Ctor != null) {
		            Ctor.apply(this, arguments);
		        }
		    };
		}
		function _prepairStack(sliceFrom) {
		    var stack = new Error().stack;
		    return stack == null ? null : stack
		        .split('\n')
		        .slice(sliceFrom)
		        .join('\n');
		}
		
	}());
	var fn_proxy,
	    fn_apply,
	    fn_doNothing,
	    fn_createByPattern;
	(function(){
		fn_proxy = function (fn, ctx) {
		    return function () {
		        var imax = arguments.length, args = new Array(imax), i = 0;
		        for (; i < imax; i++)
		            args[i] = arguments[i];
		        return fn_apply(fn, ctx, args);
		    };
		}
		;
		fn_apply = function (fn, ctx, args) {
		    var l = args.length;
		    if (0 === l)
		        return fn.call(ctx);
		    if (1 === l)
		        return fn.call(ctx, args[0]);
		    if (2 === l)
		        return fn.call(ctx, args[0], args[1]);
		    if (3 === l)
		        return fn.call(ctx, args[0], args[1], args[2]);
		    if (4 === l)
		        return fn.call(ctx, args[0], args[1], args[2], args[3]);
		    return fn.apply(ctx, args);
		}
		;
		fn_doNothing = function () {
		    return false;
		}
		;
		fn_createByPattern = function (definitions, ctx) {
		    var imax = definitions.length;
		    return function () {
		        var l = arguments.length, i = -1, def;
		        outer: while (++i < imax) {
		            def = definitions[i];
		            if (def.pattern.length !== l) {
		                continue;
		            }
		            var j = -1;
		            while (++j < l) {
		                var fn = def.pattern[j];
		                var val = arguments[j];
		                if (fn(val) === false) {
		                    continue outer;
		                }
		            }
		            return def.handler.apply(ctx, arguments);
		        }
		        console.error('InvalidArgumentException for a function', definitions, arguments);
		        return null;
		    };
		}
		;
		
	}());
	var class_Dfr;
	(function(){
		//@TODO remove constructr run
		class_Dfr = function (mix) {
		    if (typeof mix === 'function') {
		        return class_Dfr.run(mix);
		    }
		};
		class_Dfr.prototype = {
		    _isAsync: true,
		    _done: null,
		    _fail: null,
		    _always: null,
		    _resolved: null,
		    _rejected: null,
		    defer: function () {
		        this._rejected = null;
		        this._resolved = null;
		        return this;
		    },
		    isResolved: function () {
		        return this._resolved != null;
		    },
		    isRejected: function () {
		        return this._rejected != null;
		    },
		    isBusy: function () {
		        return this._resolved == null && this._rejected == null;
		    },
		    resolve: function () {
		        var done = this._done, always = this._always;
		        this._resolved = arguments;
		        dfr_clearListeners(this);
		        arr_callOnce(done, this, arguments);
		        arr_callOnce(always, this, [this]);
		        return this;
		    },
		    reject: function () {
		        var fail = this._fail, always = this._always;
		        this._rejected = arguments;
		        dfr_clearListeners(this);
		        arr_callOnce(fail, this, arguments);
		        arr_callOnce(always, this, [this]);
		        return this;
		    },
		    then: function (filterSuccess, filterError) {
		        return this.pipe(filterSuccess, filterError);
		    },
		    done: function (callback) {
		        if (this._rejected != null)
		            return this;
		        return dfr_bind(this, this._resolved, this._done || (this._done = []), callback);
		    },
		    fail: function (callback) {
		        if (this._resolved != null)
		            return this;
		        return dfr_bind(this, this._rejected, this._fail || (this._fail = []), callback);
		    },
		    always: function (callback) {
		        return dfr_bind(this, this._rejected || this._resolved, this._always || (this._always = []), callback);
		    },
		    pipe: function (mix /* ..methods */) {
		        var dfr;
		        if (typeof mix === 'function') {
		            dfr = new class_Dfr();
		            var done_ = mix, fail_ = arguments.length > 1
		                ? arguments[1]
		                : null;
		            this
		                .done(delegate(dfr, 'resolve', done_))
		                .fail(delegate(dfr, 'reject', fail_));
		            return dfr;
		        }
		        dfr = mix;
		        var imax = arguments.length, done = imax === 1, fail = imax === 1, i = 0, x;
		        while (++i < imax) {
		            x = arguments[i];
		            switch (x) {
		                case 'done':
		                    done = true;
		                    break;
		                case 'fail':
		                    fail = true;
		                    break;
		                default:
		                    console.error('Unsupported pipe channel', arguments[i]);
		                    break;
		            }
		        }
		        done && this.done(delegate(dfr, 'resolve'));
		        fail && this.fail(delegate(dfr, 'reject'));
		        function pipe(dfr, method) {
		            return function () {
		                dfr[method].apply(dfr, arguments);
		            };
		        }
		        function delegate(dfr, name, fn) {
		            return function () {
		                if (fn != null) {
		                    var override = fn.apply(this, arguments);
		                    if (override != null && override !== dfr) {
		                        if (isDeferred(override)) {
		                            override.then(delegate(dfr, 'resolve'), delegate(dfr, 'reject'));
		                            return;
		                        }
		                        dfr[name](override);
		                        return;
		                    }
		                }
		                dfr[name].apply(dfr, arguments);
		            };
		        }
		        return this;
		    },
		    pipeCallback: function () {
		        var self = this;
		        return function (error) {
		            if (error != null) {
		                self.reject(error);
		                return;
		            }
		            var args = _Array_slice.call(arguments, 1);
		            fn_apply(self.resolve, self, args);
		        };
		    },
		    resolveDelegate: function () {
		        return fn_proxy(this.resolve, this);
		    },
		    rejectDelegate: function () {
		        return fn_proxy(this.reject, this);
		    }
		};
		class_Dfr.resolve = function (a, b, c) {
		    var dfr = new class_Dfr();
		    return dfr.resolve.apply(dfr, _Array_slice.call(arguments));
		};
		class_Dfr.reject = function (error) {
		    var dfr = new class_Dfr();
		    return dfr.reject(error);
		};
		class_Dfr.run = function (fn, ctx) {
		    var dfr = new class_Dfr();
		    if (ctx == null)
		        ctx = dfr;
		    fn.call(ctx, fn_proxy(dfr.resolve, ctx), fn_proxy(dfr.reject, dfr), dfr);
		    return dfr;
		};
		class_Dfr.all = function (promises) {
		    var dfr = new class_Dfr, arr = new Array(promises.length), wait = promises.length, error = null;
		    if (wait === 0) {
		        return dfr.resolve(arr);
		    }
		    function tick(index) {
		        if (error != null) {
		            return;
		        }
		        var args = _Array_slice.call(arguments, 1);
		        arr.splice.apply(arr, [index, 0].concat(args));
		        if (--wait === 0) {
		            dfr.resolve(arr);
		        }
		    }
		    function onReject(err) {
		        dfr.reject(error = err);
		    }
		    var imax = promises.length, i = -1;
		    while (++i < imax) {
		        var x = promises[i];
		        if (x == null || x.then == null) {
		            tick(i);
		            continue;
		        }
		        x.then(tick.bind(null, i), onReject);
		    }
		    return dfr;
		};
		// PRIVATE
		function dfr_bind(dfr, arguments_, listeners, callback) {
		    if (callback == null)
		        return dfr;
		    if (arguments_ != null)
		        fn_apply(callback, dfr, arguments_);
		    else
		        listeners.push(callback);
		    return dfr;
		}
		function dfr_clearListeners(dfr) {
		    dfr._done = null;
		    dfr._fail = null;
		    dfr._always = null;
		}
		function arr_callOnce(arr, ctx, args) {
		    if (arr == null)
		        return;
		    var imax = arr.length, i = -1, fn;
		    while (++i < imax) {
		        fn = arr[i];
		        if (fn)
		            fn_apply(fn, ctx, args);
		    }
		    arr.length = 0;
		}
		function isDeferred(x) {
		    return x != null
		        && typeof x === 'object'
		        && is_Function(x.then);
		}
		
	}());
	var class_Uri;
	(function(){
		class_Uri = class_create({
		    protocol: null,
		    value: null,
		    path: null,
		    file: null,
		    extension: null,
		    constructor: function (uri) {
		        if (uri == null)
		            return this;
		        if (util_isUri(uri))
		            return uri.combine('');
		        uri = normalize_uri(uri);
		        this.value = uri;
		        parse_protocol(this);
		        parse_host(this);
		        parse_search(this);
		        parse_file(this);
		        // normilize path - "/some/path"
		        this.path = normalize_pathsSlashes(this.value);
		        if (/^[\w]+:\//.test(this.path)) {
		            this.path = '/' + this.path;
		        }
		        return this;
		    },
		    cdUp: function () {
		        var path = this.path;
		        if (path == null || path === '' || path === '/') {
		            return this;
		        }
		        // win32 - is base drive
		        if (/^\/?[a-zA-Z]+:\/?$/.test(path)) {
		            return this;
		        }
		        this.path = path.replace(/\/?[^\/]+\/?$/i, '');
		        return this;
		    },
		    /**
		     * '/path' - relative to host
		     * '../path', 'path','./path' - relative to current path
		     */
		    combine: function (path) {
		        if (util_isUri(path)) {
		            path = path.toString();
		        }
		        if (!path) {
		            return util_clone(this);
		        }
		        if (rgx_win32Drive.test(path)) {
		            return new class_Uri(path);
		        }
		        var uri = util_clone(this);
		        uri.value = path;
		        parse_search(uri);
		        parse_file(uri);
		        if (!uri.value) {
		            return uri;
		        }
		        path = uri.value.replace(/^\.\//i, '');
		        if (path[0] === '/') {
		            uri.path = path;
		            return uri;
		        }
		        while (/^(\.\.\/?)/ig.test(path)) {
		            uri.cdUp();
		            path = path.substring(3);
		        }
		        uri.path = normalize_pathsSlashes(util_combinePathes(uri.path, path));
		        return uri;
		    },
		    toString: function () {
		        var protocol = this.protocol ? this.protocol + '://' : '';
		        var path = util_combinePathes(this.host, this.path, this.file) + (this.search || '');
		        var str = protocol + path;
		        if (!(this.file || this.search) && this.path) {
		            str += '/';
		        }
		        return str;
		    },
		    toPathAndQuery: function () {
		        return util_combinePathes(this.path, this.file) + (this.search || '');
		    },
		    /**
		     * @return Current Uri Path{String} that is relative to @arg1 Uri
		     */
		    toRelativeString: function (uri) {
		        if (typeof uri === 'string')
		            uri = new class_Uri(uri);
		        if (this.path.indexOf(uri.path) === 0) {
		            // host folder
		            var p = this.path ? this.path.replace(uri.path, '') : '';
		            if (p[0] === '/')
		                p = p.substring(1);
		            return util_combinePathes(p, this.file) + (this.search || '');
		        }
		        // sub folder
		        var current = this.path.split('/'), relative = uri.path.split('/'), commonpath = '', i = 0, length = Math.min(current.length, relative.length);
		        for (; i < length; i++) {
		            if (current[i] === relative[i])
		                continue;
		            break;
		        }
		        if (i > 0)
		            commonpath = current.splice(0, i).join('/');
		        if (commonpath) {
		            var sub = '', path = uri.path, forward;
		            while (path) {
		                if (this.path.indexOf(path) === 0) {
		                    forward = this.path.replace(path, '');
		                    break;
		                }
		                path = path.replace(/\/?[^\/]+\/?$/i, '');
		                sub += '../';
		            }
		            return util_combinePathes(sub, forward, this.file);
		        }
		        return this.toString();
		    },
		    toLocalFile: function () {
		        var path = util_combinePathes(this.host, this.path, this.file);
		        return util_win32Path(path);
		    },
		    toLocalDir: function () {
		        var path = util_combinePathes(this.host, this.path, '/');
		        return util_win32Path(path);
		    },
		    toDir: function () {
		        var str = this.protocol ? this.protocol + '://' : '';
		        return str + util_combinePathes(this.host, this.path, '/');
		    },
		    isRelative: function () {
		        return !(this.protocol || this.host);
		    },
		    getName: function () {
		        return this.file.replace('.' + this.extension, '');
		    }
		});
		var rgx_protocol = /^([\w\d]+):\/\//, rgx_extension = /\.([\w\d]+)$/i, rgx_win32Drive = /(^\/?\w{1}:)(\/|$)/, rgx_fileWithExt = /([^\/]+(\.[\w\d]+)?)$/i;
		function util_isUri(object) {
		    return object && typeof object === 'object' && typeof object.combine === 'function';
		}
		function util_combinePathes(a, b, c, d) {
		    var args = arguments, str = '';
		    for (var i = 0, x, imax = arguments.length; i < imax; i++) {
		        x = arguments[i];
		        if (!x)
		            continue;
		        if (!str) {
		            str = x;
		            continue;
		        }
		        if (str[str.length - 1] !== '/')
		            str += '/';
		        str += x[0] === '/' ? x.substring(1) : x;
		    }
		    return str;
		}
		function normalize_pathsSlashes(str) {
		    if (str[str.length - 1] === '/') {
		        return str.substring(0, str.length - 1);
		    }
		    return str;
		}
		function util_clone(source) {
		    var uri = new class_Uri(), key;
		    for (key in source) {
		        if (typeof source[key] === 'string') {
		            uri[key] = source[key];
		        }
		    }
		    return uri;
		}
		function normalize_uri(str) {
		    return str
		        .replace(/\\/g, '/')
		        .replace(/^\.\//, '')
		        // win32 drive path
		        .replace(/^(\w+):\/([^\/])/, '/$1:/$2');
		}
		function util_win32Path(path) {
		    if (rgx_win32Drive.test(path) && path[0] === '/') {
		        return path.substring(1);
		    }
		    return path;
		}
		function parse_protocol(obj) {
		    var match = rgx_protocol.exec(obj.value);
		    if (match == null && obj.value[0] === '/') {
		        obj.protocol = 'file';
		    }
		    if (match == null)
		        return;
		    obj.protocol = match[1];
		    obj.value = obj.value.substring(match[0].length);
		}
		function parse_host(obj) {
		    if (obj.protocol == null)
		        return;
		    if (obj.protocol === 'file') {
		        var match = rgx_win32Drive.exec(obj.value);
		        if (match) {
		            obj.host = match[1];
		            obj.value = obj.value.substring(obj.host.length);
		        }
		        return;
		    }
		    var pathStart = obj.value.indexOf('/', 2);
		    obj.host = ~pathStart
		        ? obj.value.substring(0, pathStart)
		        : obj.value;
		    obj.value = obj.value.replace(obj.host, '');
		}
		function parse_search(obj) {
		    var question = obj.value.indexOf('?');
		    if (question === -1)
		        return;
		    obj.search = obj.value.substring(question);
		    obj.value = obj.value.substring(0, question);
		}
		function parse_file(obj) {
		    var match = rgx_fileWithExt.exec(obj.value), file = match == null ? null : match[1];
		    if (file == null) {
		        return;
		    }
		    obj.file = file;
		    obj.value = obj.value.substring(0, obj.value.length - file.length);
		    obj.value = normalize_pathsSlashes(obj.value);
		    match = rgx_extension.exec(file);
		    obj.extension = match == null ? null : match[1];
		}
		class_Uri.combinePathes = util_combinePathes;
		class_Uri.combine = util_combinePathes;
		
	}());
	var class_EventEmitter;
	(function(){
		class_EventEmitter = function () {
		    this._listeners = {};
		};
		class_EventEmitter.prototype = {
		    on: function (event, fn) {
		        if (fn != null) {
		            (this._listeners[event] || (this._listeners[event] = [])).push(fn);
		        }
		        return this;
		    },
		    once: function (event, fn) {
		        if (fn != null) {
		            fn._once = true;
		            (this._listeners[event] || (this._listeners[event] = [])).push(fn);
		        }
		        return this;
		    },
		    pipe: function (event) {
		        var that = this, args;
		        return function () {
		            args = _Array_slice.call(arguments);
		            args.unshift(event);
		            fn_apply(that.trigger, that, args);
		        };
		    },
		    emit: event_trigger,
		    trigger: event_trigger,
		    off: function (event, fn) {
		        var listeners = this._listeners[event];
		        if (listeners == null)
		            return this;
		        if (arguments.length === 1) {
		            listeners.length = 0;
		            return this;
		        }
		        var imax = listeners.length, i = -1;
		        while (++i < imax) {
		            if (listeners[i] === fn) {
		                listeners.splice(i, 1);
		                i--;
		                imax--;
		            }
		        }
		        return this;
		    }
		};
		function event_trigger() {
		    var args = _Array_slice.call(arguments), event = args.shift(), fns = this._listeners[event], fn, imax, i = 0;
		    if (fns == null)
		        return this;
		    for (imax = fns.length; i < imax; i++) {
		        fn = fns[i];
		        fn_apply(fn, this, args);
		        if (fn._once === true) {
		            fns.splice(i, 1);
		            i--;
		            imax--;
		        }
		    }
		    return this;
		}
		
	}());
	var Lib = {
	    class_Dfr: class_Dfr,
	    class_EventEmitter: class_EventEmitter,
	    class_Uri: class_Uri,
	    class_create: class_create,
	    class_createEx: class_createEx,
	    arr_remove: arr_remove,
	    arr_each: arr_each,
	    arr_indexOf: arr_indexOf,
	    arr_contains: arr_contains,
	    arr_pushMany: arr_pushMany,
	    error_createClass: error_createClass,
	    fn_createByPattern: fn_createByPattern,
	    fn_doNothing: fn_doNothing,
	    obj_getProperty: obj_getProperty,
	    obj_setProperty: obj_setProperty,
	    obj_hasProperty: obj_hasProperty,
	    obj_extend: obj_extend,
	    obj_extendDefaults: obj_extendDefaults,
	    obj_extendMany: obj_extendMany,
	    obj_extendProperties: obj_extendProperties,
	    obj_extendPropertiesDefaults: obj_extendPropertiesDefaults,
	    obj_create: obj_create,
	    obj_defineProperty: obj_defineProperty,
	    is_Function: is_Function,
	    is_Array: is_Array,
	    is_ArrayLike: is_ArrayLike,
	    is_String: is_String,
	    is_Object: is_Object,
	    is_notEmptyString: is_notEmptyString,
	    is_rawObject: is_rawObject,
	    is_Date: is_Date,
	    is_NODE: is_NODE,
	    is_DOM: is_DOM,
	    str_format: str_format,
	    str_dedent: str_dedent
	};
	
    
    for (var key in Lib) {
        owner[property][key] = Lib[key];
    }
}));;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_node_modules_atma_utils_lib_utils) && isObject(module.exports)) {
		Object.assign(_node_modules_atma_utils_lib_utils, module.exports);
		return;
	}
	_node_modules_atma_utils_lib_utils = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_async_Pool;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var atma_utils_1 = _node_modules_atma_utils_lib_utils;
var $$setImmediate = typeof setImmediate === 'undefined'
    ? function (fn) {
        new Promise(function () { return fn(); });
    }
    : setImmediate;
var AsyncPool = /** @class */ (function () {
    function AsyncPool(stream, threads, errors) {
        if (threads === void 0) { threads = 2; }
        if (errors === void 0) { errors = 'reject'; }
        this.stream = stream;
        this.threads = threads;
        this.errors = errors;
        this.index = -1;
        this.resolved = false;
        this.rejected = false;
        this.done = false;
        this.time = Date.now();
        this.results = [];
        this.queue = [];
        this.promise = new atma_utils_1.class_Dfr;
    }
    AsyncPool.prototype.start = function () {
        var _this = this;
        $$setImmediate(function () { return _this.tick(); });
        return this.promise;
    };
    AsyncPool.prototype.tick = function () {
        while (this.done !== true && this.queue.length < this.threads) {
            var index = ++this.index;
            var promise = this.stream.nextAsync();
            this.waitFor(promise, index);
        }
        if (this.queue.length === 0 && this.resolved !== true) {
            this.resolved = true;
            this.promise.resolve(this.results);
        }
    };
    AsyncPool.prototype.waitFor = function (promise, index) {
        var _this = this;
        this.queue.push(promise);
        promise.then(function (result) {
            $$setImmediate(function () { return _this.continueFor(promise, index, null, result); });
        }, function (error) {
            $$setImmediate(function () { return _this.continueFor(promise, index, error, null); });
        });
    };
    AsyncPool.prototype.continueFor = function (promise, index, error, result) {
        if (this.rejected === true) {
            return;
        }
        if (error != null) {
            if (this.errors === 'reject') {
                this.rejected = true;
                this.promise.reject(error);
                return;
            }
            if (this.errors === 'include') {
                result = { value: error, index: index };
            }
        }
        if (result != null) {
            if (result.done === true) {
                this.done = true;
            }
            else {
                var i_1 = result.index;
                if (i_1 == null) {
                    i_1 = index;
                }
                this.results[index] = result.value;
            }
        }
        var i = this.queue.indexOf(promise);
        this.queue.splice(i, 1);
        this.tick();
    };
    return AsyncPool;
}());
exports.AsyncPool = AsyncPool;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_async_Pool) && isObject(module.exports)) {
		Object.assign(_src_async_Pool, module.exports);
		return;
	}
	_src_async_Pool = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils_Aggregation;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Aggregation;
(function (Aggregation) {
    function getMinMaxByEntryInner(stream, getFn, compare) {
        var outVal = null;
        var outEntry = null;
        stream.reset();
        if (stream.isAsync) {
            return getMinMaxByEntryInnerAsync(stream, getFn, compare);
        }
        var i = 0;
        while (true) {
            var entry = stream.next();
            if (entry == null || entry.done === true) {
                break;
            }
            var val = getFn(entry.value, i++);
            if (val == null) {
                continue;
            }
            if (outVal == null) {
                outVal = val;
                outEntry = entry.value;
                continue;
            }
            if (compare === 'max' && outVal < val) {
                outVal = val;
                outEntry = entry.value;
            }
            if (compare === 'min' && outVal > val) {
                outVal = val;
                outEntry = entry.value;
            }
        }
        return { value: outVal, entry: outEntry };
    }
    function getMinMaxByEntryInnerAsync(stream, getFn, compare) {
        return __awaiter(this, void 0, Promise, function () {
            var outVal, outEntry, i, entry, val;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        outVal = null;
                        outEntry = null;
                        stream.reset();
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!true) return [3 /*break*/, 4];
                        return [4 /*yield*/, stream.nextAsync()];
                    case 2:
                        entry = _a.sent();
                        if (entry == null || entry.done === true) {
                            return [3 /*break*/, 4];
                        }
                        return [4 /*yield*/, getFn(entry.value, i++)];
                    case 3:
                        val = _a.sent();
                        if (val == null) {
                            return [3 /*break*/, 1];
                        }
                        if (outVal == null) {
                            outVal = val;
                            outEntry = entry.value;
                            return [3 /*break*/, 1];
                        }
                        if (compare === 'max' && outVal < val) {
                            outVal = val;
                            outEntry = entry.value;
                        }
                        if (compare === 'min' && outVal > val) {
                            outVal = val;
                            outEntry = entry.value;
                        }
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, { value: outVal, entry: outEntry }];
                }
            });
        });
    }
    function getMinMaxValueBy(stream, getFn, compare) {
        if (stream.isAsync) {
            return getMinMaxByEntryInnerAsync(stream, getFn, compare);
        }
        var x = getMinMaxByEntryInner(stream, getFn, compare);
        return x.value;
    }
    Aggregation.getMinMaxValueBy = getMinMaxValueBy;
    function getMinMaxValueByAsync(stream, getFn, compare) {
        return __awaiter(this, void 0, void 0, function () {
            var x;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getMinMaxByEntryInner(stream, getFn, compare)];
                    case 1:
                        x = _a.sent();
                        return [2 /*return*/, x.value];
                }
            });
        });
    }
    Aggregation.getMinMaxValueByAsync = getMinMaxValueByAsync;
    function getMinMaxItemBy(stream, getFn, compare) {
        if (stream.isAsync) {
            return getMinMaxByEntryInnerAsync(stream, getFn, compare);
        }
        var x = getMinMaxByEntryInner(stream, getFn, compare);
        return x.entry;
    }
    Aggregation.getMinMaxItemBy = getMinMaxItemBy;
    function getMinMaxItemByAsync(stream, getFn, compare) {
        return __awaiter(this, void 0, void 0, function () {
            var x;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getMinMaxByEntryInner(stream, getFn, compare)];
                    case 1:
                        x = _a.sent();
                        return [2 /*return*/, x.entry];
                }
            });
        });
    }
    Aggregation.getMinMaxItemByAsync = getMinMaxItemByAsync;
    function sum(stream, fn) {
        var _a;
        stream.reset();
        if (stream.isAsync) {
            return sumAsync(stream, fn);
        }
        var sum = 0;
        var i = 0;
        while (true) {
            var entry = stream.next();
            if (entry == null || entry.done === true) {
                break;
            }
            sum += (_a = fn(entry.value, i++), (_a !== null && _a !== void 0 ? _a : 0));
        }
        return sum;
    }
    Aggregation.sum = sum;
    function sumAsync(stream, fn) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var sum, i, entry, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        stream.reset();
                        sum = 0;
                        i = 0;
                        _c.label = 1;
                    case 1:
                        if (!true) return [3 /*break*/, 4];
                        return [4 /*yield*/, stream.nextAsync()];
                    case 2:
                        entry = _c.sent();
                        if (entry == null || entry.done === true) {
                            return [3 /*break*/, 4];
                        }
                        _b = sum;
                        return [4 /*yield*/, fn(entry.value, i++)];
                    case 3:
                        sum = _b + (_a = (_c.sent()), (_a !== null && _a !== void 0 ? _a : 0));
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, sum];
                }
            });
        });
    }
    Aggregation.sumAsync = sumAsync;
})(Aggregation = exports.Aggregation || (exports.Aggregation = {}));
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_utils_Aggregation) && isObject(module.exports)) {
		Object.assign(_src_utils_Aggregation, module.exports);
		return;
	}
	_src_utils_Aggregation = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_AlotProto;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Pool_1 = _src_async_Pool;
var Aggregation_1 = _src_utils_Aggregation;
var exports_1 = _src_streams_exports;
var AlotProto = /** @class */ (function () {
    function AlotProto(stream, opts) {
        var _a, _b;
        this.stream = stream;
        this.isAsync = false;
        this.isAsync = stream.isAsync || (_b = (_a = opts) === null || _a === void 0 ? void 0 : _a.async, (_b !== null && _b !== void 0 ? _b : false));
    }
    AlotProto.prototype.next = function () {
        return this.stream.next();
    };
    AlotProto.prototype.nextAsync = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.next()];
            });
        });
    };
    AlotProto.prototype.reset = function () {
        this.stream.reset();
        return this;
    };
    AlotProto.prototype.filter = function (fn) {
        return new exports_1.FilterStream(this, fn);
    };
    AlotProto.prototype.filterAsync = function (fn) {
        return new exports_1.FilterStreamAsync(this, fn);
    };
    AlotProto.prototype.map = function (fn) {
        return new exports_1.MapStream(this, fn);
    };
    AlotProto.prototype.mapAsync = function (fn, meta) {
        return new exports_1.MapStream(this, fn, { async: true });
    };
    AlotProto.prototype.mapMany = function (fn) {
        return new exports_1.MapManyStream(this, fn);
    };
    AlotProto.prototype.mapManyAsync = function (fn) {
        return new exports_1.MapManyStream(this, fn, { async: true });
    };
    AlotProto.prototype.forEach = function (fn) {
        return new exports_1.ForEachStream(this, fn);
    };
    AlotProto.prototype.forEachAsync = function (fn) {
        return new exports_1.ForEachStream(this, fn, { async: true });
    };
    AlotProto.prototype.take = function (count) {
        return new exports_1.TakeStream(this, count);
    };
    AlotProto.prototype.takeWhile = function (fn) {
        return new exports_1.TakeWhileStream(this, fn);
    };
    AlotProto.prototype.skip = function (count) {
        return new exports_1.SkipStream(this, count);
    };
    AlotProto.prototype.skipWhile = function (fn) {
        return new exports_1.SkipWhileStream(this, fn);
    };
    AlotProto.prototype.groupBy = function (fn) {
        return new exports_1.GroupByStream(this, fn);
    };
    /** Join Left Inner  */
    AlotProto.prototype.join = function (inner, getKey, getForeignKey, joinFn) {
        return new exports_1.JoinStream(this, inner, getKey, getForeignKey, joinFn, 'inner');
    };
    /** Join Full Outer  */
    AlotProto.prototype.joinOuter = function (inner, getKey, getForeignKey, joinFn) {
        return new exports_1.JoinStream(this, inner, getKey, getForeignKey, joinFn, 'outer');
    };
    AlotProto.prototype.distinctBy = function (fn) {
        return new exports_1.DistinctByStream(this, fn);
    };
    AlotProto.prototype.distinct = function () {
        return new exports_1.DistinctByStream(this);
    };
    AlotProto.prototype.sortBy = function (mix, direction) {
        if (direction === void 0) { direction = 'asc'; }
        return new exports_1.SortByStream(this, mix, direction);
    };
    AlotProto.prototype.fork = function (fn) {
        var inner = new exports_1.ForkStreamInner(this, fn);
        var outer = new exports_1.ForkStreamOuter(this, inner);
        return outer;
    };
    AlotProto.prototype.toDictionary = function (keyFn, valFn) {
        this.reset();
        var hash = Object.create(null);
        while (true) {
            var x = this.next();
            if (x.done) {
                return hash;
            }
            var key = keyFn(x.value);
            hash[key] = valFn ? valFn(x.value) : x.value;
        }
    };
    AlotProto.prototype.toDictionaryAsync = function (keyFn, valFn) {
        return __awaiter(this, void 0, Promise, function () {
            var hash, x, key, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.reset();
                        hash = Object.create(null);
                        _d.label = 1;
                    case 1:
                        if (!true) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.nextAsync()];
                    case 2:
                        x = _d.sent();
                        if (x.done) {
                            return [2 /*return*/, hash];
                        }
                        return [4 /*yield*/, keyFn(x.value)];
                    case 3:
                        key = _d.sent();
                        _a = hash;
                        _b = key;
                        if (!valFn) return [3 /*break*/, 5];
                        return [4 /*yield*/, valFn(x.value)];
                    case 4:
                        _c = _d.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        _c = x.value;
                        _d.label = 6;
                    case 6:
                        _a[_b] = _c;
                        return [3 /*break*/, 1];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    AlotProto.prototype.toArray = function () {
        this.reset();
        var out = [];
        while (true) {
            var result = this.next();
            if (result.done === true) {
                break;
            }
            out.push(result.value);
        }
        return out;
    };
    AlotProto.prototype.toArrayAsync = function (meta) {
        if (meta === void 0) { meta = { threads: 4, errors: 'reject' }; }
        this.reset();
        var pool = new Pool_1.AsyncPool(this, meta.threads, meta.errors);
        return pool.start();
    };
    AlotProto.prototype.first = function (matcher) {
        this.reset();
        var i = 0;
        while (true) {
            var entry = this.next();
            if (entry == null || entry.done === true) {
                break;
            }
            if (matcher == null || matcher(entry.value, i++)) {
                return entry.value;
            }
        }
        return null;
    };
    AlotProto.prototype.find = function (matcher) {
        return this.first(matcher);
    };
    AlotProto.prototype.sum = function (getVal) {
        return Aggregation_1.Aggregation.sum(this, getVal);
    };
    AlotProto.prototype.sumAsync = function (getVal) {
        return Aggregation_1.Aggregation.sumAsync(this, getVal);
    };
    AlotProto.prototype.max = function (fn) {
        return Aggregation_1.Aggregation.getMinMaxValueBy(this, fn, 'max');
    };
    AlotProto.prototype.maxAsync = function (fn) {
        return Aggregation_1.Aggregation.getMinMaxValueByAsync(this, fn, 'max');
    };
    AlotProto.prototype.maxItem = function (fn) {
        return Aggregation_1.Aggregation.getMinMaxItemBy(this, fn, 'max');
    };
    AlotProto.prototype.maxItemAsync = function (fn) {
        return Aggregation_1.Aggregation.getMinMaxItemByAsync(this, fn, 'max');
    };
    AlotProto.prototype.min = function (fn) {
        return Aggregation_1.Aggregation.getMinMaxValueBy(this, fn, 'min');
    };
    AlotProto.prototype.minAsync = function (fn) {
        return Aggregation_1.Aggregation.getMinMaxValueByAsync(this, fn, 'min');
    };
    AlotProto.prototype.minItem = function (fn) {
        return Aggregation_1.Aggregation.getMinMaxItemBy(this, fn, 'min');
    };
    AlotProto.prototype.minItemAsync = function (fn) {
        return Aggregation_1.Aggregation.getMinMaxItemByAsync(this, fn, 'min');
    };
    return AlotProto;
}());
exports.AlotProto = AlotProto;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_AlotProto) && isObject(module.exports)) {
		Object.assign(_src_AlotProto, module.exports);
		return;
	}
	_src_AlotProto = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_async_Deferred;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Deferred = /** @class */ (function () {
    function Deferred() {
        var _this = this;
        this.isResolved = false;
        this.isRejected = false;
        this.promise = new Promise(function (resolve, reject) {
            _this.resolveFn = resolve;
            _this.rejectFn = reject;
            if (_this.isResolved === true) {
                resolve(_this.resolvedArg);
            }
            if (_this.isRejected === true) {
                reject(_this.rejectedArg);
            }
        });
    }
    Deferred.prototype.resolve = function (arg) {
        if (this.resolveFn) {
            this.resolveFn(arg);
            return;
        }
        this.isResolved = true;
        this.resolvedArg = arg;
    };
    Deferred.prototype.reject = function (arg) {
        if (this.rejectFn) {
            this.rejectFn(arg);
            return;
        }
        this.isRejected = true;
        this.rejectedArg = arg;
    };
    Deferred.prototype.then = function (fnA, fnB) {
        this.promise.then(fnA, fnB);
    };
    return Deferred;
}());
exports.Deferred = Deferred;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_async_Deferred) && isObject(module.exports)) {
		Object.assign(_src_async_Deferred, module.exports);
		return;
	}
	_src_async_Deferred = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils_deco;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Deferred_1 = _src_async_Deferred;
exports.Deco = {
    queued: function (opts) {
        if (opts === void 0) { opts = null; }
        return function (target, propertyKey, descriptor) {
            var viaProperty = descriptor == null;
            var fn = viaProperty ? target[propertyKey] : descriptor.value;
            var queue = [];
            var busy = false;
            var resultFn = function () {
                var wrapped = Queued.prepair(fn, this);
                if (opts != null && opts.trimQueue && queue.length > 0) {
                    queue.splice(0);
                }
                queue.push(wrapped);
                if (busy === false) {
                    busy = true;
                    tick();
                }
                return wrapped.promise;
            };
            var tick = function () {
                var x = queue.shift();
                if (x == null) {
                    busy = false;
                    return;
                }
                x.always(tick);
                x.run.apply(this, arguments);
            };
            if (viaProperty) {
                target[propertyKey] = resultFn;
                return;
            }
            descriptor.value = resultFn;
            return descriptor;
        };
    }
};
var Queued = {
    prepair: function (fn, ctx) {
        var dfr = new Deferred_1.Deferred;
        return {
            promise: dfr,
            run: function () {
                var result = fn.apply(ctx, arguments);
                if ('then' in result === false) {
                    dfr.resolve(result);
                }
                else {
                    result.then(function (_result) {
                        dfr.resolve(_result);
                    }, function (_error) {
                        dfr.reject(_error);
                    });
                }
                return result;
            },
            always: function (fn) {
                dfr.then(fn, fn);
            }
        };
    }
};
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_utils_deco) && isObject(module.exports)) {
		Object.assign(_src_utils_deco, module.exports);
		return;
	}
	_src_utils_deco = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_streams_FilterStream;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var AlotProto_1 = _src_AlotProto;
var deco_1 = _src_utils_deco;
var FilterStream = /** @class */ (function (_super) {
    __extends(FilterStream, _super);
    function FilterStream(stream, fn) {
        var _this = _super.call(this, stream) || this;
        _this.stream = stream;
        _this.fn = fn;
        return _this;
    }
    FilterStream.prototype.next = function () {
        while (true) {
            var result = this.stream.next();
            if (result.done === true) {
                return result;
            }
            var b = this.fn(result.value, result.index);
            if (Boolean(b) === false) {
                continue;
            }
            return result;
        }
    };
    return FilterStream;
}(AlotProto_1.AlotProto));
exports.FilterStream = FilterStream;
var FilterStreamAsync = /** @class */ (function (_super) {
    __extends(FilterStreamAsync, _super);
    function FilterStreamAsync(stream, fn) {
        var _this = _super.call(this, stream) || this;
        _this.stream = stream;
        _this.fn = fn;
        _this.isAsync = true;
        _this._index = -1;
        _this.next = _this.nextAsync;
        return _this;
    }
    FilterStreamAsync.prototype.nextAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, result, b;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = ++this._index;
                        _a.label = 1;
                    case 1:
                        if (!true) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.stream.next()];
                    case 2:
                        result = _a.sent();
                        if (result.done === true) {
                            return [2 /*return*/, result];
                        }
                        return [4 /*yield*/, this.fn(result.value, result.index)];
                    case 3:
                        b = _a.sent();
                        if (Boolean(b) === false) {
                            return [3 /*break*/, 1];
                        }
                        result.index = i;
                        return [2 /*return*/, result];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FilterStreamAsync.prototype.reset = function () {
        this._index = -1;
        return _super.prototype.reset.call(this);
    };
    FilterStreamAsync.prototype.toArrayAsync = function (meta) {
        if (meta === void 0) { meta = { threads: 4 }; }
        return __awaiter(this, void 0, Promise, function () {
            var arr;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.reset();
                        return [4 /*yield*/, this.mapAsync(function (item, i) { return __awaiter(_this, void 0, void 0, function () {
                                var flag;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.fn(item, i)];
                                        case 1:
                                            flag = _a.sent();
                                            return [2 /*return*/, {
                                                    value: item,
                                                    flag: flag
                                                }];
                                    }
                                });
                            }); }, meta).toArrayAsync()];
                    case 1:
                        arr = _a.sent();
                        return [2 /*return*/, arr.filter(function (x) { return x.flag; }).map(function (x) { return x.value; })];
                }
            });
        });
    };
    __decorate([
        deco_1.Deco.queued()
    ], FilterStreamAsync.prototype, "nextAsync", null);
    return FilterStreamAsync;
}(AlotProto_1.AlotProto));
exports.FilterStreamAsync = FilterStreamAsync;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_streams_FilterStream) && isObject(module.exports)) {
		Object.assign(_src_streams_FilterStream, module.exports);
		return;
	}
	_src_streams_FilterStream = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils_r;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.r_DONE = { done: true, value: null };
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_utils_r) && isObject(module.exports)) {
		Object.assign(_src_utils_r, module.exports);
		return;
	}
	_src_utils_r = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_streams_MapStream;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var AlotProto_1 = _src_AlotProto;
var r_1 = _src_utils_r;
var MapStream = /** @class */ (function (_super) {
    __extends(MapStream, _super);
    function MapStream(stream, fn, opts) {
        var _this = _super.call(this, stream, opts) || this;
        _this.stream = stream;
        _this.fn = fn;
        _this._index = 0;
        return _this;
    }
    MapStream.prototype.next = function () {
        if (this.isAsync) {
            return this.nextAsync();
        }
        var result = this.stream.next();
        if (result.done) {
            return { value: null, done: true };
        }
        return {
            value: this.fn(result.value, this._index++),
            done: false
        };
    };
    MapStream.prototype.nextAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.stream.nextAsync()];
                    case 1:
                        result = _b.sent();
                        if (result.done) {
                            //* skipped extra-object
                            result.value = null;
                            return [2 /*return*/, result];
                        }
                        _a = {};
                        return [4 /*yield*/, this.fn(result.value, this._index++)];
                    case 2: return [2 /*return*/, (_a.value = _b.sent(),
                            _a.done = false,
                            _a)];
                }
            });
        });
    };
    MapStream.prototype.reset = function () {
        this._index = 0;
        return _super.prototype.reset.call(this);
    };
    return MapStream;
}(AlotProto_1.AlotProto));
exports.MapStream = MapStream;
var MapManyStream = /** @class */ (function (_super) {
    __extends(MapManyStream, _super);
    function MapManyStream(stream, fn, opts) {
        var _this = _super.call(this, stream) || this;
        _this.stream = stream;
        _this.fn = fn;
        _this.opts = opts;
        _this._index = -1;
        _this._many = null;
        _this._mapDfr = null;
        _this._done = false;
        _this.isAsync = stream.isAsync || opts && opts.async;
        return _this;
    }
    MapManyStream.prototype.next = function () {
        if (this.opts != null && this.opts.async) {
            return this.nextAsync();
        }
        if (this._many != null && this._index < this._many.length - 1) {
            var x = this._many[++this._index];
            return { done: false, value: x };
        }
        var result = this.stream.next();
        if (result.done) {
            return result;
        }
        this._many = this.fn(result.value, result.index);
        this._index = -1;
        return this.next();
    };
    MapManyStream.prototype.nextAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var x;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._done === true) {
                            return [2 /*return*/, r_1.r_DONE];
                        }
                        if (this._many != null && this._index < this._many.length - 1) {
                            x = this._many[++this._index];
                            return [2 /*return*/, { done: false, value: x }];
                        }
                        if (this._mapDfr == null) {
                            this._doMapAsync();
                        }
                        return [4 /*yield*/, this._mapDfr];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.nextAsync()];
                }
            });
        });
    };
    MapManyStream.prototype.reset = function () {
        this._many = null;
        this._done = false;
        this._mapDfr = null;
        this._index = -1;
        return _super.prototype.reset.call(this);
    };
    MapManyStream.prototype._doMapAsync = function () {
        var _this = this;
        return this._mapDfr = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.stream.next()];
                    case 1:
                        result = _b.sent();
                        if (result.done) {
                            this._done = true;
                            this._mapDfr = null;
                            resolve();
                            return [2 /*return*/];
                        }
                        _a = this;
                        return [4 /*yield*/, this.fn(result.value, result.index)];
                    case 2:
                        _a._many = _b.sent();
                        this._index = -1;
                        this._mapDfr = null;
                        resolve();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    return MapManyStream;
}(AlotProto_1.AlotProto));
exports.MapManyStream = MapManyStream;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_streams_MapStream) && isObject(module.exports)) {
		Object.assign(_src_streams_MapStream, module.exports);
		return;
	}
	_src_streams_MapStream = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_streams_TakeStream;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AlotProto_1 = _src_AlotProto;
var TakeStream = /** @class */ (function (_super) {
    __extends(TakeStream, _super);
    function TakeStream(stream, _count) {
        var _this = _super.call(this, stream) || this;
        _this.stream = stream;
        _this._count = _count;
        _this._took = 0;
        return _this;
    }
    TakeStream.prototype.next = function () {
        if (++this._took > this._count) {
            return { value: null, done: true };
        }
        return this.stream.next();
    };
    TakeStream.prototype.reset = function () {
        this._took = 0;
        return _super.prototype.reset.call(this);
    };
    return TakeStream;
}(AlotProto_1.AlotProto));
exports.TakeStream = TakeStream;
var TakeWhileStream = /** @class */ (function (_super) {
    __extends(TakeWhileStream, _super);
    function TakeWhileStream(stream, fn) {
        var _this = _super.call(this, stream) || this;
        _this.stream = stream;
        _this.fn = fn;
        _this._took = false;
        return _this;
    }
    TakeWhileStream.prototype.next = function () {
        if (this._took === true) {
            return { done: true, value: null };
        }
        var result = this.stream.next();
        if (result.done) {
            return result;
        }
        if (this.fn(result.value) === false) {
            this._took = true;
            return this.next();
        }
        return result;
    };
    TakeWhileStream.prototype.reset = function () {
        this._took = false;
        return _super.prototype.reset.call(this);
    };
    return TakeWhileStream;
}(AlotProto_1.AlotProto));
exports.TakeWhileStream = TakeWhileStream;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_streams_TakeStream) && isObject(module.exports)) {
		Object.assign(_src_streams_TakeStream, module.exports);
		return;
	}
	_src_streams_TakeStream = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_streams_SkipStream;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AlotProto_1 = _src_AlotProto;
var SkipStream = /** @class */ (function (_super) {
    __extends(SkipStream, _super);
    function SkipStream(stream, _count) {
        var _this = _super.call(this, stream) || this;
        _this.stream = stream;
        _this._count = _count;
        _this._skipped = 0;
        return _this;
    }
    SkipStream.prototype.next = function () {
        while (++this._skipped <= this._count) {
            var skip = this.stream.next();
            if (skip.done) {
                return skip;
            }
            continue;
        }
        return this.stream.next();
    };
    SkipStream.prototype.reset = function () {
        this._skipped = 0;
        return _super.prototype.reset.call(this);
    };
    return SkipStream;
}(AlotProto_1.AlotProto));
exports.SkipStream = SkipStream;
var SkipWhileStream = /** @class */ (function (_super) {
    __extends(SkipWhileStream, _super);
    function SkipWhileStream(stream, fn) {
        var _this = _super.call(this, stream) || this;
        _this.stream = stream;
        _this.fn = fn;
        _this._skipped = false;
        return _this;
    }
    SkipWhileStream.prototype.next = function () {
        while (this._skipped === false) {
            var result = this.stream.next();
            if (result.done) {
                return result;
            }
            if (this.fn(result.value)) {
                continue;
            }
            this._skipped = true;
        }
        return this.stream.next();
    };
    SkipWhileStream.prototype.reset = function () {
        this._skipped = false;
        return _super.prototype.reset.call(this);
    };
    return SkipWhileStream;
}(AlotProto_1.AlotProto));
exports.SkipWhileStream = SkipWhileStream;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_streams_SkipStream) && isObject(module.exports)) {
		Object.assign(_src_streams_SkipStream, module.exports);
		return;
	}
	_src_streams_SkipStream = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_streams_GroupStream;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AlotProto_1 = _src_AlotProto;
var GroupByStream = /** @class */ (function (_super) {
    __extends(GroupByStream, _super);
    function GroupByStream(stream, fn) {
        var _this = _super.call(this, stream) || this;
        _this.stream = stream;
        _this.fn = fn;
        _this.isAsync = false;
        _this.groups = null;
        _this.hash = null;
        _this.index = -1;
        return _this;
    }
    GroupByStream.prototype.next = function () {
        if (this.groups) {
            if (++this.index >= this.groups.length) {
                return { done: true, value: null };
            }
            return {
                done: false,
                index: this.index,
                value: this.groups[this.index]
            };
        }
        this.groups = [];
        this.hash = Object.create(null);
        while (true) {
            var result = this.stream.next();
            if (result.done === true) {
                break;
            }
            var keyVal = this.fn(result.value, result.index);
            var key = String(keyVal);
            var arr = this.hash[key];
            if (arr == null) {
                arr = this.hash[key] = [];
                this.groups.push({
                    key: keyVal,
                    values: arr
                });
            }
            arr.push(result.value);
        }
        return this.next();
    };
    GroupByStream.prototype.reset = function () {
        this.index = -1;
        return _super.prototype.reset.call(this);
    };
    return GroupByStream;
}(AlotProto_1.AlotProto));
exports.GroupByStream = GroupByStream;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_streams_GroupStream) && isObject(module.exports)) {
		Object.assign(_src_streams_GroupStream, module.exports);
		return;
	}
	_src_streams_GroupStream = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_streams_DistinctStream;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AlotProto_1 = _src_AlotProto;
var DistinctByStream = /** @class */ (function (_super) {
    __extends(DistinctByStream, _super);
    function DistinctByStream(stream, fn) {
        if (fn === void 0) { fn = null; }
        var _this = _super.call(this, stream) || this;
        _this.stream = stream;
        _this.fn = fn;
        _this._track = new Track;
        _this._index = -1;
        return _this;
    }
    DistinctByStream.prototype.next = function () {
        while (true) {
            var result = this.stream.next();
            if (result.done === true) {
                return result;
            }
            var key = this.fn != null
                ? this.fn(result.value, result.index)
                : result.value;
            if (this._track.isUnique(key) === false) {
                continue;
            }
            return result;
        }
    };
    DistinctByStream.prototype.reset = function () {
        this._index = -1;
        this._track = new Track;
        return _super.prototype.reset.call(this);
    };
    return DistinctByStream;
}(AlotProto_1.AlotProto));
exports.DistinctByStream = DistinctByStream;
var Track = /** @class */ (function () {
    function Track() {
        this._hash = Object.create(null);
    }
    Track.prototype.isUnique = function (mix) {
        if (mix == null || typeof mix !== 'object') {
            if (mix in this._hash) {
                return false;
            }
            this._hash[mix] = 1;
            return true;
        }
        if (this._map == null) {
            this._map = new Map();
        }
        if (this._map.has(mix)) {
            return false;
        }
        this._map.set(mix, 1);
        return true;
    };
    return Track;
}());
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_streams_DistinctStream) && isObject(module.exports)) {
		Object.assign(_src_streams_DistinctStream, module.exports);
		return;
	}
	_src_streams_DistinctStream = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_streams_ForEachStream;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var AlotProto_1 = _src_AlotProto;
var ForEachStream = /** @class */ (function (_super) {
    __extends(ForEachStream, _super);
    function ForEachStream(stream, fn, opts) {
        var _this = _super.call(this, stream, opts) || this;
        _this.stream = stream;
        _this.fn = fn;
        _this._index = 0;
        return _this;
    }
    ForEachStream.prototype.next = function () {
        if (this.isAsync === true) {
            return this.nextAsync();
        }
        var result = this.stream.next();
        if (result.done) {
            return result;
        }
        this.fn(result.value, this._index++);
        return result;
    };
    ForEachStream.prototype.nextAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.stream.nextAsync()];
                    case 1:
                        item = _a.sent();
                        if (item.done) {
                            //* skipped extra-object
                            item.value = null;
                            return [2 /*return*/, item];
                        }
                        return [4 /*yield*/, this.fn(item.value, this._index++)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                value: item.value,
                                done: false
                            }];
                }
            });
        });
    };
    ForEachStream.prototype.reset = function () {
        this._index = 0;
        return _super.prototype.reset.call(this);
    };
    return ForEachStream;
}(AlotProto_1.AlotProto));
exports.ForEachStream = ForEachStream;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_streams_ForEachStream) && isObject(module.exports)) {
		Object.assign(_src_streams_ForEachStream, module.exports);
		return;
	}
	_src_streams_ForEachStream = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils_arr;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function arr_last(arr) {
    if (arr == null || arr.length === 0) {
        return null;
    }
    return arr[arr.length - 1];
}
exports.arr_last = arr_last;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_utils_arr) && isObject(module.exports)) {
		Object.assign(_src_utils_arr, module.exports);
		return;
	}
	_src_utils_arr = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_streams_ForkStream;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var AlotProto_1 = _src_AlotProto;
var arr_1 = _src_utils_arr;
var ForkStreamInner = /** @class */ (function (_super) {
    __extends(ForkStreamInner, _super);
    function ForkStreamInner(stream, fn) {
        var _this = _super.call(this, stream) || this;
        _this.stream = stream;
        _this.fn = fn;
        _this._cached = [];
        return _this;
    }
    ForkStreamInner.prototype.next = function () {
        var _a;
        if (this.isAsync) {
            return this.nextAsync();
        }
        var last = arr_1.arr_last(this._cached);
        if ((_a = last) === null || _a === void 0 ? void 0 : _a.done) {
            return last;
        }
        var result = this.stream.next();
        this._cached.push(result);
        return result;
    };
    ForkStreamInner.prototype.nextAsync = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var last, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        last = arr_1.arr_last(this._cached);
                        if ((_a = last) === null || _a === void 0 ? void 0 : _a.done) {
                            return [2 /*return*/, last];
                        }
                        return [4 /*yield*/, this.stream.nextAsync()];
                    case 1:
                        result = _b.sent();
                        this._cached.push(result);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    ForkStreamInner.prototype.reset = function () {
        this._cached = [];
        return _super.prototype.reset.call(this);
    };
    ForkStreamInner.prototype.pluck = function () {
        return this.fn(this);
    };
    ForkStreamInner.prototype.has = function (i) {
        return i < this._cached.length;
    };
    ForkStreamInner.prototype.get = function (i) {
        return this._cached[i];
    };
    return ForkStreamInner;
}(AlotProto_1.AlotProto));
exports.ForkStreamInner = ForkStreamInner;
var ForkStreamOuter = /** @class */ (function (_super) {
    __extends(ForkStreamOuter, _super);
    function ForkStreamOuter(stream, inner) {
        var _this = _super.call(this, stream) || this;
        _this.stream = stream;
        _this.inner = inner;
        _this._index = 0;
        _this._plucked = false;
        return _this;
    }
    ForkStreamOuter.prototype.next = function () {
        if (this.isAsync) {
            return this.nextAsync();
        }
        if (this._plucked === false) {
            this._plucked = true;
            this.inner.pluck();
        }
        if (this.inner.has(this._index)) {
            var result = this.inner.get(this._index);
            if (result.done !== true) {
                this._index++;
            }
            return result;
        }
        return this.stream.next();
    };
    ForkStreamOuter.prototype.nextAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this._plucked === false)) return [3 /*break*/, 2];
                        this._plucked = true;
                        return [4 /*yield*/, this.inner.pluck()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (this.inner.has(this._index)) {
                            result = this.inner.get(this._index);
                            if (result.done !== true) {
                                this._index++;
                            }
                            return [2 /*return*/, result];
                        }
                        return [2 /*return*/, this.stream.nextAsync()];
                }
            });
        });
    };
    ForkStreamOuter.prototype.reset = function () {
        this._index = 0;
        return _super.prototype.reset.call(this);
    };
    return ForkStreamOuter;
}(AlotProto_1.AlotProto));
exports.ForkStreamOuter = ForkStreamOuter;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_streams_ForkStream) && isObject(module.exports)) {
		Object.assign(_src_streams_ForkStream, module.exports);
		return;
	}
	_src_streams_ForkStream = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils_obj;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function obj_getProperty(obj_, path) {
    if (obj_ == null) {
        return null;
    }
    if (path.indexOf('.') === -1) {
        return obj_[path];
    }
    var obj = obj_;
    var chain = path.split('.');
    var imax = chain.length;
    var i = -1;
    while (obj != null && ++i < imax) {
        var key = chain[i];
        obj = obj[key];
    }
    return obj;
}
exports.obj_getProperty = obj_getProperty;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_utils_obj) && isObject(module.exports)) {
		Object.assign(_src_utils_obj, module.exports);
		return;
	}
	_src_utils_obj = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_streams_SortedStream;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AlotProto_1 = _src_AlotProto;
var obj_1 = _src_utils_obj;
var SortByStream = /** @class */ (function (_super) {
    __extends(SortByStream, _super);
    // constructor(stream: IAlotStream<T>, sortByFn: SortMethod<T>, direction?: 'asc' | 'desc')
    // constructor(stream: IAlotStream<T>, sortByKey: string, direction?: 'asc' | 'desc')
    function SortByStream(stream, mix, direction) {
        if (direction === void 0) { direction = 'asc'; }
        var _this = _super.call(this, stream) || this;
        _this.stream = stream;
        _this.direction = direction;
        _this.isAsync = false;
        _this.arr = null;
        _this.index = -1;
        if (typeof mix === 'string') {
            var path_1 = mix;
            _this.sortByFn = function (x) { return obj_1.obj_getProperty(x, path_1); };
        }
        else {
            _this.sortByFn = mix;
        }
        return _this;
    }
    SortByStream.prototype.next = function () {
        var _this = this;
        if (this.arr) {
            if (++this.index >= this.arr.length) {
                return { done: true, value: null };
            }
            return {
                done: false,
                index: this.index,
                value: this.arr[this.index]
            };
        }
        this.arr = [];
        while (true) {
            var result_1 = this.stream.next();
            if (result_1.done === true) {
                break;
            }
            this.arr.push(result_1.value);
        }
        var mapped = [];
        for (var i = 0; i < this.arr.length; i++) {
            mapped[i] = {
                i: i,
                key: this.sortByFn(this.arr[i], i),
                val: this.arr[i]
            };
        }
        ;
        mapped.sort(function (a, b) {
            if (a.key === b.key) {
                return 0;
            }
            if (a.key < b.key) {
                return _this.direction === 'asc' ? -1 : 1;
            }
            return _this.direction === 'asc' ? 1 : -1;
        });
        var result = [];
        for (var i = 0; i < mapped.length; i++) {
            result[i] = mapped[i].val;
        }
        this.arr = result;
        return this.next();
    };
    SortByStream.prototype.reset = function () {
        this.index = -1;
        this.arr = null;
        return _super.prototype.reset.call(this);
    };
    return SortByStream;
}(AlotProto_1.AlotProto));
exports.SortByStream = SortByStream;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_streams_SortedStream) && isObject(module.exports)) {
		Object.assign(_src_streams_SortedStream, module.exports);
		return;
	}
	_src_streams_SortedStream = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_streams_JoinStream;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var AlotProto_1 = _src_AlotProto;
var r_1 = _src_utils_r;
var JoinStream = /** @class */ (function (_super) {
    __extends(JoinStream, _super);
    function JoinStream(stream, inner, fnKeyOuter, fnKeyInner, joinFn, joinType, opts) {
        var _this = _super.call(this, stream, opts) || this;
        _this.stream = stream;
        _this.inner = inner;
        _this.fnKeyOuter = fnKeyOuter;
        _this.fnKeyInner = fnKeyInner;
        _this.joinFn = joinFn;
        _this.joinType = joinType;
        _this._index = 0;
        _this._innerExtra = null;
        _this._innerExtraIndex = 0;
        _this._innerHash = null;
        _this._innerHashTook = Object.create(null);
        return _this;
    }
    JoinStream.prototype.next = function () {
        var _this = this;
        if (this.isAsync) {
            return this.nextAsync();
        }
        if (this._innerExtra != null) {
            if (this._innerExtraIndex >= this._innerExtra.length) {
                return r_1.r_DONE;
            }
            var x = this._innerExtra[this._innerExtraIndex++];
            var result_1 = this.joinFn(null, x);
            return { done: false, value: result_1, index: this._index++ };
        }
        ;
        var result = this.stream.next();
        if (result.done) {
            if (this.joinType === 'inner') {
                return r_1.r_DONE;
            }
            this._innerExtra = this.inner.filter(function (x) { return _this.fnKeyInner(x) in _this._innerHashTook === false; });
            return this.next();
        }
        if (this._innerHash == null) {
            this._ensureInnerHash();
        }
        var outerKey = this.fnKeyOuter(result.value);
        var innerVal = this._innerHash[outerKey];
        if (innerVal == null) {
            if (this.joinType === 'inner') {
                return this.next();
            }
        }
        else {
            this._innerHashTook[outerKey] = 1;
        }
        var val = this.joinFn(result.value, innerVal);
        return {
            value: val,
            done: false,
            index: ++this._index
        };
    };
    JoinStream.prototype.nextAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error('Joins on async stream are not supported yet');
            });
        });
    };
    JoinStream.prototype.reset = function () {
        this._index = 0;
        this._innerExtra = null;
        this._innerExtraIndex = 0;
        this._innerHash = null;
        this._innerHashTook = Object.create(null);
        return _super.prototype.reset.call(this);
    };
    JoinStream.prototype._ensureInnerHash = function () {
        var hash = Object.create(null);
        for (var i = 0; i < this.inner.length; i++) {
            var x = this.inner[i];
            var key = this.fnKeyInner(x);
            // @TOOD if should check if key already exists
            hash[key] = x;
        }
        this._innerHash = hash;
    };
    return JoinStream;
}(AlotProto_1.AlotProto));
exports.JoinStream = JoinStream;
var MapManyStream = /** @class */ (function (_super) {
    __extends(MapManyStream, _super);
    function MapManyStream(stream, fn, opts) {
        var _this = _super.call(this, stream) || this;
        _this.stream = stream;
        _this.fn = fn;
        _this.opts = opts;
        _this._index = -1;
        _this._many = null;
        _this._mapDfr = null;
        _this._done = false;
        _this.isAsync = stream.isAsync || opts && opts.async;
        return _this;
    }
    MapManyStream.prototype.next = function () {
        if (this.opts != null && this.opts.async) {
            return this.nextAsync();
        }
        if (this._many != null && this._index < this._many.length - 1) {
            var x = this._many[++this._index];
            return { done: false, value: x };
        }
        var result = this.stream.next();
        if (result.done) {
            return result;
        }
        this._many = this.fn(result.value, result.index);
        this._index = -1;
        return this.next();
    };
    MapManyStream.prototype.nextAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var x;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._done === true) {
                            return [2 /*return*/, r_1.r_DONE];
                        }
                        if (this._many != null && this._index < this._many.length - 1) {
                            x = this._many[++this._index];
                            return [2 /*return*/, { done: false, value: x }];
                        }
                        if (this._mapDfr == null) {
                            this._doMapAsync();
                        }
                        return [4 /*yield*/, this._mapDfr];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.nextAsync()];
                }
            });
        });
    };
    MapManyStream.prototype.reset = function () {
        this._many = null;
        this._done = false;
        this._mapDfr = null;
        this._index = -1;
        return _super.prototype.reset.call(this);
    };
    MapManyStream.prototype._doMapAsync = function () {
        var _this = this;
        return this._mapDfr = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.stream.next()];
                    case 1:
                        result = _b.sent();
                        if (result.done) {
                            this._done = true;
                            resolve();
                        }
                        _a = this;
                        return [4 /*yield*/, this.fn(result.value, result.index)];
                    case 2:
                        _a._many = _b.sent();
                        this._index = -1;
                        this._mapDfr = null;
                        resolve();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    return MapManyStream;
}(AlotProto_1.AlotProto));
exports.MapManyStream = MapManyStream;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_streams_JoinStream) && isObject(module.exports)) {
		Object.assign(_src_streams_JoinStream, module.exports);
		return;
	}
	_src_streams_JoinStream = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_streams_exports;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IAlotStream_1 = _src_streams_IAlotStream;
exports.IAlotStream = IAlotStream_1.IAlotStream;
exports.AlotStreamIterationResult = IAlotStream_1.AlotStreamIterationResult;
var FilterStream_1 = _src_streams_FilterStream;
exports.FilterStream = FilterStream_1.FilterStream;
exports.FilterStreamAsync = FilterStream_1.FilterStreamAsync;
var MapStream_1 = _src_streams_MapStream;
exports.MapStream = MapStream_1.MapStream;
exports.MapManyStream = MapStream_1.MapManyStream;
exports.MethodMap = MapStream_1.MethodMap;
exports.MethodMapMany = MapStream_1.MethodMapMany;
var TakeStream_1 = _src_streams_TakeStream;
exports.TakeStream = TakeStream_1.TakeStream;
exports.TakeWhileStream = TakeStream_1.TakeWhileStream;
exports.TakeWhileMethod = TakeStream_1.TakeWhileMethod;
var SkipStream_1 = _src_streams_SkipStream;
exports.SkipStream = SkipStream_1.SkipStream;
exports.SkipWhileMethod = SkipStream_1.SkipWhileMethod;
exports.SkipWhileStream = SkipStream_1.SkipWhileStream;
var GroupStream_1 = _src_streams_GroupStream;
exports.GroupByKeyFn = GroupStream_1.GroupByKeyFn;
exports.GroupByStream = GroupStream_1.GroupByStream;
var DistinctStream_1 = _src_streams_DistinctStream;
exports.DistinctByKeyFn = DistinctStream_1.DistinctByKeyFn;
exports.DistinctByStream = DistinctStream_1.DistinctByStream;
var ForEachStream_1 = _src_streams_ForEachStream;
exports.ForEachStream = ForEachStream_1.ForEachStream;
exports.ForEachMethod = ForEachStream_1.ForEachMethod;
var ForkStream_1 = _src_streams_ForkStream;
exports.ForkStreamInner = ForkStream_1.ForkStreamInner;
exports.ForkStreamOuter = ForkStream_1.ForkStreamOuter;
var SortedStream_1 = _src_streams_SortedStream;
exports.SortByStream = SortedStream_1.SortByStream;
exports.SortMethod = SortedStream_1.SortMethod;
var JoinStream_1 = _src_streams_JoinStream;
exports.JoinStream = JoinStream_1.JoinStream;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_streams_exports) && isObject(module.exports)) {
		Object.assign(_src_streams_exports, module.exports);
		return;
	}
	_src_streams_exports = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils_classify;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
function Classify(Ctor) {
    var Class = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new (Ctor.bind.apply(Ctor, __spreadArrays([void 0], args)))();
    };
    Class.prototype = Ctor.prototype;
    forIn(Ctor, function (key) {
        if (key in Class === false) {
            Class[key] = Ctor[key];
        }
    });
    return Class;
}
exports.Classify = Classify;
function FnPrototypeAlias(Ctor) {
    Ctor.fn = Ctor.prototype;
    return Ctor;
}
exports.FnPrototypeAlias = FnPrototypeAlias;
function forIn(obj, cb) {
    var hash = Object.create(null);
    var cursor = obj;
    do {
        var props = Object.getOwnPropertyNames(cursor);
        for (var i = 0; i < props.length; i++) {
            var key = props[i];
            if (key in hash === false) {
                cb(key);
            }
            hash[key] = null;
        }
    } while (cursor = Object.getPrototypeOf(cursor));
}
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_utils_classify) && isObject(module.exports)) {
		Object.assign(_src_utils_classify, module.exports);
		return;
	}
	_src_utils_classify = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_alot;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
_src_streams_exports;
var AlotProto_1 = _src_AlotProto;
var Alot = /** @class */ (function (_super) {
    __extends(Alot, _super);
    function Alot(array, meta) {
        var _this = _super.call(this, new ArrayStream(array)) || this;
        _this.array = array;
        _this.meta = meta;
        return _this;
    }
    Alot.fromObject = function (obj) {
        var arr = Object.keys(obj).map(function (key) {
            return { key: key, value: obj[key] };
        });
        return new Alot(arr);
    };
    return Alot;
}(AlotProto_1.AlotProto));
exports.Alot = Alot;
var ArrayStream = /** @class */ (function () {
    function ArrayStream(array) {
        this.array = array;
        this.isAsync = false;
        this.index = -1;
    }
    ArrayStream.prototype.next = function () {
        while (++this.index < this.array.length) {
            var x = this.array[this.index];
            return { value: x, done: false, index: this.index };
        }
        return { value: null, done: true, index: this.index };
    };
    ArrayStream.prototype.nextAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.next()];
            });
        });
    };
    ArrayStream.prototype.reset = function () {
        this.index = -1;
        return this;
    };
    return ArrayStream;
}());
exports.ArrayStream = ArrayStream;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_alot) && isObject(module.exports)) {
		Object.assign(_src_alot, module.exports);
		return;
	}
	_src_alot = module.exports;
}());
// end:source ./ModuleSimplified.js

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
_src_streams_exports;
var classify_1 = _src_utils_classify;
var alot_1 = _src_alot;
var Alot = /** @class */ (function (_super) {
    __extends(Alot, _super);
    function Alot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Alot.Alot = alot_1.Alot;
    Alot.default = alot_1.Alot;
    Alot = __decorate([
        classify_1.Classify
    ], Alot);
    return Alot;
}(alot_1.Alot));
// Reapply already decorated Alot to default.
Alot.default = Alot;
Alot.Alot = Alot;
var alot = Alot;
module.exports = alot;

}));
// end:source ./UMD.js
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_node_modules_alot_lib_alot) && isObject(module.exports)) {
		Object.assign(_node_modules_alot_lib_alot, module.exports);
		return;
	}
	_node_modules_alot_lib_alot = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_IpcHost;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpcHost = void 0;
var atma_utils_1 = require("atma-utils");
var memd_1 = _node_modules_memd_lib_memd;
var ipc = require("node-ipc");
var net = require("net");
var fs = require("fs");
var EIpcMessageType_1 = _src_interface_EIpcMessageType;
var IpcHost = /** @class */ (function (_super) {
    __extends(IpcHost, _super);
    function IpcHost(pipeName) {
        var _this = _super.call(this) || this;
        _this.pipeName = pipeName;
        _this._rpcHandlers = {};
        _this._status = {
            started: false,
            connections: 0
        };
        return _this;
    }
    IpcHost.prototype.registerRpcHandlers = function (rpc) {
        this._rpcHandlers = rpc;
    };
    IpcHost.prototype.stop = function () {
        if (typeof ipc.server.server !== 'boolean') {
            // workaround: node-ipc if server is not connected/created, the property is boolean
            ipc.server.stop();
        }
        this.create.clearAll();
    };
    IpcHost.prototype.send = function (event, data) {
        ipc.server.broadcast(event, data);
    };
    IpcHost.prototype.getStatus = function () {
        return this._status;
    };
    IpcHost.prototype.create = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            ipc.config.id = "memsync_".concat(_this.pipeName);
            ipc.config.silent = true;
            ipc.config.unlink = false;
            ipc.serve(function () {
                ipc.server.on('message', function (message, socket) {
                    _this
                        .onIncomeMessage(message)
                        .then(function (res) {
                        if (res == null || message.id == null) {
                            return;
                        }
                        ipc.server.emit(socket, 'message', {
                            id: message.id,
                            error: res.error,
                            result: res.result,
                        });
                    })
                        .catch(function (error) {
                        if (message.id == null) {
                            return;
                        }
                        ipc.server.emit(socket, 'message', {
                            id: message.id,
                            error: error,
                        });
                    });
                    //
                });
                _this._status.started = true;
                resolve(null);
            });
            ipc.server.on('error', function (error) { return __awaiter(_this, void 0, void 0, function () {
                var cleaned;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(error.code === 'EADDRINUSE')) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.checkStalled()];
                        case 1:
                            cleaned = _a.sent();
                            if (cleaned) {
                                ipc.server.start();
                                return [2 /*return*/];
                            }
                            _a.label = 2;
                        case 2:
                            reject(error);
                            return [2 /*return*/];
                    }
                });
            }); });
            ipc.server.on('connect', function (client) {
                _this._status.connections++;
            });
            ipc.server.on('disconnect', function () {
                _this._status.connections--;
            });
            ipc.server.start();
        });
    };
    IpcHost.prototype.checkStalled = function () {
        var path = ipc.server.path;
        // double check
        return new Promise(function (resolve) {
            var socket = net
                .connect({ path: path }, function () {
                socket === null || socket === void 0 ? void 0 : socket.destroy();
                resolve(false);
            })
                .on('error', function (error) {
                if (error.code === 'ECONNREFUSED') {
                    // not in use: delete it and re-listen
                    fs.unlink(path, function (err) {
                        resolve(err == null);
                    });
                    return;
                }
                resolve(false);
            });
        });
    };
    IpcHost.prototype.onIncomeMessage = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (message.type) {
                    case EIpcMessageType_1.EIpcMessageType.Rpc:
                        return [2 /*return*/, this.processRpc(message)];
                }
                return [2 /*return*/, null];
            });
        });
    };
    IpcHost.prototype.processRpc = function (message) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var fn, result, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        fn = (0, atma_utils_1.obj_getProperty)((_a = this._rpcHandlers) !== null && _a !== void 0 ? _a : {}, message.method);
                        if (typeof fn !== 'function') {
                            return [2 /*return*/, { error: new Error("".concat(message.method, " is not a function")) }];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fn.call.apply(fn, __spreadArray([null], (Array.isArray(message.data) ? message.data : [message.data]), false))];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, { result: result }];
                    case 3:
                        error_1 = _b.sent();
                        return [2 /*return*/, { error: error_1 }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        memd_1.default.deco.memoize({ perInstance: true })
    ], IpcHost.prototype, "create", null);
    return IpcHost;
}(atma_utils_1.class_EventEmitter));
exports.IpcHost = IpcHost;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_IpcHost) && isObject(module.exports)) {
		Object.assign(_src_IpcHost, module.exports);
		return;
	}
	_src_IpcHost = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_array;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arr_remove = void 0;
function arr_remove(array, fn) {
    if (array == null) {
        return;
    }
    for (var i = 0; i < array.length; i++) {
        if (fn(array[i]) === true) {
            array.splice(i, 1);
            i--;
        }
    }
}
exports.arr_remove = arr_remove;
;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_util_array) && isObject(module.exports)) {
		Object.assign(_src_util_array, module.exports);
		return;
	}
	_src_util_array = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_patch;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obj_isPatch = exports.obj_patchValidate = exports.obj_partialToUpdateQuery = exports.obj_patchConflict = exports.obj_patchKeys = exports.obj_patch = void 0;
var atma_utils_1 = require("atma-utils");
var array_1 = _src_util_array;
function obj_patch(obj, patch) {
    for (var key in patch) {
        var patcher = patches[key];
        if (patcher) {
            var walkerFn = patcher[0], modifierFn = patcher[1];
            walkerFn(obj, patch[key], modifierFn);
        }
        else {
            console.error('Unknown or not implemented patcher', key);
        }
    }
    return obj;
}
exports.obj_patch = obj_patch;
;
function obj_patchKeys(patch) {
    var keys = Object.create(null);
    for (var key in patch) {
        var hash = patch[key];
        for (var key_1 in hash) {
            keys[key_1] = hash[key_1];
        }
    }
    return keys;
}
exports.obj_patchKeys = obj_patchKeys;
;
function obj_patchConflict(a, b) {
    var _a;
    if (a.$set && b.$set) {
        for (var key in a.$set) {
            if (key in b.$set) {
                var aVal = a.$set[key];
                var bVal = b.$set[key];
                /** unstrict check */
                if (aVal == bVal) {
                    continue;
                }
                return {
                    $set: (_a = {},
                        _a[key] = {
                            a: aVal,
                            b: bVal,
                        },
                        _a)
                };
            }
        }
    }
}
exports.obj_patchConflict = obj_patchConflict;
function obj_partialToUpdateQuery(data, isOptional) {
    if (obj_isPatch(data)) {
        return data;
    }
    var hasData = false;
    var $set = {};
    for (var key in data) {
        var val = data[key];
        if (typeof val === 'function') {
            // skip any methods
            continue;
        }
        hasData = true;
        $set[key] = val;
    }
    if (hasData === false && isOptional === true) {
        return null;
    }
    return { $set: $set };
}
exports.obj_partialToUpdateQuery = obj_partialToUpdateQuery;
function obj_patchValidate(patch) {
    if (patch == null)
        return 'Patch in undefined';
    var has = false;
    for (var key in patch) {
        has = true;
        if (patches[key] == null)
            return 'Unsupported patcher: ' + key;
    }
    if (has === false)
        return 'No data';
    return null;
}
exports.obj_patchValidate = obj_patchValidate;
;
function obj_isPatch(patch) {
    if (patch == null) {
        return false;
    }
    for (var key in patches) {
        if (key in patch) {
            for (var inner in patch[key]) {
                return true;
            }
        }
    }
    return false;
}
exports.obj_isPatch = obj_isPatch;
;
// === private
function walk_mutator(obj, data, mutatorFn) {
    for (var key in data) {
        mutatorFn((0, atma_utils_1.obj_getProperty)(obj, key), data[key], key, obj);
    }
}
function walk_modifier(obj, data, fn) {
    for (var key in data) {
        (0, atma_utils_1.obj_setProperty)(obj, key, fn((0, atma_utils_1.obj_getProperty)(obj, key), data[key], key));
    }
}
function fn_IoC() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return function (val, mix, prop) {
        for (var i = 0, fn, imax = fns.length; i < imax; i++) {
            fn = fns[i];
            if (fn(val, mix, prop) === false)
                return;
        }
    };
}
function arr_checkArray(val, mix, prop) {
    if ((0, atma_utils_1.is_Array)(val) === false) {
        // if DEBUG
        console.warn('<patch> property is not an array', prop);
        // endif
        return false;
    }
}
function arr_push(currentVal, mix, prop, obj) {
    if (currentVal == null) {
        obj[prop] = [mix];
        return;
    }
    if (mix.hasOwnProperty('$each')) {
        for (var i = 0, imax = mix.$each.length; i < imax; i++) {
            currentVal.push(mix.$each[i]);
        }
        return;
    }
    currentVal.push(mix);
}
function arr_pop(currentVal, mix, prop) {
    currentVal === null || currentVal === void 0 ? void 0 : currentVal[mix > 0 ? 'pop' : 'shift']();
}
function arr_pull(val, mix, prop) {
    (0, array_1.arr_remove)(val, function (item) {
        return query_match(item, mix);
    });
}
function val_inc(val, mix, key) {
    return val + mix;
}
function val_set(val, mix, key) {
    return mix;
}
function val_unset() {
    return void 0;
}
function val_bit(val, mix) {
    if (mix.or)
        return val | mix.or;
    if (mix.and)
        return val & mix.and;
    return val;
}
var query_match;
(function () {
    /** @TODO improve object matcher */
    query_match = function (obj, mix) {
        for (var key in mix) {
            if (obj[key] !== mix[key])
                return false;
        }
        return true;
    };
}());
var fn_WALKER = 0, fn_MODIFIER = 1;
var patches = {
    '$push': [walk_mutator, arr_push],
    '$pop': [walk_mutator, arr_pop],
    '$pull': [walk_mutator, arr_pull],
    '$inc': [walk_modifier, val_inc],
    '$set': [walk_modifier, val_set],
    '$unset': [walk_modifier, val_unset],
    '$bit': [walk_modifier, val_bit],
};
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_util_patch) && isObject(module.exports)) {
		Object.assign(_src_util_patch, module.exports);
		return;
	}
	_src_util_patch = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_ChannelHost;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelHost = void 0;
var alot_1 = _node_modules_alot_lib_alot;
var Channel_1 = _src_Channel;
var IpcHost_1 = _src_IpcHost;
var patch_1 = _src_util_patch;
var ChannelHost = /** @class */ (function (_super) {
    __extends(ChannelHost, _super);
    function ChannelHost(pipeName, shared, options) {
        var _this = _super.call(this, shared) || this;
        _this.pipeName = pipeName;
        _this.shared = shared;
        _this.options = options;
        _this.name = 'host';
        _this.host = new IpcHost_1.IpcHost(_this.pipeName);
        _this.rpc = {
            sync: function (message) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (this.shared.version > message.version) {
                        return [2 /*return*/, this.shared.toJson()];
                    }
                    this.shared.setData(message.data, message.timestamp, message.version);
                    return [2 /*return*/, null];
                });
            }); },
            patch: function (message) { return __awaiter(_this, void 0, void 0, function () {
                var prevPatches, patches, conflict;
                var _this = this;
                return __generator(this, function (_a) {
                    if (this.localVersion > message.netVersion) {
                        patches = this.patches.filter(function (x) { return x.version > message.netVersion; });
                        conflict = (0, alot_1.default)(patches).map(function (patch) {
                            return (0, alot_1.default)(message.patches).map(function (p) {
                                return (0, patch_1.obj_patchConflict)(patch.patch, p.patch);
                            }).filter(function (x) { return x != null; }).first();
                        }).filter(function (x) { return x != null; }).first();
                        if (conflict) {
                            return [2 /*return*/, {
                                    conflict: conflict,
                                    netVersion: this.localVersion,
                                    patches: patches,
                                }];
                        }
                        prevPatches = patches;
                    }
                    message.patches.forEach(function (patch) {
                        _this.shared.patch(patch.patch);
                    });
                    this.host.emit('onPatchMessage', {
                        senderId: message.senderId,
                        netVersion: this.shared.version,
                        patches: message.patches,
                        timestamp: this.shared.timestamp,
                    });
                    this.emit('receivedPatches', message.patches);
                    return [2 /*return*/, {
                            prevPatches: prevPatches,
                            netVersion: this.shared.version,
                        }];
                });
            }); },
            getStatus: function () { return __awaiter(_this, void 0, void 0, function () {
                var status;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getStatus()];
                        case 1:
                            status = _a.sent();
                            return [2 /*return*/, status];
                    }
                });
            }); }
        };
        return _this;
    }
    ChannelHost.prototype.send = function (patches) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                this.host.send('onPatchMessage', {
                    senderId: this.id,
                    netVersion: this.shared.version,
                    timestamp: this.shared.timestamp,
                    patches: patches,
                });
                return [2 /*return*/];
            });
        });
    };
    ChannelHost.prototype.open = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.host.create()];
                    case 1:
                        _a.sent();
                        this.host.registerRpcHandlers(this.rpc);
                        return [2 /*return*/];
                }
            });
        });
    };
    ChannelHost.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.host.stop();
                return [2 /*return*/];
            });
        });
    };
    ChannelHost.prototype.getStatus = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, (_a = this.host) === null || _a === void 0 ? void 0 : _a.getStatus()];
            });
        });
    };
    ChannelHost.prototype.onServerCreated = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    ChannelHost.prototype.onClientConnected = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return ChannelHost;
}(Channel_1.Channel));
exports.ChannelHost = ChannelHost;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_ChannelHost) && isObject(module.exports)) {
		Object.assign(_src_ChannelHost, module.exports);
		return;
	}
	_src_ChannelHost = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_SharedObject;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedObject = void 0;
var atma_utils_1 = require("atma-utils");
var patch_1 = _src_util_patch;
var SharedObject = /** @class */ (function () {
    function SharedObject(defaultObject) {
        if (defaultObject === void 0) { defaultObject = {}; }
        this.version = 1;
        this.timestamp = 0;
        this.patches = [];
        this.observers = {};
        this.data = defaultObject !== null && defaultObject !== void 0 ? defaultObject : {};
    }
    SharedObject.prototype.patch = function (update, version) {
        this.version = version !== null && version !== void 0 ? version : (this.version + 1);
        this.timestamp = Date.now();
        var patch = {
            version: this.version,
            timestamp: this.timestamp,
            patch: update
        };
        this.patches.push(patch);
        (0, patch_1.obj_patch)(this.data, update);
        var keys;
        for (var path in this.observers) {
            var cbs = this.observers[path];
            if (cbs == null || cbs.length === 0) {
                continue;
            }
            keys = keys !== null && keys !== void 0 ? keys : (0, patch_1.obj_patchKeys)(update);
            for (var key in keys) {
                var a = "".concat(key, ".");
                var b = "".concat(path, ".");
                if (key === path || a.startsWith(b) || b.startsWith(a)) {
                    var val = (0, atma_utils_1.obj_getProperty)(this.data, path);
                    for (var i = 0; i < cbs.length; i++) {
                        cbs[i](val);
                    }
                    continue;
                }
            }
        }
        return patch;
    };
    SharedObject.prototype.observe = function (path, cb) {
        var cbs = this.observers[path];
        if (cbs == null) {
            cbs = this.observers[path] = [];
        }
        cbs.push(cb);
    };
    SharedObject.prototype.toJson = function () {
        return {
            version: this.version,
            timestamp: this.timestamp,
            data: this.data,
        };
    };
    SharedObject.prototype.setData = function (data, timestamp, version) {
        // Refill the object to maintain the object reference
        for (var key in data) {
            this.data[key] = data[key];
        }
        for (var key in this.data) {
            if (key in data === false) {
                delete this.data[key];
            }
        }
        this.version = version;
        this.timestamp = timestamp;
    };
    return SharedObject;
}());
exports.SharedObject = SharedObject;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_SharedObject) && isObject(module.exports)) {
		Object.assign(_src_SharedObject, module.exports);
		return;
	}
	_src_SharedObject = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_IpcPipe;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpcPipe = void 0;
var atma_utils_1 = require("atma-utils");
var ChannelClient_1 = _src_ChannelClient;
var ChannelHost_1 = _src_ChannelHost;
var SharedObject_1 = _src_SharedObject;
var ipc = require("node-ipc");
var net = require("net");
var IpcPipe = /** @class */ (function (_super) {
    __extends(IpcPipe, _super);
    function IpcPipe(name, defaultObject, options) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.options = options;
        _this.status = 'none';
        _this.connection = 'none';
        _this.pendingPatches = [];
        _this.shared = new SharedObject_1.SharedObject(defaultObject);
        return _this;
        // console.log('SUBSCRIBE')
        // process.on('SIGINT', () => {
        //     console.log('SIGINT!!')
        //     this.channel?.close();
        //     process.exit(0);
        // });
        // process.on('SIGTERM', () => {
        //     console.log('SIGTERM!!')
        //     this.channel?.close();
        //  });
    }
    IpcPipe.prototype.start = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var type;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        type = ((_a = this.options) === null || _a === void 0 ? void 0 : _a.clientOnly) ? 'client' : 'host';
                        return [4 /*yield*/, this.tryJoin(type)];
                    case 1:
                        _b.sent();
                        this.startedAt = new Date();
                        return [2 /*return*/];
                }
            });
        });
    };
    IpcPipe.prototype.stop = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.status = 'stopped';
                        return [4 /*yield*/, ((_a = this.channel) === null || _a === void 0 ? void 0 : _a.close())];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    IpcPipe.prototype.patch = function (update) {
        return __awaiter(this, void 0, void 0, function () {
            var patch;
            return __generator(this, function (_a) {
                patch = this.shared.patch(update);
                if (this.connection !== 'connected') {
                    this.pendingPatches.push(patch);
                }
                else {
                    this.channel.send([patch]);
                }
                return [2 /*return*/];
            });
        });
    };
    IpcPipe.prototype.getStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
            var channel, host;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        channel = this.channel;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 3, 4]);
                        return [4 /*yield*/, (channel === null || channel === void 0 ? void 0 : channel.getStatus())];
                    case 2:
                        host = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        // Channel was changed
                        if (channel !== this.channel) {
                            return [2 /*return*/, this.getStatus()];
                        }
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/, {
                            status: this.status,
                            channel: this.channel.name,
                            host: host,
                        }];
                }
            });
        });
    };
    IpcPipe.prototype.hasPeers = function (path) {
        path = path !== null && path !== void 0 ? path : ipc.server.path;
        return new Promise(function (resolve) {
            var socket = net
                .connect({ path: path }, function () {
                socket === null || socket === void 0 ? void 0 : socket.destroy();
                resolve(true);
            })
                .on('error', function (error) {
                resolve(false);
            });
        });
    };
    IpcPipe.prototype.tryJoin = function (type) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if ((_a = this.status) === null || _a === void 0 ? void 0 : _a.startsWith('create')) {
                            return [2 /*return*/];
                        }
                        this.emit('starting', type);
                        this.status = "start-".concat(type);
                        return [4 /*yield*/, ((_b = this.channel) === null || _b === void 0 ? void 0 : _b.close())];
                    case 1:
                        _e.sent();
                        if (type === 'host') {
                            this.channel = new ChannelHost_1.ChannelHost(this.name, this.shared, this.options);
                        }
                        if (type === 'client') {
                            this.channel = new ChannelClient_1.ChannelClient(this.name, this.shared, this.options);
                        }
                        _e.label = 2;
                    case 2:
                        _e.trys.push([2, 4, , 6]);
                        return [4 /*yield*/, this.channel.open()];
                    case 3:
                        _e.sent();
                        this.status = type;
                        this.onConnected();
                        return [3 /*break*/, 6];
                    case 4:
                        error_1 = _e.sent();
                        this.emit('startingFailed', type, error_1.message);
                        this.status = 'none';
                        this.connection = 'none';
                        if (!((_c = this.options) === null || _c === void 0 ? void 0 : _c.clientOnly) && !((_d = this.options) === null || _d === void 0 ? void 0 : _d.serverOnly)) {
                            // toggle
                            type = type === 'host' ? 'client' : 'host';
                        }
                        return [4 /*yield*/, this.tryJoin(type)];
                    case 5:
                        _e.sent();
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    IpcPipe.prototype.onConnected = function () {
        var _this = this;
        this.connection = 'connected';
        this.emit('connected', this.status);
        this
            .channel
            .on('receivedPatches', function (patches) { return _this.emit('receivedPatches', patches); })
            .on('disconnect', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.status === 'stopped') {
                    return [2 /*return*/];
                }
                this.emit('disconnected', this.status);
                this.connection = 'none';
                this.status = 'none';
                this.tryJoin('host');
                return [2 /*return*/];
            });
        }); });
        if (this.pendingPatches.length > 0) {
            var arr = this.pendingPatches.splice(0);
            this.channel.send(arr);
        }
    };
    IpcPipe.prototype.emit = function (event) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if ((_a = this.options) === null || _a === void 0 ? void 0 : _a.logEvents) {
            console.log.apply(console, __spreadArray(["Pipe with state '".concat(this.status, "' emits '").concat(event, "' with args: ")], args, false));
        }
        return _super.prototype.emit.apply(this, __spreadArray([event], args, false));
    };
    return IpcPipe;
}(atma_utils_1.class_EventEmitter));
exports.IpcPipe = IpcPipe;
function wait(ms) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    setTimeout(resolve, ms);
                })];
        });
    });
}
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_IpcPipe) && isObject(module.exports)) {
		Object.assign(_src_IpcPipe, module.exports);
		return;
	}
	_src_IpcPipe = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_log_Logger;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.ELogLevel = void 0;
var ELogLevel;
(function (ELogLevel) {
    ELogLevel[ELogLevel["None"] = 0] = "None";
    ELogLevel[ELogLevel["Error"] = 1] = "Error";
    ELogLevel[ELogLevel["Warn"] = 2] = "Warn";
    ELogLevel[ELogLevel["Info"] = 3] = "Info";
})(ELogLevel = exports.ELogLevel || (exports.ELogLevel = {}));
;
var Logger = /** @class */ (function () {
    function Logger() {
        this.level = ELogLevel.None;
    }
    Logger.prototype.info = function (message) {
        if (this.level === ELogLevel.Info) {
            console.log('Memsync Info:', message);
        }
    };
    Logger.prototype.warn = function (message) {
        if (this.level >= ELogLevel.Warn) {
            console.warn('Memsync Warn:', message);
        }
    };
    Logger.prototype.error = function (message) {
        if (this.level >= ELogLevel.Error) {
            console.error('Memsync Error:', message);
        }
    };
    Logger.prototype.setLevel = function (level) {
        this.level = level;
    };
    return Logger;
}());
exports.Logger = Logger;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_log_Logger) && isObject(module.exports)) {
		Object.assign(_src_log_Logger, module.exports);
		return;
	}
	_src_log_Logger = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_MemSync;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemSync = void 0;
var atma_utils_1 = require("atma-utils");
var IpcPipe_1 = _src_IpcPipe;
var Logger_1 = _src_log_Logger;
var MemSync = /** @class */ (function (_super) {
    __extends(MemSync, _super);
    function MemSync(name, defaultObject, options) {
        if (defaultObject === void 0) { defaultObject = null; }
        if (options === void 0) { options = null; }
        var _a;
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.defaultObject = defaultObject;
        _this.options = options;
        _this.logger = new Logger_1.Logger();
        _this.ipc = new IpcPipe_1.IpcPipe(_this.name, (_a = _this.defaultObject) !== null && _a !== void 0 ? _a : {}, _this.options);
        _this.data = _this.ipc.shared.data;
        _this.ipc.on('receivedPatches', function (patches) { return _this.emit('receivedPatches', patches); });
        _this.ipc.on('connected', function (type) { return _this.emit('connected', type); });
        _this.ipc.on('disconnected', function (type) { return _this.emit('disconnected', type); });
        return _this;
    }
    MemSync.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ipc.start()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MemSync.prototype.stop = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ipc.stop()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MemSync.prototype.patch = function (patch) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ipc.patch(patch)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MemSync.prototype.onceAsync = function (event) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        _this.once(event, resolve);
                    })];
            });
        });
    };
    MemSync.prototype.hasPeers = function (path) {
        return this.ipc.hasPeers(path);
    };
    MemSync.prototype.observe = function (property, cb) {
        this.ipc.shared.observe(property, cb);
        return this;
    };
    MemSync.prototype.getStatus = function () {
        return this.ipc.getStatus();
    };
    MemSync.prototype.setOptions = function (opts) {
    };
    return MemSync;
}(atma_utils_1.class_EventEmitter));
exports.MemSync = MemSync;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_MemSync) && isObject(module.exports)) {
		Object.assign(_src_MemSync, module.exports);
		return;
	}
	_src_MemSync = module.exports;
}());
// end:source ./ModuleSimplified.js

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemSync = void 0;
var MemSync_1 = _src_MemSync;
Object.defineProperty(exports, "MemSync", { enumerable: true, get: function () { return MemSync_1.MemSync; } });


}());
// end:source ./RootModule.js
