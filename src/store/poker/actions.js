import router from '../../router'

import * as firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.POKER.FIREBASE_APIKEY, // Auth / General Use
  databaseURL: process.env.POKER.FIREBASE_DBURL, // Realtime Database
  projectId: process.env.POKER.FIREBASE_PROJECT
}

var firestore = null

const fibonacci = (n) => {
  if (n <= 1) return 1
  return fibonacci(n - 1) + fibonacci(n - 2)
}

const initFirebase = ({ commit }) => {
  firebase.initializeApp(firebaseConfig)

  firebase.auth().signInAnonymously().catch((error) => {
    console.error('resetEstimation signInAnonymously error: ' + error)
  })

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      commit('setUid', user.uid)
    } else {
      commit('setUid', '')
    }
  })

  firebase.auth().onIdTokenChanged((user) => {
    if (user) {
      commit('setUid', user.uid)
    } else {
      commit('setUid', '')
    }
  })

  firestore = firebase.firestore()
}

const initEstimationValues = ({ commit, state }) => {
  for (var i = 1; i < state.estimationSteps; i++) {
    var fibonacciValue = fibonacci(i)
    commit('addEstimationValue', { id: i, value: fibonacciValue })
  }
}

const initState = ({ commit, state }) => {
  initFirebase({ commit })
  initEstimationValues({ commit, state })
}

const setName = ({ commit }, payload) => {
  commit('setName', payload)
}

const addUser = ({ commit, state }) => {
  if (state.name !== '') {
    firestore.collection('sessions').doc(state.sessionId).collection('players').add({
      name: state.name,
      estimate: -4
    }).then(userRef => {
      commit('setUserId', userRef.id)
    }).catch(error => {
      console.error('addUser firestore error: ' + error)
    })
  }
}

const updateNames = ({ commit, state }, estimatedValues) => {
  Object.values(state.names).forEach(user => {
    var showValue = user.value
    var rank = 0
    if (estimatedValues.length > 1) {
      if (user.value === estimatedValues[0]) {
        rank = -1
      } else if (user.value === estimatedValues[estimatedValues.length - 1]) {
        rank = 1
      }
    }
    commit('setNames', {
      id: user.id,
      data:
      {
        name: user.name,
        estimate: user.value,
        label: Object.values(state.estimationValues).find(o => o.value === showValue).label,
        rank: rank
      }
    })
  })
}

const updateEstimate = ({ commit, state }) => {
  var name = Object.values(state.names).find(o => o.value === -4)
  if (name === undefined) {
    var numEstimations = 0
    var sumEstimations = 0
    var estimatedValues = []
    var steps = 0
    var countSteps = false
    var seenSteps = 0

    Object.values(state.estimationValues).filter(v => v.value >= 0).forEach(v => {
      if (countSteps === true) {
        steps++
      }
      var count = Object.values(state.names).filter(u => u.value === v.value).length
      if (count > 0) {
        countSteps = true
        numEstimations += count
        sumEstimations += (v.value * count)
        estimatedValues.push(v.value)
        seenSteps = steps
      }
    })

    updateNames({ commit, state }, estimatedValues)

    if (numEstimations > 0) {
      if (seenSteps < 3) {
        commit('setEstimation', Math.round(sumEstimations / numEstimations))
      } else {
        commit('setEstimation', -7)
      }
    } else {
      commit('setEstimation', -4)
    }
  } else {
    commit('setEstimation', -4)
  }
}

const registerForUsersChanges = ({ commit, getter, state }) => {
  firestore.collection('sessions').doc(state.sessionId).collection('players').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
      if (change.type === 'removed') {
        commit('removeName', change.doc.id)
      } else {
        var data = change.doc.data()
        var showValue = data.estimate
        if (state.estimation === -4) {
          if (showValue > -4 && state.userId !== change.doc.id) {
            showValue = -5
          }
        }
        commit('setNames', {
          id: change.doc.id,
          data:
          {
            name: data.name,
            estimate: data.estimate,
            label: Object.values(state.estimationValues).find(o => o.value === showValue).label
          }
        })
      }
    })
    updateEstimate({ commit, state })
  })
}

const addUserToSession = ({ commit, state }) => {
  registerForUsersChanges({ commit, state })
  addUser({ commit, state })
  router().push({ path: '/' })
}

const createSession = ({ commit, state }) => {
  firestore.collection('sessions').add({
    created: firebase.firestore.FieldValue.serverTimestamp()
  }).then(docRef => {
    commit('resetNames')
    commit('setSessionId', docRef.id)
    addUserToSession({ commit, state })
  }).catch(error => {
    console.error('createSession firestore error: ' + error)
  })
}

const joinSession = ({ commit, state }, payload) => {
  var docRef = firestore.collection('sessions').doc(payload)
  docRef.get().then(doc => {
    if (doc.exists) {
      commit('resetNames')
      commit('setSessionId', doc.id)
      addUserToSession({ commit, state })
    }
  }).catch(error => {
    console.error('joinSession firestore error: ' + error)
  })
}

const startSession = ({ commit, state }, payload) => {
  if (state.name !== '') {
    if (payload) {
      joinSession({ commit, state }, payload)
    } else {
      createSession({ commit, state })
    }
  }
}

const sendEstimate = ({ commit, state }, payload) => {
  var userRef = firestore.collection('sessions').doc(state.sessionId).collection('players').doc(state.userId)
  userRef.update({ estimate: payload })
}

const estimate = ({ commit, state }, payload) => {
  if (state.chickenMode === false) {
    sendEstimate({ commit, state }, payload.value)
  }
}

const resetEstimation = ({ commit, state }) => {
  var userCollectionRef = firestore.collection('sessions').doc(state.sessionId).collection('players')
  userCollectionRef.get().then(snapshot => {
    snapshot.forEach(user => {
      var data = user.data()
      if (data.estimate !== -6) {
        userCollectionRef.doc(user.id).update({ estimate: -4 }).then(doc => {
        }).catch(error => {
          console.error('resetEstimation update user: ' + error)
        })
      }
    })
  })
}

const setChickenMode = ({ commit, state }, payload) => {
  commit('setChickenMode', payload)
  var estimationValue = (payload === true) ? -6 : -4
  sendEstimate({ commit, state }, estimationValue)
}

export {
  setName,
  estimate,
  initState,
  startSession,
  resetEstimation,
  setChickenMode
}
