# Interaction

Components for implementing different kinds of interactions

- **new-event-set**: The original [`even-set` component](https://github.com/supermedium/superframe) is not able to change properties in components that have a dash `-` in the their name. 
Diarmid Mackenzie (diarmidmackenzie) has implemented a solution here: https://github.com/supermedium/superframe/pull/301. This solution has not yet been incorporated into the `event-set` component, so I created a `new-event-set` component that incorporates it. The documentation to follow is from the original `event-set` component. 
- **toggle-controls**: The original [`toggle-controls` component](https://github.com/mattrei/aframe-toggle-controls-component) restricts interactions to the `<a-scene>` or `<a-entity>` elements. I removed that restriction so that the component can be used with any element. The documentation to follow is from the original `toggle-controls` component. 
- **playvideo**: Allows playing videos by adding/removing components from an entity using, e.g., the `event-set` component.

## Usage

```html
<script src="https://cdn.jsdelivr.net/gh/jorgecardoso/aframe-course-components/dist/aframe-course.min.js"></script>
```

## new-event-set

## toggle-controls

## playvideo

The `playvideo` component is actually composed of several components:

| Component | Description |
|--- |--- |
|`playvideo` | If set on an entity, starts playing a video. The component automatically removes itself. |
|`loopvideo` | If set on an entity, loops a video. The component automatically removes itself. |
|`stopallvideos` | If set on an entity, stops all videos belonging to the video set of that entity. The component automatically removes itself. |
| `pauseallvideos` | If set on an entity, pauses all videos belonging to the video set of that entity. The component automatically removes itself. |
|`videotarget` | Defines the target entity on which to actually display the video played by the entity that has the `playvideo` component.|
|`videoset` | Defines a set of videos managed by the entity. |

### Example
```html
<a-scene cursor="rayOrigin: mouse">
    <a-assets>
      <video id="v4" src="../../assets/videos/v4.mp4"></video>
      <video id="v5" src="../../assets/videos/v5.mp4"></video>
      <video id="v6" src="../../assets/videos/v6.mp4"></video>
    </a-assets>

    <a-sky color="lightblue"></a-sky>

    <!-- The video panel where videos are displayed -->
    <a-video id="shared" width="3" position="0 1.5 -2"></a-video>

    <!-- Buttons to start/stop the videos. All buttons share the same videoset. Clicking on a button will first stop all videos, making sure tha the currently playing video is stopped, before playing the respective video associated with the button.  -->
    <a-box position="-1.5 0.5 -2" width="0.5" height="0.5" depth="0.1" color="red" videoset="#v4, #v5, #v6"
      videotarget="#shared" event-set__click="stopallvideos: true; playvideo: #v4;"></a-box>
    <a-box position="0 0.5 -2" width="0.5" height="0.5" depth="0.1" color="green" videoset="#v4, #v5, #v6"
      videotarget="#shared" event-set__click="stopallvideos:true; playvideo: #v5;"></a-box>
    <a-box position="1.5 0.5 -2" width="0.5" height="0.5" depth="0.1" color="blue" videoset="#v4, #v5, #v6"
      videotarget="#shared" event-set__click="stopallvideos:true; playvideo: #v6;"></a-box>
  </a-scene>
```
