#如果ie9、10等低版本浏览器提示map、set未定义等，可在config中的polyfills.js中引入babel-polyfill;
#// 如果ie9、10提示set，map等未定义的话
require('babel-polyfill');
#// 如果ie9、10提示动画框架、React depends on requestAnimationFrame等等的话
require('raf/polyfill');