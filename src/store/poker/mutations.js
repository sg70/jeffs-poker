import Vue from 'vue'

const setName = (state, payload) => {
  state.name = payload
}

const setEstimation = (state, payload) => {
  state.estimation = payload
}

const addEstimationValue = (state, payload) => {
  Vue.set(state.estimationValues, payload.id, {
    value: payload.value,
    label: payload.value,
    show: true
  })
}

const setUid = (state, payload) => {
  state.uid = payload
}

const setSessionId = (state, payload) => {
  state.sessionId = payload
}

const setUserId = (state, payload) => {
  state.userId = payload
}

const setChickenMode = (state, payload) => {
  state.chickenMode = payload
}

const setNames = (state, payload) => {
  Vue.set(state.names, payload.id, {
    id: payload.id,
    name: payload.data.name || state.names.name,
    value: payload.data.estimate || state.names.estimate,
    label: payload.data.label || state.names.label,
    rank: payload.data.rank || state.names.rank || 0
  })
}

const removeName = (state, payload) => {
  Vue.delete(state.names, payload)
}

const resetNames = (state) => {
  Object.keys(state.names).forEach(key => {
    Vue.delete(state.names, key)
  })
}

export {
  setName,
  setEstimation,
  addEstimationValue,
  setUid,
  setSessionId,
  setUserId,
  setNames,
  removeName,
  resetNames,
  setChickenMode
}
