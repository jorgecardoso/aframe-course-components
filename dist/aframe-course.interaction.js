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

/***/ "./src/interaction/new-event-set.js":
/*!******************************************!*\
  !*** ./src/interaction/new-event-set.js ***!
  \******************************************/
/***/ ((module) => {

const EPS = 0.1;




var styleParser = AFRAME.utils.styleParser;

/* global AFRAME */
// AFRAME styleParse has one issue: it transforms hyphenated keys to camel-case.
// This is a problem when those keys are component names, as A-Frame component
// names often include hyphens, and are not converted internally to camel case.

// To compensate for this, we post-process the data from the parser:
// - analyze the first part of the string, represeting the component
// - if translating this out of camel case to a dashed value gives
//   a better match against known A-Frame components, then use the dashed value
//   for the component name.

// This solution is not 100% robust, but good enough for most circumstances.
// - Will not handle component names that have a mix of camel case and dashes
//   e.g. example-componentOne
// - Could give incorrect results in case where two components have names that
//   only differ by their casing.
//   e.g. example-component-two & exampleComponentTwo
var styleParse = function styleParse(value) {

  function dashLowerCase(str) {
    return '-' + str[0].toLowerCase();
  }

  function fromCamelCase(str) {
    return str.replace(/([A-Z])/g, dashLowerCase);
  }

  var data = AFRAME.utils.styleParser.parse(value);

  var key;
  var component;
  var remainder;
  var dashComponent;
  var dashKey;

  for (key in data) {
    component = key.split('.')[0];
    remainder = key.split('.').slice(1).join('.');
    dashComponent = fromCamelCase(component);
    if (component === dashComponent) {
      continue;
    }

    if (AFRAME.components[dashComponent] && !AFRAME.components[component]) {
      dashKey = dashComponent.concat('.', remainder);
      data[dashKey] = data[key];
      delete data[key];
    }
  }

  return data;
};

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

module.exports =  AFRAME.registerComponent('new-event-set', {
  schema: {
    default: '',
    parse: function (value) {
        console.log("value: ", value);
        let r = styleParse(value);
        console.log("parsed: ", r)
      return r;
    },
    stringify: function (data) {
        console.log("stringify: ",data);
      return styleParser.stringify(data);
    },
  },

  multiple: true,

  init: function () {
    this.eventHandler = null;
    this.eventName = null;
  },

  update: function (oldData) {
    this.removeEventListener();
    this.updateEventListener();
    this.addEventListener();
  },

  pause: function () {
    this.removeEventListener();
  },

  play: function () {
    this.addEventListener();
  },

  /**
   * Update source-of-truth event listener registry.
   * Does not actually attach event listeners yet.
   */
  updateEventListener: function () {
    var data = this.data;
    var el = this.el;
    var event;
    var target;
    var targetEl;

    // Set event listener using `_event`.
    event = data._event || this.id;
    target = data._target;

    // Decide the target to `setAttribute` on.
    targetEl = target ? el.sceneEl.querySelector(target) : el;

    this.eventName = event;

    const handler = () => {
      var propName;
      // Set attributes.
      for (propName in data) {
        if (propName === '_event' || propName === '_target') { continue; }
        AFRAME.utils.entity.setComponentProperty.call(this, targetEl, propName,
                                                      data[propName]);
      }
    };

    if (!isNaN(data._delay)) {
      // Delay.
      this.eventHandler = () => { setTimeout(handler, parseFloat(data._delay)); };
    } else {
      this.eventHandler = handler;
    }
  },

  addEventListener: function () {
    this.el.addEventListener(this.eventName, this.eventHandler);
  },

  removeEventListener: function () {
    this.el.removeEventListener(this.eventName, this.eventHandler);
  }
});

/***/ }),

/***/ "./src/interaction/playvideo.js":
/*!**************************************!*\
  !*** ./src/interaction/playvideo.js ***!
  \**************************************/
/***/ ((module) => {


let playvideo = AFRAME.registerComponent('playvideo', {
  schema: { type: 'selector', default: 'video' },
  init: function () {
    console.log("Playing video", this.data)

    try {
      this.data.loop = false;
      this.data.play();
    } catch (e) {
      console.log(e);
    }

    let target = null;
    if (this.el.components['videotarget'] && this.el.components['videotarget'].data) {
      target = this.el.components['videotarget'].data;
    } else { // if no videotarget is set, play on self
      target = this.el;
    }
    console.log("Playing on: ", target);
    target.setAttribute('src', this.el.components['playvideo'].attrValue);

    // Automatically remove the component after playing
    setTimeout(function () {
      this.el.removeAttribute('playvideo');
    }.bind(this), 100);

  },
  remove: function () {
    console.log("Removing playvideo")
  }
});


let loopvideo = AFRAME.registerComponent('loopvideo', {
  schema: { type: 'selector', default: 'video' },
  init: function () {
    console.log("Looping video", this.data)

    try {
      this.data.loop = true;
      this.data.play();
    } catch (e) {
      console.log(e);
    }

    let target = null;
    if (this.el.components['videotarget'] && this.el.components['videotarget'].data) {
      target = this.el.components['videotarget'].data;
    } else { // if no videotarget is set, play on self
      target = this.el;
    }
    console.log("Playing on: ", target);
    target.setAttribute('src', this.el.components['loopvideo'].attrValue);

    setTimeout(function () {
      this.el.removeAttribute('loopvideo');
    }.bind(this), 100);

  },
  remove: function () {
    console.log("Removing loopvideo")
  }
});


let stopallvideos = AFRAME.registerComponent('stopallvideos', {
  init: function () {
    console.log("Stopping all videos")

    // Check if videoset component exists
    if (this.el.components['videoset']) {
       console.log(this.el.components['videoset'].data);
      this.el.components['videoset'].data.forEach(function (v) {
        v.pause();
        v.currentTime = 0;
      });
    } else {
      // Check if there is a video in the current entity
      if (this.el.getAttribute('src') ) {
        let video = document.querySelector(this.el.getAttribute('src'));
        if (video && video.tagName.toLowerCase() === 'video') {
          console.log("Stopping video on self: ", video);
          video.pause();
          video.currentTime = 0;
        } else {
          console.warn("No video found in the current entity.");
        }
      }
    }
   
    setTimeout(function () {
      this.el.removeAttribute('stopallvideos');
    }.bind(this), 100);

  },
  remove: function () {
    console.log("Removing stopallvideos")
  }
});

let pauseallvideos = AFRAME.registerComponent('pauseallvideos', {
  init: function () {
    console.log("Pausing all videos")
      // Check if videoset component exists
    if (this.el.components['videoset']) {
       console.log(this.el.components['videoset'].data);
      this.el.components['videoset'].data.forEach(function (v) {
        v.pause();
      });
    } else {
      // Check if there is a video in the current entity
      if (this.el.getAttribute('src') ) {
        let video = document.querySelector(this.el.getAttribute('src'));
        if (video && video.tagName.toLowerCase() === 'video') {
          console.log("Pausing video on self: ", video);
          video.pause();
        } else {
          console.warn("No video found in the current entity.");
        }
      }
    }

    setTimeout(function () {
      this.el.removeAttribute('pauseallvideos');
    }.bind(this), 100);

  },
  remove: function () {
    console.log("Removing pauseallvideos")
  }
});



/**
 * videotarget component is used to set a target video entity.
 */
let videotarget = AFRAME.registerComponent('videotarget', {
  schema: { type: 'selector', default: 'a-video' },

  init: function () {
  }
});


let videoset = AFRAME.registerComponent('videoset', {
  schema: { type: 'selectorAll', default: 'videos' },

  init: function () {
  }
});

module.exports =  [playvideo, loopvideo, stopallvideos, pauseallvideos, videotarget, videoset];

/***/ }),

/***/ "./src/interaction/toggle-controls.js":
/*!********************************************!*\
  !*** ./src/interaction/toggle-controls.js ***!
  \********************************************/
/***/ ((module) => {

/* Taken from https://github.com/mattrei/aframe-toggle-controls-component 
Removed restriction to A-Entity and A-Scene tags.
 */
if (typeof AFRAME === 'undefined') {
    throw new Error('Component attempted to register before AFRAME was available.');
}

const bind = AFRAME.utils.bind;

module.exports = AFRAME.registerComponent('toggle-controls', {
    schema: {
        enabled: {
            default: true,
            type: 'boolean'
        },
        toggled: {
            default: false,
            type: 'boolean'
        },
        events: {
            type: 'array',
            default: []
        },
        type: {
            oneOf: ['single', 'double'],
            default: 'single'
        },
        onEvents: {
            type: 'array'
        },
        offEvents: {
            type: 'array'
        },
        toggleTimeout: {
            type: 'int',
            default: 400
        },
        eventCond: {
            default: ''
        }
    },

    multiple: true,

    init: function () {
        this.clickTimer = null;
        this.onToggle = bind(this.onToggle, this);
    },

    update: function (oldData) {
        const data = this.data;
        this.toggled = data.toggled;
        this.eventCond = data.eventCond && data.eventCond.split('=').length == 2 ? data.eventCond.split('=') : null;
    },

    play: function () {
        this.addEventListeners();
    },

    pause: function () {
        this.removeEventListeners();
    },

    remove: function () {
        this.pause();
    },

    addEventListeners: function () {
        addEventListeners(this.el, this.data.events, this.onToggle);
    },

    removeEventListeners: function () {
        removeEventListeners(this.el, this.data.events, this.onToggle);
    },

    onToggle: function (evt) {
        const data = this.data;

        if (!data.enabled) return;
        if (this.eventCond) {
            if (evt[this.eventCond[0]] !== this.eventCond[1]) return;
        }
        console.log(evt.target.tagName);
        if (
            true
            /*evt.target.tagName === 'A-ENTITY' 
                 || evt.target.tagName === 'A-SCENE'
                 
                 evt.target.tagName === 'CANVAS' 
                 || evt.target.tagName === 'A-SCENE'
                 || evt.target.tagName === 'BODY'
                 */
        ) {
            if (data.type === 'double') {
                if (this.clickTimer == null) {
                    this.clickTimer = setTimeout(() => {
                        this.clickTimer = null;
                    }, data.toggleTimeout);
                } else {
                    clearTimeout(this.clickTimer);
                    this.clickTimer = null;
                    this._toggle();
                }
            } else {
                this._toggle();
            }
        }
    },

    _toggle: function () {

        const data = this.data;

        if (this.toggled) {
            emitEvents(this.el, data.offEvents);
        } else {
            emitEvents(this.el, data.onEvents);
        }
        console.log(this.toggled)
        this.toggled = !this.toggled;
    }
});


function emitEvents(el, eventNames) {
    var i;
    for (i = 0; i < eventNames.length; i++) {
        el.emit(eventNames[i], null);
        console.log("emmited: ", eventNames[i])
    }
}


function addEventListeners(el, eventNames, handler) {
    var i;
    for (i = 0; i < eventNames.length; i++) {
        const eventName = eventNames[i];
        if (eventName.includes('key')) {
            window.addEventListener(eventName, handler);
        } else {
            el.addEventListener(eventName, handler);
        }
    }
}

function removeEventListeners(el, eventNames, handler) {
    var i;
    for (i = 0; i < eventNames.length; i++) {
        const eventName = eventNames[i];
        if (eventName.includes('key')) {
            window.removeEventListener(eventName, handler);
        } else {
            el.removeEventListener(eventName, handler);
        }
    }
}

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
/*!**********************************!*\
  !*** ./src/interaction/index.js ***!
  \**********************************/
__webpack_require__(/*! ./new-event-set */ "./src/interaction/new-event-set.js");
__webpack_require__(/*! ./toggle-controls */ "./src/interaction/toggle-controls.js");
__webpack_require__(/*! ./playvideo */ "./src/interaction/playvideo.js");
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=aframe-course.interaction.js.map