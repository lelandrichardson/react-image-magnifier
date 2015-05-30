# react-image-magnifier
A react component that accepts a high-res source image and produces a magnifier window on mouse hover over the part of the image the cursor is over


## Demo

![](http://media.giphy.com/media/xTiTnidsMNlZlf9I2c/giphy.gif)


## Usage

```bash
> npm install --save react-image-magnifier
```

```jsx
var ImageMagnifer = require('react-image-magnifier');

var App = React.createClass({

    render () {
        return (
            <ImageMagnifier
                image={{
                    src: "img/beach-small.jpg",
                    width: 400,
                    height: 300
                }}
                zoomImage={{
                    src: "img/beach-large.jpg",
                    width: 1600,
                    height: 1200
                }}
                cursorOffset={{ x: 80, y: -80 }}
            />
        );
    }
});
```

## API (props)

| Prop | Required | Default  | Type | Description |
| :------------ |:---:|:---------------:| :---------------| :-----|
| `image` | YES | | `{ src, width, height }` | the src, size of the non-zoomed-in image |
| `zoomImage` | YES | | `{ src, width, height }` | the src, size of the zoomed-in image |
| `cursorOffset` | NO | `{ x: 0, y: 0 }` | `{ x, y }` | the offset of the zoom bubble from the cursor |
| `size` | NO | `200` | `Number` | the size of the magnifier window |