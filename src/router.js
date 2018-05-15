import Vue from 'vue'
import Router from 'vue-router'
import Work from './views/Work.vue'
import Info from './views/Info.vue'

import Supersymmetry from './views/Supersymmetry.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'work',
      component: Work
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
  ],

  scrollBehavior (to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 })
      }, 500)
    })
  }
})
