(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{172:function(t,e,r){r(304),t.exports=self.fetch.bind(self)},173:function(t,e,r){t.exports=r(52)},302:function(t,e,r){__NEXT_REGISTER_PAGE("/",function(){return t.exports=r(303),{page:t.exports.default}})},303:function(t,e,r){"use strict";r.r(e);var n=r(0),o=r.n(n),i=r(20),s=r(172),a=r.n(s),u=r(173),c=r.n(u),f=r(42);function l(t){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function h(t){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function p(t,e){return(p=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function d(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function y(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var b=function(t){function e(){var t,r,n,i;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);for(var s=arguments.length,u=new Array(s),f=0;f<s;f++)u[f]=arguments[f];return n=this,i=(t=h(e)).call.apply(t,[this].concat(u)),r=!i||"object"!==l(i)&&"function"!=typeof i?d(n):i,y(d(d(r)),"state",{username:"",password:"",serverError:!1,loginError:!1,view:"choice"}),y(d(d(r)),"handleSubmit",function(t){t.preventDefault();var e={username:r.state.username,password:r.state.password};a()("/".concat(r.state.view),{method:"POST",body:JSON.stringify(e),headers:{Accept:"application/json","Content-Type":"application/json"},credentials:"same-origin"}).then(function(t){return t.json()}).then(function(t){"logged in"===t.status?(r.props.addUser(e.username,e.password),c.a.push("/browser")):r.setState({loginError:!0})}).catch(function(){r.setState({serverError:!0})})}),y(d(d(r)),"handleLogin",function(){r.setState({view:"login"})}),y(d(d(r)),"handleSignup",function(){r.setState({view:"signup"})}),y(d(d(r)),"handleChange",function(t){r.setState(y({},t.target.name,t.target.value))}),y(d(d(r)),"render",function(){return o.a.createElement("div",null,"choice"===r.state.view&&o.a.createElement("a",{onClick:r.handleLogin},"Login"),o.a.createElement("br",null),"choice"===r.state.view&&o.a.createElement("a",{onClick:r.handleSignup},"Signup"),"choice"!==r.state.view&&o.a.createElement("form",{onSubmit:r.handleSubmit,onChange:r.handleChange},o.a.createElement("input",{type:"text",placeholder:"enter username",name:"username"}),o.a.createElement("input",{type:"password",placeholder:"enter password",name:"password"}),o.a.createElement("input",{type:"submit"})),o.a.createElement("style",null,"\n        a {\n        cursor: pointer;\n        }\n        "),r.state.loginError&&o.a.createElement("div",null,"Error logging in. Please try again"),r.state.serverError&&o.a.createElement("div",null,"Error connecting to server"))}),r}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&p(t,e)}(e,o.a.Component),e}();e.default=Object(i.b)(function(){return{}},{addUser:f.c})(b)},304:function(t,e,r){"use strict";r.r(e),r.d(e,"Headers",function(){return c}),r.d(e,"Request",function(){return b}),r.d(e,"Response",function(){return w}),r.d(e,"DOMException",function(){return g}),r.d(e,"fetch",function(){return E});var n={searchParams:"URLSearchParams"in self,iterable:"Symbol"in self&&"iterator"in Symbol,blob:"FileReader"in self&&"Blob"in self&&function(){try{return new Blob,!0}catch(t){return!1}}(),formData:"FormData"in self,arrayBuffer:"ArrayBuffer"in self};if(n.arrayBuffer)var o=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],i=ArrayBuffer.isView||function(t){return t&&o.indexOf(Object.prototype.toString.call(t))>-1};function s(t){if("string"!=typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(t))throw new TypeError("Invalid character in header field name");return t.toLowerCase()}function a(t){return"string"!=typeof t&&(t=String(t)),t}function u(t){var e={next:function(){var e=t.shift();return{done:void 0===e,value:e}}};return n.iterable&&(e[Symbol.iterator]=function(){return e}),e}function c(t){this.map={},t instanceof c?t.forEach(function(t,e){this.append(e,t)},this):Array.isArray(t)?t.forEach(function(t){this.append(t[0],t[1])},this):t&&Object.getOwnPropertyNames(t).forEach(function(e){this.append(e,t[e])},this)}function f(t){if(t.bodyUsed)return Promise.reject(new TypeError("Already read"));t.bodyUsed=!0}function l(t){return new Promise(function(e,r){t.onload=function(){e(t.result)},t.onerror=function(){r(t.error)}})}function h(t){var e=new FileReader,r=l(e);return e.readAsArrayBuffer(t),r}function p(t){if(t.slice)return t.slice(0);var e=new Uint8Array(t.byteLength);return e.set(new Uint8Array(t)),e.buffer}function d(){return this.bodyUsed=!1,this._initBody=function(t){var e;this._bodyInit=t,t?"string"==typeof t?this._bodyText=t:n.blob&&Blob.prototype.isPrototypeOf(t)?this._bodyBlob=t:n.formData&&FormData.prototype.isPrototypeOf(t)?this._bodyFormData=t:n.searchParams&&URLSearchParams.prototype.isPrototypeOf(t)?this._bodyText=t.toString():n.arrayBuffer&&n.blob&&((e=t)&&DataView.prototype.isPrototypeOf(e))?(this._bodyArrayBuffer=p(t.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):n.arrayBuffer&&(ArrayBuffer.prototype.isPrototypeOf(t)||i(t))?this._bodyArrayBuffer=p(t):this._bodyText=t=Object.prototype.toString.call(t):this._bodyText="",this.headers.get("content-type")||("string"==typeof t?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):n.searchParams&&URLSearchParams.prototype.isPrototypeOf(t)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},n.blob&&(this.blob=function(){var t=f(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?f(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(h)}),this.text=function(){var t,e,r,n=f(this);if(n)return n;if(this._bodyBlob)return t=this._bodyBlob,e=new FileReader,r=l(e),e.readAsText(t),r;if(this._bodyArrayBuffer)return Promise.resolve(function(t){for(var e=new Uint8Array(t),r=new Array(e.length),n=0;n<e.length;n++)r[n]=String.fromCharCode(e[n]);return r.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},n.formData&&(this.formData=function(){return this.text().then(m)}),this.json=function(){return this.text().then(JSON.parse)},this}c.prototype.append=function(t,e){t=s(t),e=a(e);var r=this.map[t];this.map[t]=r?r+", "+e:e},c.prototype.delete=function(t){delete this.map[s(t)]},c.prototype.get=function(t){return t=s(t),this.has(t)?this.map[t]:null},c.prototype.has=function(t){return this.map.hasOwnProperty(s(t))},c.prototype.set=function(t,e){this.map[s(t)]=a(e)},c.prototype.forEach=function(t,e){for(var r in this.map)this.map.hasOwnProperty(r)&&t.call(e,this.map[r],r,this)},c.prototype.keys=function(){var t=[];return this.forEach(function(e,r){t.push(r)}),u(t)},c.prototype.values=function(){var t=[];return this.forEach(function(e){t.push(e)}),u(t)},c.prototype.entries=function(){var t=[];return this.forEach(function(e,r){t.push([r,e])}),u(t)},n.iterable&&(c.prototype[Symbol.iterator]=c.prototype.entries);var y=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function b(t,e){var r,n,o=(e=e||{}).body;if(t instanceof b){if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new c(t.headers)),this.method=t.method,this.mode=t.mode,this.signal=t.signal,o||null==t._bodyInit||(o=t._bodyInit,t.bodyUsed=!0)}else this.url=String(t);if(this.credentials=e.credentials||this.credentials||"same-origin",!e.headers&&this.headers||(this.headers=new c(e.headers)),this.method=(r=e.method||this.method||"GET",n=r.toUpperCase(),y.indexOf(n)>-1?n:r),this.mode=e.mode||this.mode||null,this.signal=e.signal||this.signal,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&o)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(o)}function m(t){var e=new FormData;return t.trim().split("&").forEach(function(t){if(t){var r=t.split("="),n=r.shift().replace(/\+/g," "),o=r.join("=").replace(/\+/g," ");e.append(decodeURIComponent(n),decodeURIComponent(o))}}),e}function w(t,e){e||(e={}),this.type="default",this.status=void 0===e.status?200:e.status,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in e?e.statusText:"OK",this.headers=new c(e.headers),this.url=e.url||"",this._initBody(t)}b.prototype.clone=function(){return new b(this,{body:this._bodyInit})},d.call(b.prototype),d.call(w.prototype),w.prototype.clone=function(){return new w(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new c(this.headers),url:this.url})},w.error=function(){var t=new w(null,{status:0,statusText:""});return t.type="error",t};var v=[301,302,303,307,308];w.redirect=function(t,e){if(-1===v.indexOf(e))throw new RangeError("Invalid status code");return new w(null,{status:e,headers:{location:t}})};var g=self.DOMException;try{new g}catch(t){(g=function(t,e){this.message=t,this.name=e;var r=Error(t);this.stack=r.stack}).prototype=Object.create(Error.prototype),g.prototype.constructor=g}function E(t,e){return new Promise(function(r,o){var i=new b(t,e);if(i.signal&&i.signal.aborted)return o(new g("Aborted","AbortError"));var s=new XMLHttpRequest;function a(){s.abort()}s.onload=function(){var t,e,n={status:s.status,statusText:s.statusText,headers:(t=s.getAllResponseHeaders()||"",e=new c,t.replace(/\r?\n[\t ]+/g," ").split(/\r?\n/).forEach(function(t){var r=t.split(":"),n=r.shift().trim();if(n){var o=r.join(":").trim();e.append(n,o)}}),e)};n.url="responseURL"in s?s.responseURL:n.headers.get("X-Request-URL");var o="response"in s?s.response:s.responseText;r(new w(o,n))},s.onerror=function(){o(new TypeError("Network request failed"))},s.ontimeout=function(){o(new TypeError("Network request failed"))},s.onabort=function(){o(new g("Aborted","AbortError"))},s.open(i.method,i.url,!0),"include"===i.credentials?s.withCredentials=!0:"omit"===i.credentials&&(s.withCredentials=!1),"responseType"in s&&n.blob&&(s.responseType="blob"),i.headers.forEach(function(t,e){s.setRequestHeader(e,t)}),i.signal&&(i.signal.addEventListener("abort",a),s.onreadystatechange=function(){4===s.readyState&&i.signal.removeEventListener("abort",a)}),s.send(void 0===i._bodyInit?null:i._bodyInit)})}E.polyfill=!0,self.fetch||(self.fetch=E,self.Headers=c,self.Request=b,self.Response=w)}},[[302,1,0]]]);