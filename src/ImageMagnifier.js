var React = require('react');

var Magnifier = React.createClass({

    propTypes: {

        // the size of the magnifier window
        size: React.PropTypes.number.isRequired,

        // x position on screen
        x: React.PropTypes.number.isRequired,

        // y position on screen
        y: React.PropTypes.number.isRequired,

        // x position relative to the image
        offsetX: React.PropTypes.number.isRequired,

        // y position relative to the image
        offsetY: React.PropTypes.number.isRequired,

        // the offset of the zoom bubble from the cursor
        cursorOffset: React.PropTypes.shape({
            x: React.PropTypes.number.isRequired,
            y: React.PropTypes.number.isRequired
        }).isRequired,

        // the size of the non-zoomed-in image
        smallImage: React.PropTypes.shape({
            src: React.PropTypes.string.isRequired,
            width: React.PropTypes.number.isRequired,
            height: React.PropTypes.number.isRequired
        }).isRequired,

        // the size of the zoomed-in image
        zoomImage: React.PropTypes.shape({
            src: React.PropTypes.string.isRequired,
            width: React.PropTypes.number.isRequired,
            height: React.PropTypes.number.isRequired
        }).isRequired
    },

    render () {
        var props = this.props;
        var halfSize = props.size / 2;
        var magX = props.zoomImage.width / props.smallImage.width;
        var magY = props.zoomImage.height / props.smallImage.height;
        var bgX = -(props.offsetX*magX - halfSize);
        var bgY = -(props.offsetY*magY - halfSize);
        var isVisible = props.offsetY < props.smallImage.height &&
                        props.offsetX < props.smallImage.width &&
                        props.offsetY > 0 &&
                        props.offsetX > 0;
        return (
            <div style={{
                position: 'absolute',
                display: isVisible ? 'block' : 'none',
                top: props.y,
                left: props.x,
                width: props.size,
                height: props.size,
                marginLeft: -halfSize + props.cursorOffset.x,
                marginTop: -halfSize + props.cursorOffset.y,
                backgroundColor: 'white',
                borderRadius: props.size,
                boxShadow: `1px 1px 6px rgba(0,0,0,0.3)`
            }}>
                <div style={{
                    width: props.size,
                    height: props.size,
                    backgroundImage: `url(${props.zoomImage.src})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: `${bgX}px ${bgY}px`,
                    borderRadius: props.size
                }} />
            </div>
        );
    }
});

function getOffset(el) {
    var x = 0;
    var y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        x += el.offsetLeft - el.scrollLeft;
        y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { x, y };
}

var ImageMagnifier = React.createClass({

    propTypes: {

        // the size of the magnifier window
        size: React.PropTypes.number,

        // the offset of the zoom bubble from the cursor
        cursorOffset: React.PropTypes.shape({
            x: React.PropTypes.number.isRequired,
            y: React.PropTypes.number.isRequired
        }),

        // the size of the non-zoomed-in image
        image: React.PropTypes.shape({
            src: React.PropTypes.string.isRequired,
            width: React.PropTypes.number.isRequired,
            height: React.PropTypes.number.isRequired
        }).isRequired,

        // the size of the zoomed-in image
        zoomImage: React.PropTypes.shape({
            src: React.PropTypes.string.isRequired,
            width: React.PropTypes.number.isRequired,
            height: React.PropTypes.number.isRequired
        }).isRequired
    },

    portalElement: null,

    getDefaultProps () {
        return {
            size: 200,
            cursorOffset: { x: 0, y: 0 }
        };
    },

    getInitialState () {
        return {
            x: 0,
            y: 0,
            offsetX: -1,
            offsetY: -1
        };
    },

    componentDidMount() {
        document.addEventListener('mousemove', this.onMouseMove);
        if (!this.portalElement) {
            this.portalElement = document.createElement('div');
            document.body.appendChild(this.portalElement);
        }
        this.componentDidUpdate();
    },

    componentWillUnmount() {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.body.removeChild(this.portalElement);
        this.portalElement = null;
    },

    onMouseMove (e) {
        var offset = getOffset(this.getDOMNode());

        this.setState({
            x: e.x + window.scrollX,
            y: e.y + window.scrollY,
            offsetX: e.x - offset.x,
            offsetY: e.y - offset.y
        });
    },

    componentDidUpdate() {
        React.render(<Magnifier
            size={this.props.size}
            smallImage={this.props.image}
            zoomImage={this.props.zoomImage}
            cursorOffset={this.props.cursorOffset}
            {...this.state}
        />, this.portalElement);
    },

    render () {
        return (
            <img {...this.props} src={this.props.image.src} />
        );
    }
});

module.exports = ImageMagnifier;