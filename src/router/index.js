import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Yuyue from '@/components/Yuyue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Yuyue',
      name: 'Yuyue',
      component: Yuyue
    }
  ],
  mode: 'history'
})
