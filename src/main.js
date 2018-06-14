// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from '@firebase/app'
import '@firebase/firestore'

Vue.config.productionTip = false
Vue.config.devtools = process.env.NODE_ENV === 'development'
Vue.config.silent = process.env.NODE_ENV === 'production'

firebase.initializeApp({
  apiKey: process.env.FIREBASE_APIKEY, // Auth / General Use
  databaseURL: process.env.FIREBASE_DBURL, // Realtime Database
  projectId: process.env.FIREBASE_PROJECT
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  firebase,
  created () {
    this.db = firebase.firestore()
    this.db.settings({timestampsInSnapshots: true})
  },
  data: {
    // database
    db: null,
    // session id
    code: '',
    // user is host of the session
    isHost: false,
    // our id of the user
    user: '',
    // our user name
    name: '',
    // users in session
    users: [],
    estimation: -4,
    estimationValues: [
      { value: '0', key: 0, show: true },
      { value: '1', key: 1, show: true },
      { value: '2', key: 2, show: true },
      { value: '3', key: 3, show: true },
      { value: '5', key: 5, show: true },
      { value: '8', key: 8, show: true },
      { value: '13', key: 13, show: true },
      { value: '21', key: 21, show: true },
      { value: '34', key: 34, show: true },
      { value: '55', key: 55, show: true },
      { value: '89', key: 89, show: true },
      { value: '∞', key: -1, show: true }, // infinity
      { value: '?', key: -2, show: true }, // unsure
      { value: '☕', key: -3, show: true }, // break
      { value: '⏳', key: -4, show: false }, // waiting for user
      { value: '⌛', key: -5, show: false } // user done
    ]
  },
  methods: {
    getCode: function () {
      return new Promise((resolve, reject) => {
        this.db.collection('sessions').add({
          created: firebase.firestore.FieldValue.serverTimestamp()
        }).then(docRef => {
          this.code = docRef.id
          resolve(true)
        }).catch(error => {
          console.error('Error getCode(): ', error)
          reject(error)
        })
      })
    },
    validateCode: function (inCode) {
      return new Promise((resolve, reject) => {
        var docRef = this.db.collection('sessions').doc(inCode)
        docRef.get().then(doc => {
          if (doc.exists) {
            this.code = doc.id
            resolve(true)
          } else {
            resolve(false)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    getUsers: function () {
      this.users = []
      this.db.collection('sessions').doc(this.code).collection('users').onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'removed') {
            this.users = this.users.filter(o => o.id !== change.doc.id)
          } else {
            var userData = change.doc.data()
            if (userData.estimate > -4) {
              userData.showEstimate = -5
            } else if (userData.estimate === -4) {
              userData.showEstimate = -4
            }
            var user = this.users.find(o => o.id === change.doc.id)
            if (user) {
              user.name = userData.name
              user.rank = userData.rank
              user.estimate = userData.estimate
              user.showEstimate = userData.showEstimate
              if (user.id === this.user) {
                user.showEstimate = user.estimate
              }
            } else {
              userData.id = change.doc.id
              this.users.push(userData)
            }
          }
        })
        this.updateEstimations()
      })
    },
    getEstimationValues: function () {
      return this.estimationValues
    },
    getEstimationValue: function (key) {
      return this.estimationValues.find(o => o.key === key)
    },
    updateEstimations: function () {
      var user = this.users.find(o => o.estimate === -4)
      if (user === undefined) {
        var numEstimations = 0
        var sumEstimations = 0
        var maxEstimation
        var minEstimation

        this.users.forEach(user => {
          user.showEstimate = user.estimate
          if (user.estimate >= 0) {
            numEstimations++
            sumEstimations += user.estimate
            if (maxEstimation === undefined || user.estimate > maxEstimation) {
              maxEstimation = user.estimate
            }
            if (minEstimation === undefined || user.estimate < minEstimation) {
              minEstimation = user.estimate
            }
          }
        })

        this.estimation = Math.round(sumEstimations / numEstimations)

        if (maxEstimation !== minEstimation) {
          this.users.forEach(user => {
            if (user.estimate === maxEstimation) {
              user.rank = 1
            } else if (user.estimate === minEstimation) {
              user.rank = -1
            }
          })
        }
      } else {
        this.estimation = -4
      }
    },
    userExists: function () {
      return new Promise((resolve, reject) => {
        this.db.collection('sessions').doc(this.code).collection('users').doc(this.user).get().then(user => {
          if (user.exists) {
            resolve(true)
          } else {
            resolve(false)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    setUsername: function (username) {
      this.db.collection('sessions').doc(this.code).collection('users').add({
        name: username,
        estimate: -4,
        rank: 0
      }).then(userRef => {
        this.user = userRef.id
      }).catch(error => {
        console.error('Error setUsername(): ' + error)
      })
    },
    setEstimation: function (value) {
      var userRef = this.db.collection('sessions').doc(this.code).collection('users').doc(this.user)
      userRef.update({estimate: value})
    },
    resetEstimation: function () {
      var userCollectionRef = this.db.collection('sessions').doc(this.code).collection('users')
      userCollectionRef.get().then(snapshot => {
        snapshot.forEach(user => {
          userCollectionRef.doc(user.id).update({estimate: -4, rank: 0}).then(doc => {
          }).catch(error => {
            console.error('resetEstimation update user: ' + error)
          })
        })
      })
    }
  },
  template: '<App/>',
  components: { App }
})
