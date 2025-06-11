
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