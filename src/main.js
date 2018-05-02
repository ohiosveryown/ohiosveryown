import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'

import '@/assets/style/reset.scss'
import '@/assets/style/var.scss'
import '@/assets/style/util.scss'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#ovo')
