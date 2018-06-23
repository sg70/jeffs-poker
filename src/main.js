// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
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

Vue.use(VueAnalytics, {
  id: process.env.GA_TRACKING_ID,
  checkDuplicatedScript: true,
  router,
  autoTracking: {
    exception: true,
    pageviewTemplate (route) {
      return {
        page: route.path,
        title: route.name,
        location: window.location.href
      }
    }
  },
  debug: {
    enabled: process.env.NODE_ENV !== 'production'
  },
  set: [
    { field: 'anonymizeIp', value: true }
  ]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  firebase,
  created () {
    this.firebase = firebase
    this.db = firebase.firestore()
    this.db.settings({timestampsInSnapshots: true})
  },
  data: {
    // database
    db: null,
    firebase: null
  },
  template: '<App/>',
  components: { App }
})
