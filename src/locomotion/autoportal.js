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