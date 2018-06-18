import Vue from 'vue'
import Start from '@/components/Start'

describe('Start.vue', () => {
  it('Start: test 01', done => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      data: {
        code: '',
        name: '',
        user: ''
      },
      methods: {
        validateCode: function (inCode) {
          return new Promise((resolve) => {
            resolve(true)
          })
        },
        hasUserIdAndSession: function () {
          return false
        },
        clearUserIdAndSession: function () {
        }
      },
      components: { 'test': Start }
    }).$mount()
    expect(vm.$el.querySelector('h1').textContent).to.equal('Jeff’s Planning Poker')
    done()
  })

  it('Start: test 02', done => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      data: {
        code: 'code',
        name: 'name',
        user: 'user'
      },
      methods: {
        validateCode: function (inCode) {
          return new Promise((resolve) => {
            resolve(true)
          })
        },
        userExists: function () {
          return new Promise((resolve) => {
            resolve(true)
          })
        },
        hasUserIdAndSession: function () {
          return true
        },
        clearUserIdAndSession: function () {
        }
      },
      components: { 'test': Start }
    }).$mount()
    expect(vm.$el.querySelector('h1').textContent).to.equal('Jeff’s Planning Poker')
    done()
  })

  it('Start: test 03', done => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      data: {
        code: 'code',
        name: 'name',
        user: 'user'
      },
      methods: {
        validateCode: function (inCode) {
          return new Promise((resolve) => {
            resolve(true)
          })
        },
        userExists: function () {
          return new Promise((resolve) => {
            resolve(false)
          })
        },
        hasUserIdAndSession: function () {
          return true
        },
        clearUserIdAndSession: function () {
        }
      },
      components: { 'test': Start }
    }).$mount()
    expect(vm.$el.querySelector('h1').textContent).to.equal('Jeff’s Planning Poker')
    done()
  })

  it('Start: test 04', done => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      data: {
        code: 'code',
        name: 'name',
        user: 'user'
      },
      methods: {
        validateCode: function (inCode) {
          return new Promise((resolve) => {
            resolve(false)
          })
        },
        hasUserIdAndSession: function () {
          return true
        },
        clearUserIdAndSession: function () {
        }
      },
      components: { 'test': Start }
    }).$mount()
    expect(vm.$el.querySelector('h1').textContent).to.equal('Jeff’s Planning Poker')
    done()
  })
})
