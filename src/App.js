// polyfills
require('es5-shim');
require('es5-shim/es5-sham');

var React = require('react');
var ImageMagnifier = require('./ImageMagnifier');

var App = React.createClass({

    render () {
        return (
            <div>
                <ImageMagnifier
                    image={{
                        src: "img/cat-small.jpg",
                        width: 400,
                        height: 300
                    }}
                    zoomImage={{
                        src: "img/cat-large.jpg",
                        width: 1024,
                        height: 768
                    }}
                />
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
                <ImageMagnifier
                    image={{
                        src: "img/fall-small.jpg",
                        width: 400,
                        height: 250
                    }}
                    zoomImage={{
                        src: "img/fall-large.jpg",
                        width: 1920,
                        height: 1200
                    }}
                />
            </div>
        );
    }
});

React.render(<App />, document.getElementById("mount"));