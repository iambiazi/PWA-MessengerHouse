(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{300:function(e,t,n){__NEXT_REGISTER_PAGE("/browser",function(){return e.exports=n(301),{page:e.exports.default}})},301:function(e,t,n){"use strict";n.r(t);var o=n(0),r=n.n(o),a=n(20),i=n(42);function u(e){return(u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function c(e){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function l(e,t){return(l=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function p(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var f=function(e){function t(e){var n,o,r,a,i,s;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),o=this,r=c(t).call(this,e),n=!r||"object"!==u(r)&&"function"!=typeof r?p(o):r,a=p(p(n)),s=function(){var e=document.querySelector(".home-profile-image").getAttribute("src"),t=0,o=Number(window.location.pathname.replace(/\/browser\//,""));o&&o>=0&&o<100&&(t=o);for(var r=0,a=n.props.houses.length;r<a;++r)if(n.props.houses[r].house_id===t)return;n.props.addHouse(t,n.props.user.username,e)},(i="addFavorite")in a?Object.defineProperty(a,i,{value:s,enumerable:!0,configurable:!0,writable:!0}):a[i]=s,n.state={test:""},n}var n,o,a;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&l(e,t)}(t,r.a.Component),n=t,(o=[{key:"componentDidMount",value:function(){var e=this,t=document.createElement("script");t.src="https://s3-us-west-1.amazonaws.com/img-gallery-hr/PWAbundle.js",t.async=!0,document.body.appendChild(t);var n=document.createElement("script");n.src="https://s3-us-west-1.amazonaws.com/housing-hr/PWAbundle.js",n.async=!0,document.body.appendChild(n);setTimeout(function(){document.getElementById("add-favorites").addEventListener("click",e.addFavorite)},2e3)}},{key:"componentWillUnmount",value:function(){document.getElementById("add-favorites").removeEventListener("click",this.addFavorite)}},{key:"render",value:function(){return r.a.createElement("div",{id:"browse-homes"},r.a.createElement("a",{href:"/messenger"},"Messenger"),r.a.createElement("div",{id:"top-app"}),r.a.createElement("div",{id:"main"}),r.a.createElement("style",null,"\n            #main {\n              margin-left: 30px;\n            }\n            #browse-homes {\n              max-width: 100%;\n              max-height: 100%;\n            }\n            html.mdl-js {\n              background: white !important;\n            }\n          @media (max-width: 320px) {\n\n            }\n\n          "))}}])&&s(n.prototype,o),a&&s(n,a),t}();t.default=Object(a.b)(function(e){return{houses:e.houses,user:e.user}},{addHouse:i.a})(f)}},[[300,1,0]]]);