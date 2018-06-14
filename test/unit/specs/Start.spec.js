import Vue from 'vue'
import Start from '@/components/Start'

describe('Start.vue', done => {
  it('should render correct contents', done => {
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
      components: { 'test': Start }
    }).$mount()
    // const Constructor = Vue.extend(Start)
    // const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.start h1').textContent)
      .to.equal('Welcome to Planning Poker')
    done()
  })
})
