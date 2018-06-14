import Vue from 'vue'
import Router from 'vue-router'
import Start from '@/components/Start'
import Join from '@/components/Join'
import Invite from '@/components/Invite'
import Estimation from '@/components/Estimation'
import About from '@/components/About'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Start',
      component: Start
    },
    {
      path: '/join/:id',
      name: 'join',
      component: Join,
      props: (route) => ({id: route.params.id})
    },
    {
      path: '/invite',
      name: 'Invite',
      component: Invite
    },
    {
      path: '/estimation',
      name: 'Estimation',
      component: Estimation
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})
