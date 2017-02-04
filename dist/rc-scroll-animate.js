'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * FadeInUp Component
 *
 * this.state = {
 *  actualPercentage: {number}, // Percentage of actual scrolling
 *  animated: {boolean}, // Determinate if animation has been done at least one time
 *  percentage: {number}, // Percentage start animate. Default: 50
 *  animationClassName: {string}, // ClassName for animation. Animate.css
 *  hidden: {boolean}, // Element hidden at the start. Default: true
 *  loop: {boolean} // Animation loop. Default: false
 * }
 */

var _id = 'parallax' + new Date().getTime();
var _elemOffset = 0;

var ScrollAnimate = function (_Component) {
  _inherits(ScrollAnimate, _Component);

  function ScrollAnimate(props) {
    _classCallCheck(this, ScrollAnimate);

    var _this = _possibleConstructorReturn(this, (ScrollAnimate.__proto__ || Object.getPrototypeOf(ScrollAnimate)).call(this, props));

    _this.state = {
      actualPercentage: 0,
      animated: false,
      percentage: props.percentage || 50,
      animationClassName: props.animationClassName || '',
      hidden: typeof props.hidden === 'boolean' ? props.hidden : true,
      loop: props.loop || false
    };
    return _this;
  }

  _createClass(ScrollAnimate, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      _elemOffset = this.refs[_id].offsetTop - window.innerHeight;

      window.addEventListener('scroll', function () {
        var actualPercentage = void 0;
        var pageScrollTop = document.body.scrollTop;
        var windowHeight = window.innerHeight;

        pageScrollTop >= _elemOffset && pageScrollTop - _elemOffset <= windowHeight ? actualPercentage = parseInt((pageScrollTop - _elemOffset) * 100 / windowHeight) : pageScrollTop < _elemOffset ? actualPercentage = 0 : pageScrollTop - _elemOffset > windowHeight ? actualPercentage = 100 : null;

        _this2.setState({ actualPercentage: actualPercentage });
      });
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      var loop = nextState.loop,
          actualPercentage = nextState.actualPercentage,
          percentage = nextState.percentage,
          animated = nextState.animated;


      if (loop) {
        percentage < actualPercentage ? animated ? null : this.setState({ animated: true }) : !animated ? null : this.setState({ animated: false });
      } else {
        percentage < actualPercentage ? animated ? null : this.setState({ animated: true }) : null;
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize');
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          animated = _state.animated,
          hidden = _state.hidden,
          animationClassName = _state.animationClassName;
      var className = this.props.className;

      var classNameString = (className || '') + ' animated ' + (animated ? animationClassName : '');

      return _react2.default.createElement(
        'div',
        { ref: _id, className: classNameString, style: hidden ? { opacity: '0' } : {} },
        this.props.children
      );
    }
  }]);

  return ScrollAnimate;
}(_react.Component);

ScrollAnimate.propTypes = {
  percentage: _react.PropTypes.number,
  animationClassName: _react.PropTypes.string.isRequired,
  hidden: _react.PropTypes.bool,
  loop: _react.PropTypes.bool
};

exports.default = ScrollAnimate;
