import Vue from 'vue'
import Invite from '@/components/Invite'

describe('Invite.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Invite)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.invite h1').textContent)
      .to.equal('Invite players')
  })
})
