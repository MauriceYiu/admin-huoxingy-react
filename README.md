# 如果ie9、10等低版本浏览器提示map、set未定义等，可在config中的polyfills.js中引入babel-polyfill

#如果ie9、10提示set，map等未定义的话

require('babel-polyfill');

# 如果ie9、10提示动画框架、React depends on requestAnimationFrame等等的话

require('raf/polyfill');

# 登录页面动画用 react-transition-group

# store页面动画准备用第三方的动画库

# ie9拿不到服务器返回的数据，同时是在babel-polyfill以及es6-promise的情况下，这时有可能是ie9的跨域问题

# 解决跨域问题可以在package.json中加入诸如此类的信息:

# "proxy":"https://api.huoxingy.com/v1/admin/"

# babel的相关配置可在package中进行配置

