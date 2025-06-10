# Interaction

Components for implementing different kinds of interactions

- **new-event-set**: The original [`even-set` component](https://github.com/supermedium/superframe) is not able to change properties in components that have a dash `-` in the their name. 
Diarmid Mackenzie (diarmidmackenzie) has implemented a solution here: https://github.com/supermedium/superframe/pull/301. This solution has not yet been incorporated into the `event-set` component, so I created a `new-event-set` component that incorporates it. The documentation to follow is from the original `event-set` component. 
- **toggle-controls**: The original [`toggle-controls` component](https://github.com/mattrei/aframe-toggle-controls-component) restricts interactions to the `<a-scene>` or `<a-entity>` elements. I removed that restriction so that the component can be used with any element. The documentation to follow is from the original `toggle-controls` component. 

### Usage

```html
<script src="https://cdn.jsdelivr.net/gh/jorgecardoso/aframe-course-components/dist/aframe-course.min.js"></script>
```