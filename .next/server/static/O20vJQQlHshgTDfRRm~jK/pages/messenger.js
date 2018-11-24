module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 25);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ADD_MESSAGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ADD_HOUSE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ADD_USER; });
var ADD_MESSAGE = 'ADD_MESSAGE';
var ADD_HOUSE = 'ADD_HOUSE';
var ADD_USER = 'ADD_USER';

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return addMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addHouse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return addUser; });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

function addMessage(text, username, created_at) {
  return {
    type: ___WEBPACK_IMPORTED_MODULE_0__[/* ADD_MESSAGE */ "b"],
    text: text,
    username: username,
    created_at: created_at
  };
}
function addHouse(house_id, username, created_at) {
  return {
    type: ___WEBPACK_IMPORTED_MODULE_0__[/* ADD_HOUSE */ "a"],
    house_id: house_id,
    username: username,
    created_at: created_at
  };
}
function addUser(username, password) {
  return {
    type: ___WEBPACK_IMPORTED_MODULE_0__[/* ADD_USER */ "c"],
    username: username,
    password: password
  };
}

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports) {

module.exports = require("dayjs");

/***/ }),
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ (function(module, exports) {

module.exports = require("socket.io-client");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("lodash.throttle");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("next/link");

/***/ }),
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(30);


/***/ }),
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(0);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(2);

// EXTERNAL MODULE: external "socket.io-client"
var external_socket_io_client_ = __webpack_require__(15);
var external_socket_io_client_default = /*#__PURE__*/__webpack_require__.n(external_socket_io_client_);

// EXTERNAL MODULE: external "lodash.throttle"
var external_lodash_throttle_ = __webpack_require__(16);

// EXTERNAL MODULE: ./actions/message.js
var actions_message = __webpack_require__(4);

// EXTERNAL MODULE: external "dayjs"
var external_dayjs_ = __webpack_require__(8);
var external_dayjs_default = /*#__PURE__*/__webpack_require__.n(external_dayjs_);

// CONCATENATED MODULE: ./components/Message.js


/* harmony default export */ var Message = (function (_ref) {
  var message = _ref.message,
      username = _ref.username,
      firstMessage = _ref.firstMessage;
  var ownMessage = username === message.username;
  return external_react_default.a.createElement("li", {
    style: {
      listStyle: 'none'
    }
  }, external_react_default.a.createElement("div", {
    className: "message-container"
  }, external_react_default.a.createElement("div", {
    className: ownMessage ? 'my-subcontainer' : 'your-subcontainer'
  }, ownMessage && external_react_default.a.createElement("span", {
    className: "timestamp"
  }, external_dayjs_default()(message.created_at).format('h:mma'), '  '), !firstMessage && !ownMessage && external_react_default.a.createElement("span", {
    className: "message-username"
  }, message.username), external_react_default.a.createElement("div", {
    className: ownMessage ? 'my-message' : 'your-message'
  }, message.text), !ownMessage && external_react_default.a.createElement("span", {
    className: "timestamp"
  }, '  ', external_dayjs_default()(message.created_at).format('h:mma')))), external_react_default.a.createElement("style", null, "\n          .my-subcontainer {\n            text-align: right;\n          }\n        "));
});
// EXTERNAL MODULE: external "next/link"
var link_ = __webpack_require__(17);
var link_default = /*#__PURE__*/__webpack_require__.n(link_);

// CONCATENATED MODULE: ./components/NavBar.js



var NavBar_NavBar = function NavBar(_ref) {
  var getConvo = _ref.getConvo,
      friends = _ref.friends,
      changeHome = _ref.changeHome,
      changeMessage = _ref.changeMessage,
      currentView = _ref.currentView;
  return external_react_default.a.createElement("div", {
    id: "navbar-container"
  }, currentView === 'messenger' && external_react_default.a.createElement(link_default.a, {
    href: "/browser",
    prefetch: true
  }, external_react_default.a.createElement("a", null, external_react_default.a.createElement("img", {
    src: "../static/house.png",
    id: "house-button",
    alt: ""
  }))), external_react_default.a.createElement("div", {
    className: "dropdown"
  }, external_react_default.a.createElement("button", {
    className: "dropbtn"
  }, "Menu"), external_react_default.a.createElement("div", {
    className: "dropdown-content"
  }, currentView === 'browse' && external_react_default.a.createElement("a", {
    onClick: changeMessage
  }, "Messenger"), friends.slice(-5).map(function (friend, i) {
    return external_react_default.a.createElement("a", {
      key: i,
      onClick: function onClick() {
        return getConvo("".concat(friend));
      }
    }, friend);
  }))), external_react_default.a.createElement("style", null, "\n        a {\n        font-size: 12px;\n        }\n        #navbar-container {\n        display: flex;\n        justify-content: flex-end;\n        }\n        #house-button {\n        margin-right: 12px;\n        height: 50px;\n        width: auto;\n        }\n        .dropbtn {\n            background-color: #0069E0;\n            color: white;\n            padding: 10px;\n            font-size: 16px;\n            border: none;\n            cursor: pointer;\n            width: 120px;\n        }\n        .dropdown {\n            position: relative;\n            display: inline-block;\n            float: right;\n        }\n        .dropdown-content {\n            display: none;\n            position: absolute;\n            background-color: #f9f9f9;\n            min-width: 160px;\n            box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);\n            z-index: 1;\n        }\n        .dropdown-content a {\n            color: black;\n            // padding: 12px 16px;\n            text-decoration: none;\n            display: block;\n        }\n        .dropdown-content a:hover {background-color: #f1f1f1}\n        .dropdown:hover .dropdown-content {\n            display: block;\n        }\n        .dropdown:hover .dropbtn {\n            background-color: #0069E0;\n        }\n      "));
};

/* harmony default export */ var components_NavBar = (NavBar_NavBar);
// CONCATENATED MODULE: ./components/Messenger.js
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







 // const generateName = () => {
//   const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;
//   const firstName = [
//     'Jack',
//     'Steven',
//     'Brian',
//     'Marc',
//     'Drew',
//     'Stephanie',
//     'Daniel',
//     'James',
//     'Spencer',
//     'Caitlin',
//     'Jackie',
//     'Julius',
//     'Patrick',
//   ];
//   const lastName = [
//     'Li',
//     'Chung',
//     'Tiosejo',
//     'Louie',
//     'Curtis',
//     'Sockwell',
//     'Jiang',
//     'Bykowsky',
//     'Detro',
//     'Chen',
//     'Sea',
//     'Doyle',
//   ];
//   const name = `${firstName[getRandomInt(0, firstName.length)]
//   } ${
//     lastName[getRandomInt(0, lastName.length)]}`;
//   return name;
// };

var Messenger_Messenger =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Messenger, _React$Component);

  function Messenger(props) {
    var _this;

    _classCallCheck(this, Messenger);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Messenger).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleMessage", function (message) {
      _this.setState(function (state) {
        return {
          typing: state.typing.filter(function (_ref) {
            var username = _ref.username;
            return username !== message.username;
          })
        };
      });

      _this.setState(function (state) {
        return state.friends.add(message.username);
      });

      _this.setState(function (state) {
        return {
          messages: state.messages.concat(message)
        };
      });

      _this.props.addMessage(message.text, message.username, message.created_at);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "typingStatus", function (data) {
      var notIncluded = _this.state.typing.filter(function (el) {
        return el.username !== data;
      });

      for (var i = 0, len = _this.state.typing.length; i < len; ++i) {
        if (_this.state.typing[i].username === data) {
          clearTimeout(_this.state.typing[i].timeoutId);
        }
      }

      var timeoutId = setTimeout(function () {
        _this.setState(function (state) {
          return {
            typing: state.typing.filter(function (el) {
              return el.username !== data;
            })
          };
        });
      }, 3000);
      var status = {
        username: data,
        timeoutId: timeoutId
      };

      _this.setState(function (state) {
        return {
          typing: _toConsumableArray(notIncluded).concat([status])
        };
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getCurrentConvo", function (otherUser) {
      _this.setState(function () {
        var filtered = _this.props.messages.filter(function (message) {
          return message.username === otherUser || message.username === _this.username;
        });

        return {
          currentConvo: otherUser,
          messages: filtered
        };
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "showTypingStatus", function (e) {
      _this.socket.emit('typing', _this.username);

      _this.setState({
        text: e.target.value
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleSubmit", function (e) {
      e.preventDefault();

      if (_this.state.text !== '') {
        var message = {
          created_at: new Date().getTime(),
          username: _this.username,
          text: _this.state.text
        };

        _this.socket.emit('message', message);

        _this.props.addMessage(_this.state.text, _this.username, message.created_at);

        _this.setState(function (state) {
          return {
            text: '',
            messages: _this.state.messages.concat(message)
          };
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "scrollToBottom", function () {
      if (_this.el) {
        _this.el.scrollIntoView({
          behavior: 'instant'
        });
      }
    });

    _this.state = {
      text: '',
      messages: [],
      updated: false,
      currentConvo: '',
      friends: new Set(),
      currentView: 'messenger',
      typing: []
    };
    _this.username = _this.props.user.username;
    return _this;
  }

  _createClass(Messenger, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this2 = this;

      this.scrollToBottom();

      if (!this.state.messages.length && !this.state.updated) {
        this.setState(function (state) {
          _this2.props.messages.forEach(function (msg) {
            state.friends.add(msg.username);
          });

          return state;
        });
        var filtered = this.state.currentConvo !== '' ? this.props.messages.filter(function (message) {
          return message.username === _this2.state.currentConvo;
        }) : this.props.messages;
        this.setState({
          messages: filtered,
          updated: true
        });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;

      var _this$props$user = this.props.user,
          username = _this$props$user.username,
          password = _this$props$user.password;
      this.socket = external_socket_io_client_default()('http://localhost:3000');
      this.socket.on('connect', function () {
        _this3.socket.emit('authentication', {
          username: username,
          password: password
        });
      });
      this.socket.on('message', this.handleMessage);
      this.socket.on('typing', this.typingStatus);
      setTimeout(this.scrollToBottom, 100);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.socket.off('message', this.handleMessage);
      this.socket.close();
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var sameUser = function sameUser(msg, i, arr) {
        return i > 0 && msg.username === arr[i - 1].username;
      };

      var typingStatusMessage = !this.state.typing.length ? '' : this.state.typing.length === 1 ? "".concat(this.state.typing[0].username, " is typing...") : this.state.typing.length === 2 ? "".concat(this.state.typing[0].username, " and ").concat(this.state.typing[1].username, " are typing...") : 'several people are typing';
      return external_react_default.a.createElement("div", {
        className: "mdl-card mdl-shadow--2dp",
        id: "chatview"
      }, external_react_default.a.createElement(components_NavBar, {
        getConvo: this.getCurrentConvo,
        friends: _toConsumableArray(this.state.friends).filter(function (notUser) {
          return notUser !== _this4.username;
        }),
        currentView: this.state.currentView
      }), this.state.currentView === 'browser' && external_react_default.a.createElement("ul", null, "Browse Homes"), this.state.currentView === 'messenger' && external_react_default.a.createElement("ul", null, this.state.messages.map(function (message, i, array) {
        return external_react_default.a.createElement(Message, {
          key: i,
          message: message,
          username: _this4.username,
          firstMessage: sameUser(message, i, array)
        });
      }), external_react_default.a.createElement("div", {
        ref: function ref(el) {
          _this4.el = el;
        }
      })), external_react_default.a.createElement("div", {
        id: "typing-status"
      }, external_react_default.a.createElement("i", null, typingStatusMessage)), external_react_default.a.createElement("form", {
        onSubmit: this.handleSubmit,
        autoComplete: "off"
      }, external_react_default.a.createElement("div", {
        className: "mdl-textfield mdl-js-textfield mdl-textfield--floating-label"
      }, external_react_default.a.createElement("input", {
        type: "text",
        value: this.state.text,
        onChange: this.showTypingStatus,
        className: "mdl-textfield__input",
        id: "message-input",
        placeholder: "Send a message"
      }), external_react_default.a.createElement("span", {
        onClick: this.handleSubmit
      }, external_react_default.a.createElement("i", {
        className: "far fa-comment"
      })), external_react_default.a.createElement("label", {
        className: "mdl-textfield__label",
        htmlFor: "message-input"
      }))), external_react_default.a.createElement("style", null, "\n            #typing-status {\n            height: 2.4em;\n            font-size: .7em;\n            }\n\t\t\t\t\t\t#message-input {\n\t\t\t\t\t\tborder-bottom: lightgray solid 1px;\n\t\t\t\t\t\tborder-top: lightgray solid 1px;\n\t\t\t\t\t\theight: 20px;\n\t\t\t\t\t\t}\n\t\t\t\t\t\tform {\n\t\t\t\t\t\t\tbackground: #fff;\n\t\t\t\t\t\t\tpadding: 0px 10px 0px 10px;\n\t\t\t\t\t\t}\n\t\t\t\t\t\tul {\n\t\t\t\t\t\t\theight: 480px;\n\t\t\t\t\t\t\tmargin: 0;\n\t\t\t\t\t\t\tpadding: 0;\n\t\t\t\t\t\t\ttext-align: left;\n\t\t\t\t\t\t\tlist-style: none;\n\t\t\t\t\t\t\toverflow-y: scroll;\n\t\t\t\t\t\t}\n\t\t\t\t\t\tul li {\n\t\t\t\t\t\t\tpadding: 1px;\n\t\t\t\t\t\t\tbackground: #FFF;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t.mdl-card {\n\t\t\t\t\t\t\tmargin: auto;\n\t\t\t\t\t\t\ttransition: all .3s;\n\t\t\t\t\t\t\ttransform: translateY(100px);\n              height: 500px;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t.mdl-textfield__input {\n              display:inline-block;\n              width: 90%;\n              padding-top: .5em;\n            }\n\t\t\t\t\t\t.timestamp{\n\t\t          font-size:10px;\n\t\t          font-weight: 300;\n\t\t          color: transparent;\n\t\t          margin: 3px;\n\t          }\n\t          li:hover .my-timestamp {\n\t\t          color: black;\n\t\t          transition: color .8s;\n\t          }\n\t          li:hover .timestamp {\n\t\t          color: black;\n\t\t          transition: color .8s;\n\t          }\n\t        .my-message {\n\t\t        display: inline-block;\n\t\t        background: #00e34d;\n\t\t        color: white;\n\t\t        border-radius: 10px;\n\t\t        padding: 7px;\n\t\t        max-width: 50%;\n\t\t        word-wrap: break-word;\n\t\t        clear: right;\n\t\t        line-height: 1.25;\n\t        }\n\t        .your-message {\n\t\t        display: inline-block;\n\t\t        background: #E5E5EA;\n\t\t        border-radius: 10px;\n\t\t        padding: 7px;\n\t\t        word-wrap: break-word;\n\t\t        max-width:70%;\n\t\t        line-height: 1.25;\n\t        }\n          .message-username {\n\t          display: block;\n\t          font-size: 0.8em;\n\t          font-weight: bold;\n\t          line-height: 1.5;\n\t          margin-left: 0.6em;\n          }\n          .send-msg-btn {\n            cursor:pointer;\n          }\n   \t\t\t\t.mdl-textfield__label:after{\n            background-color: #0069E0;\n          }\n\t\t\t\t\t"));
    }
  }]);

  return Messenger;
}(external_react_default.a.Component);

/* harmony default export */ var components_Messenger = (Object(external_react_redux_["connect"])(function (_ref2) {
  var messages = _ref2.messages,
      houses = _ref2.houses,
      user = _ref2.user;
  return {
    messages: messages,
    houses: houses,
    user: user
  };
}, {
  addMessage: actions_message["b" /* addMessage */],
  addHouse: actions_message["a" /* addHouse */]
})(Messenger_Messenger));
// CONCATENATED MODULE: ./pages/messenger.js



var messenger_MessengerView = function MessengerView() {
  return external_react_default.a.createElement(components_Messenger, null);
};

/* harmony default export */ var messenger = __webpack_exports__["default"] = (messenger_MessengerView);

/***/ })
/******/ ]);