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
      components: { 'test': Estimation }
    }).$mount()
    expect(vm.$el.querySelector('h1').textContent).to.equal('Estimation')
    done()
  })
  it('Estimation: test 02', done => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      router: router,
      data: {
        code: 'code',
        name: 'name',
        users: [],
        estimationValues: []
      },
      methods: {
        validateCode: function (inCode) {
          return new Promise((resolve) => {
            resolve(false)
          })
        },
        getUsers: function () {
          this.users = []
        }
      },
      components: { 'test': Estimation }
    }).$mount()
    expect(vm.$el.querySelector('h1').textContent).to.equal('Estimation')
    done()
  })
})
