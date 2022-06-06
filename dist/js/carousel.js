/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/carousel.js":
/*!****************************!*\
  !*** ./src/js/carousel.js ***!
  \****************************/
/***/ (() => {

$.fn.carousel = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return $.each(this, function (i, el) {
    var _options$carouselCont, _options$controllClas, _options$btnClass;

    var $this = $(el);
    var carouselContents = $("<div class=\"carousel-contents ".concat((_options$carouselCont = options.carouselContentClass) !== null && _options$carouselCont !== void 0 ? _options$carouselCont : '', "\" style=\"position:relative;\"></div>")); // wrap children to div

    carouselContents.append($this.children());
    $this.append(carouselContents);
    var carouselItem = carouselContents.children();
    /*
    * Control
    * */

    var controlClass = (_options$controllClas = options.controllClass) !== null && _options$controllClas !== void 0 ? _options$controllClas : '';
    var btnClass = (_options$btnClass = options.btnClass) !== null && _options$btnClass !== void 0 ? _options$btnClass : '';
    var control = $("<div class=\"control ".concat(controlClass, "\"></div>"));
    var btnControlLeft = $("<button class=\"control-left btn btn-rounded w-[50px] h-[50px] rounded-full btn-default ".concat(btnClass, "\">\n                <i class=\"fa fa-arrow-left\"></i>\n            </button>"));
    var btnControlRight = $("<button class=\"control-right btn btn-rounded w-[50px] h-[50px] rounded-full btn-default ".concat(btnClass, "\">\n                <i class=\"fa fa-arrow-right\"></i>\n            </button>"));
    control.append(btnControlLeft, btnControlRight);
    $this.append(control); // children calculation width

    var items = 1; // items to show in screen

    var slideBy = 1; // slide per item by click control button
    // options breakpoint

    if (!!options.breakpoints) {
      var windowWidth = $(window).width();
      $.each(options.breakpoints, function (breakpoint, option) {
        if (windowWidth >= +breakpoint) {
          var _option$items, _option$slideBy;

          items = (_option$items = option.items) !== null && _option$items !== void 0 ? _option$items : 4;
          slideBy = (_option$slideBy = option.slideBy) !== null && _option$slideBy !== void 0 ? _option$slideBy : 1;
        }
      });
    } else {
      var _options$items, _options$slideBy;

      items = (_options$items = options.items) !== null && _options$items !== void 0 ? _options$items : 1; // items to show in screen

      slideBy = (_options$slideBy = options.slideBy) !== null && _options$slideBy !== void 0 ? _options$slideBy : 1; // slide per item by click control button
    }

    var width = $this.width();
    var carouselItemWidth = width / items;
    var carouselContentWidths = carouselItemWidth * carouselItem.length;
    var transition = 0;
    var lastItem = carouselContentWidths - carouselItemWidth * items; // set width carousel content & items

    carouselContents.css('width', "".concat(carouselContentWidths, "px"));
    carouselItem.css('width', "".concat(carouselItemWidth, "px")); // event button slide left click

    btnControlLeft.on('click', function () {
      if (transition > 0) {
        transition -= carouselContentWidths - carouselItemWidth * (carouselItem.length - slideBy);
        if (transition < 0) transition = 0;
        carouselContents.animate({
          right: "".concat(transition, "px")
        }, options !== null && options !== void 0 ? options : 4000);
      }
    }); // event button slide right click

    btnControlRight.on('click', function () {
      if (transition < lastItem) {
        transition += carouselContentWidths - carouselItemWidth * (carouselItem.length - slideBy);
        if (transition > lastItem) transition = lastItem;
        carouselContents.animate({
          right: "".concat(transition, "px")
        });
      }
    });
  });
};

/***/ }),

/***/ "./src/scss/app.scss":
/*!***************************!*\
  !*** ./src/scss/app.scss ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/dist/js/carousel": 0,
/******/ 			"dist/css/carousel": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk_yonchando_carouseljs"] = self["webpackChunk_yonchando_carouseljs"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["dist/css/carousel"], () => (__webpack_require__("./src/js/carousel.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["dist/css/carousel"], () => (__webpack_require__("./src/scss/app.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;