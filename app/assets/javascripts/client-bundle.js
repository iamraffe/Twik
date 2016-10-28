/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	eval("import 'babel-polyfill';\nimport React from 'react';\nimport { render } from 'react-dom';\nimport { Provider } from 'react-redux';\nimport { Router, browserHistory } from 'react-router';\nimport routes from './routes';\nimport configureStore from './store/configureStore';\n// require('./favicon.ico') // Tell webpack to load favicon.ico\nimport './styles/styles.scss'; // Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.\nimport { syncHistoryWithStore } from 'react-router-redux';\nimport LineChart from './components/charts/lineChart/LineChart';\n// import Chart from './components/charts/Chart'\nimport _ from 'lodash';\nimport d3 from 'd3';\nimport { loadReportUser } from './actions/builderActions';\nimport moment from 'moment';\nimport RegistrationWidget from './components/RegistrationWidget';\nimport StackedBarChart from './components/charts/barChart/StackedBarChart';\nimport Chart from './components/charts/Chart';\nimport { months } from './components/charts/common/utils';\nimport Engine from './components/DVE/Engine';\nimport Builder from './components/MAR/Builder';\n\nconst store = configureStore();\n\n// Create an enhanced history that syncs navigation events with the store\nconst history = syncHistoryWithStore(browserHistory, store);\n\nString.prototype.capitalize = function () {\n    return this.charAt(0).toUpperCase() + this.slice(1);\n};\n\nString.prototype.decapitalize = function () {\n    return this.charAt(0).toLowerCase() + this.slice(1);\n};\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvaW5kZXguanM/MWZkZiIsIndlYnBhY2s6Ly8vP2Q0MWQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdiYWJlbC1wb2x5ZmlsbCdcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7cmVuZGVyfSBmcm9tICdyZWFjdC1kb20nXG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHsgUm91dGVyLCBicm93c2VySGlzdG9yeSB9IGZyb20gJ3JlYWN0LXJvdXRlcidcbmltcG9ydCByb3V0ZXMgZnJvbSAnLi9yb3V0ZXMnXG5pbXBvcnQgY29uZmlndXJlU3RvcmUgZnJvbSAnLi9zdG9yZS9jb25maWd1cmVTdG9yZSdcbi8vIHJlcXVpcmUoJy4vZmF2aWNvbi5pY28nKSAvLyBUZWxsIHdlYnBhY2sgdG8gbG9hZCBmYXZpY29uLmljb1xuaW1wb3J0ICcuL3N0eWxlcy9zdHlsZXMuc2NzcycgLy8gWWVwLCB0aGF0J3MgcmlnaHQuIFlvdSBjYW4gaW1wb3J0IFNBU1MvQ1NTIGZpbGVzIHRvbyEgV2VicGFjayB3aWxsIHJ1biB0aGUgYXNzb2NpYXRlZCBsb2FkZXIgYW5kIHBsdWcgdGhpcyBpbnRvIHRoZSBwYWdlLlxuaW1wb3J0IHsgc3luY0hpc3RvcnlXaXRoU3RvcmUgfSBmcm9tICdyZWFjdC1yb3V0ZXItcmVkdXgnXG5pbXBvcnQgTGluZUNoYXJ0IGZyb20gJy4vY29tcG9uZW50cy9jaGFydHMvbGluZUNoYXJ0L0xpbmVDaGFydCdcbi8vIGltcG9ydCBDaGFydCBmcm9tICcuL2NvbXBvbmVudHMvY2hhcnRzL0NoYXJ0J1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IGQzIGZyb20gJ2QzJ1xuaW1wb3J0IHsgbG9hZFJlcG9ydFVzZXIgfSBmcm9tICcuL2FjdGlvbnMvYnVpbGRlckFjdGlvbnMnXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCdcbmltcG9ydCBSZWdpc3RyYXRpb25XaWRnZXQgZnJvbSAnLi9jb21wb25lbnRzL1JlZ2lzdHJhdGlvbldpZGdldCdcbmltcG9ydCBTdGFja2VkQmFyQ2hhcnQgZnJvbSAnLi9jb21wb25lbnRzL2NoYXJ0cy9iYXJDaGFydC9TdGFja2VkQmFyQ2hhcnQnXG5pbXBvcnQgQ2hhcnQgZnJvbSAnLi9jb21wb25lbnRzL2NoYXJ0cy9DaGFydCdcbmltcG9ydCB7IG1vbnRocyB9IGZyb20gJy4vY29tcG9uZW50cy9jaGFydHMvY29tbW9uL3V0aWxzJ1xuaW1wb3J0IEVuZ2luZSBmcm9tICcuL2NvbXBvbmVudHMvRFZFL0VuZ2luZSdcbmltcG9ydCBCdWlsZGVyIGZyb20gJy4vY29tcG9uZW50cy9NQVIvQnVpbGRlcidcblxuY29uc3Qgc3RvcmUgPSBjb25maWd1cmVTdG9yZSgpXG5cbi8vIENyZWF0ZSBhbiBlbmhhbmNlZCBoaXN0b3J5IHRoYXQgc3luY3MgbmF2aWdhdGlvbiBldmVudHMgd2l0aCB0aGUgc3RvcmVcbmNvbnN0IGhpc3RvcnkgPSBzeW5jSGlzdG9yeVdpdGhTdG9yZShicm93c2VySGlzdG9yeSwgc3RvcmUpXG5cblN0cmluZy5wcm90b3R5cGUuY2FwaXRhbGl6ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdGhpcy5zbGljZSgxKTtcbn1cblxuU3RyaW5nLnByb3RvdHlwZS5kZWNhcGl0YWxpemUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5jaGFyQXQoMCkudG9Mb3dlckNhc2UoKSArIHRoaXMuc2xpY2UoMSk7XG59XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9pbmRleC5qc1xuICoqLyIsInVuZGVmaW5lZFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIFxuICoqLyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FDQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9");

/***/ }
/******/ ]);