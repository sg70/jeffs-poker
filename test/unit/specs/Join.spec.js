import Vue from 'vue'
import Join from '@/components/Join'

describe('Join.vue', () => {
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
      components: { 'test': Join }
    }).$mount()
    // const Constructor = Vue.extend(Join)
    // const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.join h1').textContent)
      .to.equal('Join game')
    done()
  })
})
