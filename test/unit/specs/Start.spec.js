import Vue from 'vue'
import Start from '@/components/Start'

describe('Start.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Start)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.start h1').textContent)
      .to.equal('Welcome to Planning Poker')
  })
})
