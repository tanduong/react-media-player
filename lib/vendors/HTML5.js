'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _vendorPropTypes = require('./vendor-prop-types');

var _vendorPropTypes2 = _interopRequireDefault(_vendorPropTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HTML5 = function (_Component) {
  _inherits(HTML5, _Component);

  function HTML5() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, HTML5);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = HTML5.__proto__ || Object.getPrototypeOf(HTML5)).call.apply(_ref, [this].concat(args))), _this), _this._isLoading = function () {
      _this.props.isLoading(true);
    }, _this._isNotLoading = function () {
      _this.props.isLoading(false);
    }, _this._handleCanPlay = function () {
      _this.props.onReady();
    }, _this._handlePlay = function () {
      _this.props.onPlay(true);
      _this._isNotLoading();
    }, _this._handlePause = function () {
      _this.props.onPause(false);
    }, _this._handleEnded = function () {
      _this.props.onEnded(false);
    }, _this._handleError = function (e) {
      _this.props.onError(e);
      _this._isNotLoading();
    }, _this._handleProgress = function (_ref2) {
      var _ref2$target = _ref2.target;
      var buffered = _ref2$target.buffered;
      var duration = _ref2$target.duration;

      var progress = 0;

      if (duration > 0) {
        progress = buffered.end(buffered.length - 1) / duration;
      }

      _this.props.onProgress(progress);
    }, _this._handleDuration = function (_ref3) {
      var duration = _ref3.target.duration;

      _this.props.onDuration(duration);
    }, _this._handleTimeUpdate = function (_ref4) {
      var currentTime = _ref4.target.currentTime;

      _this.props.onTimeUpdate(currentTime);
    }, _this._handleVolumeChange = function (_ref5) {
      var _ref5$target = _ref5.target;
      var volume = _ref5$target.volume;
      var muted = _ref5$target.muted;

      _this.props.onMute(muted);
      _this.props.onVolumeChange(volume);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(HTML5, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props;
      var src = _props.src;
      var useAudioObject = _props.extraProps.useAudioObject;


      if (useAudioObject) {
        this._createAudioObject(src);
        this._bindAudioObjectEvents(this.props);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var src = nextProps.src;
      var useAudioObject = nextProps.extraProps.useAudioObject;


      if (useAudioObject) {
        // destroy and recreate audio object to clean up any browser state
        if (this.props.src !== src) {
          this._destroyAudioObject();
          this._createAudioObject(src);
        }
        // bind any new props to current audio object
        this._bindAudioObjectEvents(nextProps);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.extraProps.useAudioObject) {
        this._destroyAudioObject();
      }
    }
  }, {
    key: 'play',
    value: function play() {
      this._player.play();
    }
  }, {
    key: 'pause',
    value: function pause() {
      this._player.pause();
    }
  }, {
    key: 'stop',
    value: function stop() {
      this._player.pause();
      this._player.currentTime = 0;
    }
  }, {
    key: 'seekTo',
    value: function seekTo(currentTime) {
      if (this._player.readyState > 0) {
        this._player.currentTime = currentTime;
      }
    }
  }, {
    key: 'mute',
    value: function mute(muted) {
      this._player.muted = muted;
    }
  }, {
    key: 'setVolume',
    value: function setVolume(volume) {
      this._player.volume = volume;
    }
  }, {
    key: '_createAudioObject',


    // Handle Audio Object
    value: function _createAudioObject(src) {
      this._player = new Audio(src);
    }
  }, {
    key: '_destroyAudioObject',
    value: function _destroyAudioObject() {
      this.stop();
      this._player = null;
    }
  }, {
    key: '_bindAudioObjectEvents',
    value: function _bindAudioObjectEvents(_ref6) {
      var _this2 = this;

      var extraProps = _ref6.extraProps;

      var playerEvents = this._playerEvents;

      Object.keys(extraProps).forEach(function (key) {
        _this2._player[key] = extraProps[key];
      });

      Object.keys(playerEvents).forEach(function (key) {
        _this2._player[key.toLowerCase()] = playerEvents[key];
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props2 = this.props;
      var vendor = _props2.vendor;
      var src = _props2.src;
      var _props$extraProps = this.props.extraProps;
      var useAudioObject = _props$extraProps.useAudioObject;

      var extraProps = _objectWithoutProperties(_props$extraProps, ['useAudioObject']);

      if (!useAudioObject) {
        return (0, _react.createElement)(vendor, _extends({
          ref: function ref(c) {
            return _this3._player = c;
          },
          src: src
        }, extraProps, this._playerEvents));
      } else {
        return null;
      }
    }
  }, {
    key: 'instance',
    get: function get() {
      return this._player;
    }
  }, {
    key: '_playerEvents',
    get: function get() {
      return {
        onCanPlay: this._handleCanPlay,
        onPlay: this._handlePlay,
        onPlaying: this._isNotLoading,
        onPause: this._handlePause,
        onEnded: this._handleEnded,
        onWaiting: this._isLoading,
        onError: this._handleError,
        onProgress: this._handleProgress,
        onLoadedMetadata: this._handleDuration,
        onTimeUpdate: this._handleTimeUpdate,
        onVolumeChange: this._handleVolumeChange
      };
    }
  }]);

  return HTML5;
}(_react.Component);

HTML5.propTypes = _extends({}, _vendorPropTypes2.default, {
  useAudioObject: _react.PropTypes.bool
});
exports.default = HTML5;