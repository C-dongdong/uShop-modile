// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import './assets/js/remScale'
import './assets/css/reset.css' 

//引入vant UI 框架
import vantUI from 'vant'
//引入样式
import 'vant/lib/index.css'
Vue.use(vantUI)
Vue.prototype.$imgUrl = 'http://localhost:3000'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
