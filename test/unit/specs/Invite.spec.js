/* import Vue from 'vue'
import VueRouter from 'vue-router'
import Invite from '@/components/Invite'

describe('Invite.vue', () => {
  it('Invite: test 01', done => {
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
      expect(vm.$el.querySelector('h1').textContent).to.equal('Invite players')
      done()
    })
  })
}) */

import Vue from 'vue'
import VueRouter from 'vue-router'
import Invite from '@/components/Invite'

describe('Invite.vue', () => {
  Vue.use(VueRouter)
  const router = new VueRouter({routes: [
    {path: '/invite', name: 'Invite', component: Invite},
    {path: '/', name: 'Start', component: {render: h => '-'}}
  ]})

  it('Invite: test 01', done => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      router: router,
      data: {
        code: '',
        name: '',
        users: [],
        estimationValues: []
      },
      methods: {
        validateCode: function (inCode) {
          return new Promise((resolve) => {
            resolve(true)
          })
        }
      },
      components: { 'test': Invite }
    }).$mount()
    expect(vm.$el.querySelector('h1').textContent).to.equal('Invite players')
    done()
  })

  it('Invite: test 02', done => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      router: router,
      data: {
        code: 'code',
        name: '',
        users: [],
        estimationValues: []
      },
      methods: {
        validateCode: function (inCode) {
          return new Promise((resolve) => {
            resolve(true)
          })
        }
      },
      components: { 'test': Invite }
    }).$mount()
    expect(vm.$el.querySelector('h1').textContent).to.equal('Invite players')
    done()
  })
})
