![alt text](https://i.imgur.com/fECSINd.png "react-lanelayout")
# react-lanelayout

A component to display items with specific aspect ratios in horizontal or vertical lanes.

## How it works
`<LaneLayout/>` fits itself into the closest parent-element which is `relative` or `absolutely` positioned.
Based on your `lane`- & `gutter`- configuration and the available space, it adjusts the amounts of lanes accordingly. It iterates over your items and distributes them evenly throughout the lanes. Mousewheel events are captured and transformed so that even in horizontal-mode users can scroll with a standard mousewheel.

### Features
- **solid**: responsive, works on mobile/desktop, touch/non-touch
- **fast**: renders only currently visible items into the DOM
- **hassle-free**: handles `z-index` of _hovered_ items
- **smart**: captures wheel-events to unify scrolling in horizontal-/vertical-model
- **fancy**: allows to autoscroll with different speeds

## Demo
[Clickedy Click](https://mimimimichael.github.io/react-lanelayout)

## Installation

```
npm install react-lanelayout --save
```

## Usage
Usage is straight forward. Reasonable defaults are set, so after [correctly formating](#formatting-items) your items a basic example looks like this:

```js
import React from 'react'
import ReactDOM from 'react-dom'
import LaneLayout from 'react-lanelayout'

import MyItemRenderer from './MyItemRenderer'
import {items, moreItemsFunc} from './my-fancy-api'

const App = ({items, moreItemsFunc}) => <div>
    <LaneLayout items={items} itemRenderer={MyItemRenderer} onEnd={() => moreItemsFunc()}/>
</div>;

const target = document.getElementById("root");
ReactDOM.render(<App items={items} moreItemsFunc={moreItemsFunc} />, target);
```
### API
| Prop  | Type  | Default  | Description  |
|---|---|---|---|
| items | Array | `[]` | your [properly formatted](#formatting-items) items
| lanes  | Object  | [click](#lane-configuration) | configures lane behavior
| debug | Bool | `false` | adds debug outlines to every DOM-element generated by `<LaneLayout/>` |
| horizontal | Bool | `false` | enables horizontal mode
| gutter | Number | `16` | spacing between items in px
| outerGutter | Bool | `true` | apply the gutter also around items
| itemRenderer | Func | n/a | the function or React component used to render a single item
| onEnd | Func | n/a | function which is triggered when the user scrolled till the end
| autoScroll | Bool / Number | `false` | enables / disables autoscrolling and or sets the scroll-speed

#### [Lane Configuration](#lane-configuration)
To configure the amount of lanes you can hand over a lane-configuration object. The default looks like this:

```js
const lanes = {
      vertical: {
        0: 1,   // 1 lane  if the component is at least 0px wide
        480: 2, // 2 lanes if the component is min. 480px wide
        720: 3, // 3 lanes if the component is min. 720px wide
        960: 4, // ...
        1200: 5 // 5 lanes if the component is 1200 or more px wide
      },
      horizontal: {
        0: 1,   // 1 lane when the component is at least 0px in height
        480: 2, // 2 lanes when the component is min 480px in height
        720: 3, // 3 lanes when the component is min 720px in height
        960: 4, // ... got it? ...
        1200: 5 // 5 lanes if the component is 1200px or more in height
      }
    }
```
You can read it basically  like this:

```js
const lanes = {
    vertical: {
        MIN_WIDTH: AMOUNT_OF_LANES
    },
    horizontal: {
        MIN_HEIGHT: AMOUNT_OF_LANES
    }
}
```

Add as many breakpoints as you think make sense for your project.


#### [Formatting Items](#formatting-items)
To correctly display your items, `<LaneLayout/>` needs to know the _aspect ratio_ of them. This is the format of an item that `<LaneLayout/>` expects:
```js
 const item = {
    key: 1,         // a unique identifier
    ratio: 4 / 3,   // the width / height ratio of your item
    itemProps: {    // your actual item
        foo: 'bar'
    }
  };
```
##### Example:
You want to display photos. The shape of a photo-item looks like this:

```js
const photo = {
    id: 12345,
    url: 'https://example.com/photo1.jpg',
    width: 800,
    height: 600
}
```

This translates to the following item-shape:
```js
const item = {
    key: photo.id,
    ratio: photo.width / photo.height,
    itemProps: photo
}
````

Transform a whole collection:
```js
const items = photos.map(photo=>{
    return {
        key: photo.id,
        ratio: photo.width / photo.height,
        itemProps: photo
    }
});
```

## License
MIT
