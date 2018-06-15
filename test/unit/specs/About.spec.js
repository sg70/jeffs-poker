import Vue from 'vue'
import About from '@/components/About'

describe('About.vue', () => {
  it('About: test 01', done => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      methods: {
        hasUserAndSession: function () {
          return true
        }
      },
      components: { 'test': About }
    }).$mount()
    expect(vm.$el.querySelector('h1').textContent).to.equal('About')
    done()
  })

  it('About: test 02', done => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      methods: {
        hasUserAndSession: function () {
          return false
        }
      },
      components: { 'test': About }
    }).$mount()
    expect(vm.$el.querySelector('h1').textContent).to.equal('About')
    done()
  })
})
