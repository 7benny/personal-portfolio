"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/react-use-measure";
exports.ids = ["vendor-chunks/react-use-measure"];
exports.modules = {

/***/ "(ssr)/./node_modules/react-use-measure/dist/web.cjs.js":
/*!********************************************************!*\
  !*** ./node_modules/react-use-measure/dist/web.cjs.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar react = __webpack_require__(/*! react */ \"(ssr)/./node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js\");\nvar createDebounce = __webpack_require__(/*! debounce */ \"(ssr)/./node_modules/debounce/index.js\");\n\nfunction _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }\n\nvar createDebounce__default = /*#__PURE__*/_interopDefaultLegacy(createDebounce);\n\nfunction useMeasure(_temp) {\n  var _ref = _temp === void 0 ? {\n    debounce: 0,\n    scroll: false,\n    offsetSize: false\n  } : _temp,\n      debounce = _ref.debounce,\n      scroll = _ref.scroll,\n      polyfill = _ref.polyfill,\n      offsetSize = _ref.offsetSize;\n\n  var ResizeObserver = polyfill || (typeof window === 'undefined' ? function ResizeObserver() {} : window.ResizeObserver);\n\n  if (!ResizeObserver) {\n    throw new Error('This browser does not support ResizeObserver out of the box. See: https://github.com/react-spring/react-use-measure/#resize-observer-polyfills');\n  }\n\n  var _useState = react.useState({\n    left: 0,\n    top: 0,\n    width: 0,\n    height: 0,\n    bottom: 0,\n    right: 0,\n    x: 0,\n    y: 0\n  }),\n      bounds = _useState[0],\n      set = _useState[1]; // keep all state in a ref\n\n\n  var state = react.useRef({\n    element: null,\n    scrollContainers: null,\n    resizeObserver: null,\n    lastBounds: bounds\n  }); // set actual debounce values early, so effects know if they should react accordingly\n\n  var scrollDebounce = debounce ? typeof debounce === 'number' ? debounce : debounce.scroll : null;\n  var resizeDebounce = debounce ? typeof debounce === 'number' ? debounce : debounce.resize : null; // make sure to update state only as long as the component is truly mounted\n\n  var mounted = react.useRef(false);\n  react.useEffect(function () {\n    mounted.current = true;\n    return function () {\n      return void (mounted.current = false);\n    };\n  }); // memoize handlers, so event-listeners know when they should update\n\n  var _useMemo = react.useMemo(function () {\n    var callback = function callback() {\n      if (!state.current.element) return;\n\n      var _ref2 = state.current.element.getBoundingClientRect(),\n          left = _ref2.left,\n          top = _ref2.top,\n          width = _ref2.width,\n          height = _ref2.height,\n          bottom = _ref2.bottom,\n          right = _ref2.right,\n          x = _ref2.x,\n          y = _ref2.y;\n\n      var size = {\n        left: left,\n        top: top,\n        width: width,\n        height: height,\n        bottom: bottom,\n        right: right,\n        x: x,\n        y: y\n      };\n\n      if (state.current.element instanceof HTMLElement && offsetSize) {\n        size.height = state.current.element.offsetHeight;\n        size.width = state.current.element.offsetWidth;\n      }\n\n      Object.freeze(size);\n      if (mounted.current && !areBoundsEqual(state.current.lastBounds, size)) set(state.current.lastBounds = size);\n    };\n\n    return [callback, resizeDebounce ? createDebounce__default[\"default\"](callback, resizeDebounce) : callback, scrollDebounce ? createDebounce__default[\"default\"](callback, scrollDebounce) : callback];\n  }, [set, offsetSize, scrollDebounce, resizeDebounce]),\n      forceRefresh = _useMemo[0],\n      resizeChange = _useMemo[1],\n      scrollChange = _useMemo[2]; // cleanup current scroll-listeners / observers\n\n\n  function removeListeners() {\n    if (state.current.scrollContainers) {\n      state.current.scrollContainers.forEach(function (element) {\n        return element.removeEventListener('scroll', scrollChange, true);\n      });\n      state.current.scrollContainers = null;\n    }\n\n    if (state.current.resizeObserver) {\n      state.current.resizeObserver.disconnect();\n      state.current.resizeObserver = null;\n    }\n  } // add scroll-listeners / observers\n\n\n  function addListeners() {\n    if (!state.current.element) return;\n    state.current.resizeObserver = new ResizeObserver(scrollChange);\n    state.current.resizeObserver.observe(state.current.element);\n\n    if (scroll && state.current.scrollContainers) {\n      state.current.scrollContainers.forEach(function (scrollContainer) {\n        return scrollContainer.addEventListener('scroll', scrollChange, {\n          capture: true,\n          passive: true\n        });\n      });\n    }\n  } // the ref we expose to the user\n\n\n  var ref = function ref(node) {\n    if (!node || node === state.current.element) return;\n    removeListeners();\n    state.current.element = node;\n    state.current.scrollContainers = findScrollContainers(node);\n    addListeners();\n  }; // add general event listeners\n\n\n  useOnWindowScroll(scrollChange, Boolean(scroll));\n  useOnWindowResize(resizeChange); // respond to changes that are relevant for the listeners\n\n  react.useEffect(function () {\n    removeListeners();\n    addListeners();\n  }, [scroll, scrollChange, resizeChange]); // remove all listeners when the components unmounts\n\n  react.useEffect(function () {\n    return removeListeners;\n  }, []);\n  return [ref, bounds, forceRefresh];\n} // Adds native resize listener to window\n\n\nfunction useOnWindowResize(onWindowResize) {\n  react.useEffect(function () {\n    var cb = onWindowResize;\n    window.addEventListener('resize', cb);\n    return function () {\n      return void window.removeEventListener('resize', cb);\n    };\n  }, [onWindowResize]);\n}\n\nfunction useOnWindowScroll(onScroll, enabled) {\n  react.useEffect(function () {\n    if (enabled) {\n      var _cb = onScroll;\n      window.addEventListener('scroll', _cb, {\n        capture: true,\n        passive: true\n      });\n      return function () {\n        return void window.removeEventListener('scroll', _cb, true);\n      };\n    }\n  }, [onScroll, enabled]);\n} // Returns a list of scroll offsets\n\n\nfunction findScrollContainers(element) {\n  var result = [];\n  if (!element || element === document.body) return result;\n\n  var _window$getComputedSt = window.getComputedStyle(element),\n      overflow = _window$getComputedSt.overflow,\n      overflowX = _window$getComputedSt.overflowX,\n      overflowY = _window$getComputedSt.overflowY;\n\n  if ([overflow, overflowX, overflowY].some(function (prop) {\n    return prop === 'auto' || prop === 'scroll';\n  })) result.push(element);\n  return [].concat(result, findScrollContainers(element.parentElement));\n} // Checks if element boundaries are equal\n\n\nvar keys = ['x', 'y', 'top', 'bottom', 'left', 'right', 'width', 'height'];\n\nvar areBoundsEqual = function areBoundsEqual(a, b) {\n  return keys.every(function (key) {\n    return a[key] === b[key];\n  });\n};\n\nmodule.exports = useMeasure;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcmVhY3QtdXNlLW1lYXN1cmUvZGlzdC93ZWIuY2pzLmpzIiwibWFwcGluZ3MiOiJBQUFhOztBQUViLFlBQVksbUJBQU8sQ0FBQyx3R0FBTztBQUMzQixxQkFBcUIsbUJBQU8sQ0FBQyx3REFBVTs7QUFFdkMscUNBQXFDLDREQUE0RDs7QUFFakc7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpR0FBaUc7O0FBRWpHO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSwwQkFBMEI7OztBQUcxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRyxHQUFHOztBQUVOO0FBQ0Esb0dBQW9HOztBQUVwRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHLEdBQUc7O0FBRU47QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLGtDQUFrQzs7O0FBR2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOzs7QUFHSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBLElBQUk7OztBQUdKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7OztBQUdMO0FBQ0EsbUNBQW1DOztBQUVuQztBQUNBO0FBQ0E7QUFDQSxHQUFHLHlDQUF5Qzs7QUFFNUM7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEVBQUU7OztBQUdGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7OztBQUdGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsRUFBRTs7O0FBR0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3BhY2Vwb3J0Zm9saW8vLi9ub2RlX21vZHVsZXMvcmVhY3QtdXNlLW1lYXN1cmUvZGlzdC93ZWIuY2pzLmpzP2IwMmEiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIGNyZWF0ZURlYm91bmNlID0gcmVxdWlyZSgnZGVib3VuY2UnKTtcblxuZnVuY3Rpb24gX2ludGVyb3BEZWZhdWx0TGVnYWN5IChlKSB7IHJldHVybiBlICYmIHR5cGVvZiBlID09PSAnb2JqZWN0JyAmJiAnZGVmYXVsdCcgaW4gZSA/IGUgOiB7ICdkZWZhdWx0JzogZSB9OyB9XG5cbnZhciBjcmVhdGVEZWJvdW5jZV9fZGVmYXVsdCA9IC8qI19fUFVSRV9fKi9faW50ZXJvcERlZmF1bHRMZWdhY3koY3JlYXRlRGVib3VuY2UpO1xuXG5mdW5jdGlvbiB1c2VNZWFzdXJlKF90ZW1wKSB7XG4gIHZhciBfcmVmID0gX3RlbXAgPT09IHZvaWQgMCA/IHtcbiAgICBkZWJvdW5jZTogMCxcbiAgICBzY3JvbGw6IGZhbHNlLFxuICAgIG9mZnNldFNpemU6IGZhbHNlXG4gIH0gOiBfdGVtcCxcbiAgICAgIGRlYm91bmNlID0gX3JlZi5kZWJvdW5jZSxcbiAgICAgIHNjcm9sbCA9IF9yZWYuc2Nyb2xsLFxuICAgICAgcG9seWZpbGwgPSBfcmVmLnBvbHlmaWxsLFxuICAgICAgb2Zmc2V0U2l6ZSA9IF9yZWYub2Zmc2V0U2l6ZTtcblxuICB2YXIgUmVzaXplT2JzZXJ2ZXIgPSBwb2x5ZmlsbCB8fCAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgPyBmdW5jdGlvbiBSZXNpemVPYnNlcnZlcigpIHt9IDogd2luZG93LlJlc2l6ZU9ic2VydmVyKTtcblxuICBpZiAoIVJlc2l6ZU9ic2VydmVyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBSZXNpemVPYnNlcnZlciBvdXQgb2YgdGhlIGJveC4gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vcmVhY3Qtc3ByaW5nL3JlYWN0LXVzZS1tZWFzdXJlLyNyZXNpemUtb2JzZXJ2ZXItcG9seWZpbGxzJyk7XG4gIH1cblxuICB2YXIgX3VzZVN0YXRlID0gcmVhY3QudXNlU3RhdGUoe1xuICAgIGxlZnQ6IDAsXG4gICAgdG9wOiAwLFxuICAgIHdpZHRoOiAwLFxuICAgIGhlaWdodDogMCxcbiAgICBib3R0b206IDAsXG4gICAgcmlnaHQ6IDAsXG4gICAgeDogMCxcbiAgICB5OiAwXG4gIH0pLFxuICAgICAgYm91bmRzID0gX3VzZVN0YXRlWzBdLFxuICAgICAgc2V0ID0gX3VzZVN0YXRlWzFdOyAvLyBrZWVwIGFsbCBzdGF0ZSBpbiBhIHJlZlxuXG5cbiAgdmFyIHN0YXRlID0gcmVhY3QudXNlUmVmKHtcbiAgICBlbGVtZW50OiBudWxsLFxuICAgIHNjcm9sbENvbnRhaW5lcnM6IG51bGwsXG4gICAgcmVzaXplT2JzZXJ2ZXI6IG51bGwsXG4gICAgbGFzdEJvdW5kczogYm91bmRzXG4gIH0pOyAvLyBzZXQgYWN0dWFsIGRlYm91bmNlIHZhbHVlcyBlYXJseSwgc28gZWZmZWN0cyBrbm93IGlmIHRoZXkgc2hvdWxkIHJlYWN0IGFjY29yZGluZ2x5XG5cbiAgdmFyIHNjcm9sbERlYm91bmNlID0gZGVib3VuY2UgPyB0eXBlb2YgZGVib3VuY2UgPT09ICdudW1iZXInID8gZGVib3VuY2UgOiBkZWJvdW5jZS5zY3JvbGwgOiBudWxsO1xuICB2YXIgcmVzaXplRGVib3VuY2UgPSBkZWJvdW5jZSA/IHR5cGVvZiBkZWJvdW5jZSA9PT0gJ251bWJlcicgPyBkZWJvdW5jZSA6IGRlYm91bmNlLnJlc2l6ZSA6IG51bGw7IC8vIG1ha2Ugc3VyZSB0byB1cGRhdGUgc3RhdGUgb25seSBhcyBsb25nIGFzIHRoZSBjb21wb25lbnQgaXMgdHJ1bHkgbW91bnRlZFxuXG4gIHZhciBtb3VudGVkID0gcmVhY3QudXNlUmVmKGZhbHNlKTtcbiAgcmVhY3QudXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICBtb3VudGVkLmN1cnJlbnQgPSB0cnVlO1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdm9pZCAobW91bnRlZC5jdXJyZW50ID0gZmFsc2UpO1xuICAgIH07XG4gIH0pOyAvLyBtZW1vaXplIGhhbmRsZXJzLCBzbyBldmVudC1saXN0ZW5lcnMga25vdyB3aGVuIHRoZXkgc2hvdWxkIHVwZGF0ZVxuXG4gIHZhciBfdXNlTWVtbyA9IHJlYWN0LnVzZU1lbW8oZnVuY3Rpb24gKCkge1xuICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uIGNhbGxiYWNrKCkge1xuICAgICAgaWYgKCFzdGF0ZS5jdXJyZW50LmVsZW1lbnQpIHJldHVybjtcblxuICAgICAgdmFyIF9yZWYyID0gc3RhdGUuY3VycmVudC5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgICAgIGxlZnQgPSBfcmVmMi5sZWZ0LFxuICAgICAgICAgIHRvcCA9IF9yZWYyLnRvcCxcbiAgICAgICAgICB3aWR0aCA9IF9yZWYyLndpZHRoLFxuICAgICAgICAgIGhlaWdodCA9IF9yZWYyLmhlaWdodCxcbiAgICAgICAgICBib3R0b20gPSBfcmVmMi5ib3R0b20sXG4gICAgICAgICAgcmlnaHQgPSBfcmVmMi5yaWdodCxcbiAgICAgICAgICB4ID0gX3JlZjIueCxcbiAgICAgICAgICB5ID0gX3JlZjIueTtcblxuICAgICAgdmFyIHNpemUgPSB7XG4gICAgICAgIGxlZnQ6IGxlZnQsXG4gICAgICAgIHRvcDogdG9wLFxuICAgICAgICB3aWR0aDogd2lkdGgsXG4gICAgICAgIGhlaWdodDogaGVpZ2h0LFxuICAgICAgICBib3R0b206IGJvdHRvbSxcbiAgICAgICAgcmlnaHQ6IHJpZ2h0LFxuICAgICAgICB4OiB4LFxuICAgICAgICB5OiB5XG4gICAgICB9O1xuXG4gICAgICBpZiAoc3RhdGUuY3VycmVudC5lbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgb2Zmc2V0U2l6ZSkge1xuICAgICAgICBzaXplLmhlaWdodCA9IHN0YXRlLmN1cnJlbnQuZWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIHNpemUud2lkdGggPSBzdGF0ZS5jdXJyZW50LmVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgICB9XG5cbiAgICAgIE9iamVjdC5mcmVlemUoc2l6ZSk7XG4gICAgICBpZiAobW91bnRlZC5jdXJyZW50ICYmICFhcmVCb3VuZHNFcXVhbChzdGF0ZS5jdXJyZW50Lmxhc3RCb3VuZHMsIHNpemUpKSBzZXQoc3RhdGUuY3VycmVudC5sYXN0Qm91bmRzID0gc2l6ZSk7XG4gICAgfTtcblxuICAgIHJldHVybiBbY2FsbGJhY2ssIHJlc2l6ZURlYm91bmNlID8gY3JlYXRlRGVib3VuY2VfX2RlZmF1bHRbXCJkZWZhdWx0XCJdKGNhbGxiYWNrLCByZXNpemVEZWJvdW5jZSkgOiBjYWxsYmFjaywgc2Nyb2xsRGVib3VuY2UgPyBjcmVhdGVEZWJvdW5jZV9fZGVmYXVsdFtcImRlZmF1bHRcIl0oY2FsbGJhY2ssIHNjcm9sbERlYm91bmNlKSA6IGNhbGxiYWNrXTtcbiAgfSwgW3NldCwgb2Zmc2V0U2l6ZSwgc2Nyb2xsRGVib3VuY2UsIHJlc2l6ZURlYm91bmNlXSksXG4gICAgICBmb3JjZVJlZnJlc2ggPSBfdXNlTWVtb1swXSxcbiAgICAgIHJlc2l6ZUNoYW5nZSA9IF91c2VNZW1vWzFdLFxuICAgICAgc2Nyb2xsQ2hhbmdlID0gX3VzZU1lbW9bMl07IC8vIGNsZWFudXAgY3VycmVudCBzY3JvbGwtbGlzdGVuZXJzIC8gb2JzZXJ2ZXJzXG5cblxuICBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcnMoKSB7XG4gICAgaWYgKHN0YXRlLmN1cnJlbnQuc2Nyb2xsQ29udGFpbmVycykge1xuICAgICAgc3RhdGUuY3VycmVudC5zY3JvbGxDb250YWluZXJzLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgc2Nyb2xsQ2hhbmdlLCB0cnVlKTtcbiAgICAgIH0pO1xuICAgICAgc3RhdGUuY3VycmVudC5zY3JvbGxDb250YWluZXJzID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoc3RhdGUuY3VycmVudC5yZXNpemVPYnNlcnZlcikge1xuICAgICAgc3RhdGUuY3VycmVudC5yZXNpemVPYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICBzdGF0ZS5jdXJyZW50LnJlc2l6ZU9ic2VydmVyID0gbnVsbDtcbiAgICB9XG4gIH0gLy8gYWRkIHNjcm9sbC1saXN0ZW5lcnMgLyBvYnNlcnZlcnNcblxuXG4gIGZ1bmN0aW9uIGFkZExpc3RlbmVycygpIHtcbiAgICBpZiAoIXN0YXRlLmN1cnJlbnQuZWxlbWVudCkgcmV0dXJuO1xuICAgIHN0YXRlLmN1cnJlbnQucmVzaXplT2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoc2Nyb2xsQ2hhbmdlKTtcbiAgICBzdGF0ZS5jdXJyZW50LnJlc2l6ZU9ic2VydmVyLm9ic2VydmUoc3RhdGUuY3VycmVudC5lbGVtZW50KTtcblxuICAgIGlmIChzY3JvbGwgJiYgc3RhdGUuY3VycmVudC5zY3JvbGxDb250YWluZXJzKSB7XG4gICAgICBzdGF0ZS5jdXJyZW50LnNjcm9sbENvbnRhaW5lcnMuZm9yRWFjaChmdW5jdGlvbiAoc2Nyb2xsQ29udGFpbmVyKSB7XG4gICAgICAgIHJldHVybiBzY3JvbGxDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgc2Nyb2xsQ2hhbmdlLCB7XG4gICAgICAgICAgY2FwdHVyZTogdHJ1ZSxcbiAgICAgICAgICBwYXNzaXZlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9IC8vIHRoZSByZWYgd2UgZXhwb3NlIHRvIHRoZSB1c2VyXG5cblxuICB2YXIgcmVmID0gZnVuY3Rpb24gcmVmKG5vZGUpIHtcbiAgICBpZiAoIW5vZGUgfHwgbm9kZSA9PT0gc3RhdGUuY3VycmVudC5lbGVtZW50KSByZXR1cm47XG4gICAgcmVtb3ZlTGlzdGVuZXJzKCk7XG4gICAgc3RhdGUuY3VycmVudC5lbGVtZW50ID0gbm9kZTtcbiAgICBzdGF0ZS5jdXJyZW50LnNjcm9sbENvbnRhaW5lcnMgPSBmaW5kU2Nyb2xsQ29udGFpbmVycyhub2RlKTtcbiAgICBhZGRMaXN0ZW5lcnMoKTtcbiAgfTsgLy8gYWRkIGdlbmVyYWwgZXZlbnQgbGlzdGVuZXJzXG5cblxuICB1c2VPbldpbmRvd1Njcm9sbChzY3JvbGxDaGFuZ2UsIEJvb2xlYW4oc2Nyb2xsKSk7XG4gIHVzZU9uV2luZG93UmVzaXplKHJlc2l6ZUNoYW5nZSk7IC8vIHJlc3BvbmQgdG8gY2hhbmdlcyB0aGF0IGFyZSByZWxldmFudCBmb3IgdGhlIGxpc3RlbmVyc1xuXG4gIHJlYWN0LnVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgcmVtb3ZlTGlzdGVuZXJzKCk7XG4gICAgYWRkTGlzdGVuZXJzKCk7XG4gIH0sIFtzY3JvbGwsIHNjcm9sbENoYW5nZSwgcmVzaXplQ2hhbmdlXSk7IC8vIHJlbW92ZSBhbGwgbGlzdGVuZXJzIHdoZW4gdGhlIGNvbXBvbmVudHMgdW5tb3VudHNcblxuICByZWFjdC51c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiByZW1vdmVMaXN0ZW5lcnM7XG4gIH0sIFtdKTtcbiAgcmV0dXJuIFtyZWYsIGJvdW5kcywgZm9yY2VSZWZyZXNoXTtcbn0gLy8gQWRkcyBuYXRpdmUgcmVzaXplIGxpc3RlbmVyIHRvIHdpbmRvd1xuXG5cbmZ1bmN0aW9uIHVzZU9uV2luZG93UmVzaXplKG9uV2luZG93UmVzaXplKSB7XG4gIHJlYWN0LnVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNiID0gb25XaW5kb3dSZXNpemU7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGNiKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHZvaWQgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGNiKTtcbiAgICB9O1xuICB9LCBbb25XaW5kb3dSZXNpemVdKTtcbn1cblxuZnVuY3Rpb24gdXNlT25XaW5kb3dTY3JvbGwob25TY3JvbGwsIGVuYWJsZWQpIHtcbiAgcmVhY3QudXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoZW5hYmxlZCkge1xuICAgICAgdmFyIF9jYiA9IG9uU2Nyb2xsO1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIF9jYiwge1xuICAgICAgICBjYXB0dXJlOiB0cnVlLFxuICAgICAgICBwYXNzaXZlOiB0cnVlXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB2b2lkIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBfY2IsIHRydWUpO1xuICAgICAgfTtcbiAgICB9XG4gIH0sIFtvblNjcm9sbCwgZW5hYmxlZF0pO1xufSAvLyBSZXR1cm5zIGEgbGlzdCBvZiBzY3JvbGwgb2Zmc2V0c1xuXG5cbmZ1bmN0aW9uIGZpbmRTY3JvbGxDb250YWluZXJzKGVsZW1lbnQpIHtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBpZiAoIWVsZW1lbnQgfHwgZWxlbWVudCA9PT0gZG9jdW1lbnQuYm9keSkgcmV0dXJuIHJlc3VsdDtcblxuICB2YXIgX3dpbmRvdyRnZXRDb21wdXRlZFN0ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCksXG4gICAgICBvdmVyZmxvdyA9IF93aW5kb3ckZ2V0Q29tcHV0ZWRTdC5vdmVyZmxvdyxcbiAgICAgIG92ZXJmbG93WCA9IF93aW5kb3ckZ2V0Q29tcHV0ZWRTdC5vdmVyZmxvd1gsXG4gICAgICBvdmVyZmxvd1kgPSBfd2luZG93JGdldENvbXB1dGVkU3Qub3ZlcmZsb3dZO1xuXG4gIGlmIChbb3ZlcmZsb3csIG92ZXJmbG93WCwgb3ZlcmZsb3dZXS5zb21lKGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgcmV0dXJuIHByb3AgPT09ICdhdXRvJyB8fCBwcm9wID09PSAnc2Nyb2xsJztcbiAgfSkpIHJlc3VsdC5wdXNoKGVsZW1lbnQpO1xuICByZXR1cm4gW10uY29uY2F0KHJlc3VsdCwgZmluZFNjcm9sbENvbnRhaW5lcnMoZWxlbWVudC5wYXJlbnRFbGVtZW50KSk7XG59IC8vIENoZWNrcyBpZiBlbGVtZW50IGJvdW5kYXJpZXMgYXJlIGVxdWFsXG5cblxudmFyIGtleXMgPSBbJ3gnLCAneScsICd0b3AnLCAnYm90dG9tJywgJ2xlZnQnLCAncmlnaHQnLCAnd2lkdGgnLCAnaGVpZ2h0J107XG5cbnZhciBhcmVCb3VuZHNFcXVhbCA9IGZ1bmN0aW9uIGFyZUJvdW5kc0VxdWFsKGEsIGIpIHtcbiAgcmV0dXJuIGtleXMuZXZlcnkoZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiBhW2tleV0gPT09IGJba2V5XTtcbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHVzZU1lYXN1cmU7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/react-use-measure/dist/web.cjs.js\n");

/***/ })

};
;