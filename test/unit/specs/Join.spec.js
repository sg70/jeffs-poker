import Vue from 'vue'
import Join from '@/components/Join'

describe('Join.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Join)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.join h1').textContent)
      .to.equal('Join game')
  })
})
