import Vue from 'vue'
import About from '@/components/About'

describe('Invite.vue', () => {
  it('should render correct contents', done => {
    const Constructor = Vue.extend(About)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.about h1').textContent)
      .to.equal('About')
    done()
  })
})
