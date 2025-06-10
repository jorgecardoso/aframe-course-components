(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/locomotion/autoportal.js":
/*!**************************************!*\
  !*** ./src/locomotion/autoportal.js ***!
  \**************************************/
/***/ ((module) => {

 module.exports =  AFRAME.registerComponent('autoportal', {
      dependencies: ['aabb-collider'],
      schema: {
        rig: { type: 'string', default: "#rig" },
        debug: { type: 'boolean', default: false },
      },

      init: function () {
        console.log("Initting Auto Portal Component")
      },
      update: function () {
        this.rig = this.el.sceneEl.querySelector(this.data.rig);
        if (!this.rig)
          console.warn("Could not find player rig! Check 'rig' property: ", this.data.rig)
        else {
          this.rig.setAttribute("data-aabb-collider-dynamic");
          let cam = rig.querySelector("[camera]") || rig.querySelector("a-camera");
          let player = document.createElement("a-cylinder");
          player.setAttribute('radius', '0.2');
          player.setAttribute('height', '2');
          player.setAttribute('visible', 'false');
          cam.appendChild(player)
        }

        this.el.setAttribute('aabb-collider', 'objects', this.data.rig);
        this.el.setAttribute('aabb-collider', 'debug', this.data.debug);
        this.el.addEventListener('hitstart', function () {
          console.log("Auto Portal hit. Openning target")
          document.location.href = this.el.getAttribute('href');
        }.bind(this));

      }
    });

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
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*********************************!*\
  !*** ./src/locomotion/index.js ***!
  \*********************************/
__webpack_require__(/*! ./autoportal */ "./src/locomotion/autoportal.js");
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=aframe-course.locomotion.js.map