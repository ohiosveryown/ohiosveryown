import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Info from './views/Info.vue'

import Supersymmetry from './views/Supersymmetry.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/info',
      name: 'info',
      component: Info
    },
    {
      path: '/supersymmetry',
      name: 'supersymmetry',
      component: Supersymmetry
    },
  ]
})
