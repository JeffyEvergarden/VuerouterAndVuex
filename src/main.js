import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'

import router from './krouter'
import store from './kstore'
import './test'

Vue.config.productionTip = false
// 事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
