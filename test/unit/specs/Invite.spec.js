import Vue from 'vue'
import VueRouter from 'vue-router'
import Invite from '@/components/Invite'

describe('Invite.vue', () => {
  it('should render correct contents', done => {
    Vue.use(VueRouter)
    const router = new VueRouter({routes: [
      {path: '/invite', name: 'Invite', component: Invite},
      {path: '/', name: 'Start', component: {render: h => '-'}}
    ]})
    const vm = new Vue({
      el: document.createElement('div'),
      router: router,
      render: h => h('router-view')
    })
    router.push({name: 'Invite'})
    Vue.nextTick(() => {
      expect(vm.$el.querySelector('.invite h1').textContent).to.equal('Invite players')
      done()
    })
  })
})
