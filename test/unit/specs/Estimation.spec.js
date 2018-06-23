import Vue from 'vue'
import VueRouter from 'vue-router'
import Estimation from '@/components/Estimation'

describe('Estimation.vue', () => {
  Vue.use(VueRouter)
  const router = new VueRouter({routes: [
    {path: '/estimation', name: 'Estimation', component: Estimation},
    {path: '/', name: 'Start', component: {render: h => '-'}}
  ]})

  it('Estimation: test 01', done => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      router: router,
      data: {
        users: [],
        estimationValues: []
      },
      methods: {
        hasUserAndSession: function () {
          return false
        }
      },
      components: { 'test': Estimation }
    }).$mount()
    expect(vm.$el.querySelector('ul.estimate > li > span').textContent).to.equal('Average')
    done()
  })

  it('Estimation: test 02', done => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      router: router,
      data: {
        users: [],
        estimationValues: []
      },
      methods: {
        getUsers: function () {
          this.users = []
        },
        hasUserAndSession: function () {
          return true
        }
      },
      components: { 'test': Estimation }
    }).$mount()
    expect(vm.$el.querySelector('ul.estimate > li > span').textContent).to.equal('Average')
    done()
  })
})
