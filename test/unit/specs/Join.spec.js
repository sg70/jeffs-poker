import Vue from 'vue'
import Join from '@/components/Join'

describe('Join.vue', () => {
  it('Join: test 01', done => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      data: {
        code: ''
      },
      methods: {
        validateCode: function (inCode) {
          return new Promise((resolve) => {
            resolve(true)
          })
        }
      },
      components: { 'test': Join }
    }).$mount()
    expect(vm.$el.querySelector('h1').textContent).to.equal('Join game')
    done()
  })

  it('Join: test 02', done => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      data: {
        code: ''
      },
      methods: {
        validateCode: function (inCode) {
          return new Promise((resolve) => {
            resolve(false)
          })
        }
      },
      components: { 'test': Join }
    }).$mount()
    expect(vm.$el.querySelector('h1').textContent).to.equal('Join game')
    done()
  })
})
